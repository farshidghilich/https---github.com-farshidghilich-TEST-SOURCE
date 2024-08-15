// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import PersianDate from "@alireza-ab/persian-date";
// import { useAuthStore } from "@/store";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { getUrl } from "./utility";

// interface Item {
//   organizationId?: string | null;
//   [key: string]: any;
// }

// interface Search {
//   [key: string]: string;
// }

// const fetchList = async (
//   url: string,
//   token: string,
//   search: Search,
//   pageNo: number,
//   pageSize: number,
//   sortedBy: string
// ) => {
//   const predicate = Object.keys(search)
//     .filter((key) => search[key])
//     .map((key) => `${key}:"*${search[key]}*"`)
//     .join(" AND ");

//   const fullUrl = getUrl(
//     `${url}?search=(deleted:0 AND active:true${
//       predicate ? ` AND ${predicate}` : ""
//     })&size=${pageSize}&page=${pageNo}&sort=${sortedBy || "created,desc"}`
//   );

//   const { data } = await axios.get(fullUrl, {
//     headers: { Authorization: token },
//   });

//   return data;
// };

// function useControler<T>(url: string) {
//   const router = useRouter();
//   const { organizationId, userId, token } = useAuthStore();
//   const queryClient = useQueryClient();
//   const persianDate = new PersianDate();
//   const [item, setItem] = useState<T>({
//     organizationId,
//     userId,
//     active: true,
//   } as T);
//   const [search, setSearch] = useState<Search>({});
//   const [excelFile, setExcelfile] = useState<File | null>(null);
//   const [insertModal, setInsertModal] = useState<boolean>(false);
//   const [isInserting, setInserting] = useState<boolean>(false);
//   const formRef = useRef<HTMLFormElement>(null);
//   const [pageNo, setPageNo] = useState<number>(1);
//   const [pageNumbers, setPageNumbers] = useState<number[]>([
//     0, 1, 2, 3, 4, 5, 6,
//   ]);
//   const [pageSize, setPageSize] = useState<number>(100);
//   const [validated, setValidated] = useState<boolean>(false);
//   const [sortedBy, setSortedBy] = useState<string>("");
//   const [pdf, setPdf] = useState<string>("");

//   const { data, error, isLoading } = useQuery(
//     ["list", search, pageNo, pageSize, sortedBy],
//     () => fetchList(url, token, search, pageNo, pageSize, sortedBy)
//   );

//   const showList = () => {
//     queryClient.invalidateQueries(["list"]);
//   };

//   const error401 = () => {
//     const message =
//       "توکن شما منقضی شده است تا لحظاتی بعد به صفحه ورود منتقل میشوید";
//     toast.error(message);
//     setTimeout(() => {
//       router.push("/auth/login");
//     }, 2000);
//   };

//   const formIsValid = (): boolean => {
//     const form = formRef.current;
//     if (form?.checkValidity() === false) {
//       setValidated(true);
//       return false;
//     }
//     return true;
//   };

//   const showDetail = async (id: string | number) => {
//     try {
//       const response = await axios.get(getUrl(`${url}/${id}`), {
//         headers: { Authorization: token },
//       });
//       setItem(response.data);
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         error401();
//       }
//     }
//   };

//   const deleteMutation = useMutation(
//     (id: number | string) =>
//       axios.delete(getUrl(`${url}/${id}`), {
//         headers: { Authorization: token },
//       }),
//     {
//       onSuccess: () => {
//         toast.success("عملیات با موفقیت انجام شد");
//         showList();
//       },
//       onError: (error) => {
//         if (axios.isAxiosError(error)) {
//           if (
//             error.response?.status === 401 ||
//             error.response?.status === 409
//           ) {
//           }
//         }
//       },
//     }
//   );

//   const updateMutation = useMutation(
//     (id: any) => {
//       const data = { ...item };
//       delete data?.created;
//       delete data?.updated;
//       delete data?.createdById;
//       delete data?.createdByName;
//       delete data?.updatedByName;
//       delete data?.updatedById;
//       delete data?.organizationName;
//       delete data?.fullTitle;
//       delete data?.bnkKpis;
//       delete data?.bnkKpiValue;
//       delete data?.parentName;
//       delete data?.groupName;
//       delete data?.menuName;
//       delete data?.roleName;
//       delete data?.userName;
//       delete data?.parentName;
//       return axios.put(getUrl(`${url}/${id}`), data, {
//         headers: { Authorization: token },
//       });
//     },
//     {
//       onSuccess: () => {
//         toast.success("عملیات با موفقیت انجام شد");
//         setItem({} as T);
//         showList();
//       },
//       onError: () => {
//         toast.error("خطا در ذخیره سازی");
//       },
//     }
//   );

//   const insertMutation = useMutation(
//     () => {
//       if (!formIsValid()) return;
//       return axios.post(url, item, {
//         headers: { Authorization: token },
//       });
//     },
//     {
//       onSuccess: () => {
//         toast.success("عملیات با موفقیت انجام شد");
//         showList();
//         setInserting(false);
//         setItem({} as T);
//       },
//       onError: () => {
//         toast.error("خطا در ذخیره سازی");
//         setInserting(false);
//       },
//     }
//   );

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     setItem((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     setItem((prev) => ({ ...prev, [name]: parseInt(value) }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { files, name } = e.target;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (files) {
//         setItem((prev) => ({
//           ...prev,
//           [name]: files[0],
//           imagePath: reader.result as string,
//         }));
//       }
//     };
//     if (files) {
//       reader.readAsDataURL(files[0]);
//     }
//   };

//   const handleSelectChange = (
//     e: React.ChangeEvent<HTMLSelectElement> | string,
//     name: string
//   ) => {
//     const value = e;
//     setItem((prev) => ({
//       ...prev,
//       [name]: parseInt(value) ? parseInt(value) : value,
//     }));
//   };

//   useEffect(() => {
//     showList();
//   }, []);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSearch((prev) => ({ ...prev, [name]: value }));
//   };

//   return {
//     list: data?.content || [],
//     formRef,
//     validated,
//     showDetail,
//     deleteItem: deleteMutation.mutate,
//     updateItem: updateMutation.mutate,
//     insertItem: insertMutation.mutate,
//     handleInputChange,
//     item,
//     setItem,
//     isLoading,
//     handleSelectChange,
//     setInsertModal,
//     insertModal,
//     insertExcelFile,
//     setExcelfile,
//     pageSize,
//     pageNo,
//     showList,
//     pageNumbers,
//     formIsValid,
//     setValidated,
//     isInserting,
//     handleSearchChange,
//     search,
//     sortedBy,
//     setSortedBy,
//     displayPDF,
//     pdf,
//     setPdf,
//     exportExcel,
//     error401,
//     handleNumberChange,
//     handleImageChange,
//     setInserting,
//     dateParser,
//   };
// }

// export default useControler;
