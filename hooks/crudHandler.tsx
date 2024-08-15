import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import PersianDate from "@alireza-ab/persian-date";
import { useAuthStore } from "@/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUrl } from "./utility";
import { ResType } from "@/types/types";

// Define types
interface Item {
  organizationId?: string | null;
  [key: string]: any;
}

interface Search {
  [key: string]: string;
}

function useControler<T>(url: string) {
  const route = useRouter();
  const { organizationId, userId } = useAuthStore();
  const persianDate = new PersianDate();
  const [item, setItem] = useState<T>({
    organizationId: organizationId,
    active: true,
    // userId: userId,
  } as T);
  const [search, setSearch] = useState<Search>({});
  const [excelFile, setExcelfile] = useState<File | null>(null);
  const [list, setList] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(100);
  const [validated, setValidated] = useState<boolean>(false);
  const [insertModal, setInsertModal] = useState<boolean>(false);
  const [isInserting, setInserting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [sortedBy, setSortedBy] = useState<string>("");
  const [pdf, setPdf] = useState<string>("");
  const { token } = useAuthStore();
  const dateParser = (date: string): string => {
    return persianDate.fromGregorian(date).toString();
  };

  const getSearch = (): string => {
    let result = "";
    Object.keys(search).forEach((key) => {
      if (search[key] !== undefined && search[key] !== "") result += key + ":" + `"*${search[key]}*"` + " AND ";
    });
    return result;
  };

  const showList = async (
    pN?: number | null,
    pS?: number | null,
    sort?: string | null,
    sortBy?: string | null,
    filter?: string | null
  ) => {
    let predicate = getSearch();
    console.log(predicate);
    if (pN == pageNumbers.at(-1)) {
      pageNumbers.push(pageNumbers.at(-1)! + 1);
    }
    const smallestValue = Math.min(...pageNumbers);
    if (pageNumbers.length > 5) {
      pageNumbers.shift();
    }
    if (smallestValue === pageNo && pageNo !== 1) {
      const data = pageNumbers.map((items) => items - 1).filter((items) => items > 0);
      setPageNumbers(data);
    }
    try {
      setIsLoading(true);
      await axios
        .get(
          getUrl(
            `${url}?search=(deleted:0 AND active:true${predicate && ` AND ${predicate}`}${filter || ``})&size=${
              pS == undefined ? pageSize : pS
            }&page=${pN === undefined && pageNo - 1}&sort=${sortBy === undefined ? `created` : sortBy},${
              sort === undefined ? "desc" : sort
            }`
          ),
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          if (res.data) {
            setList(res.data.content);
            setIsLoading(false);

            setPageNo(pN || 1);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response.status == 401) {
            error401();
          }
        });
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
    }
  };

  const exportExcel = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        getUrl(`${url}/excel?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc`),
        {
          headers: { Authorization: token },
          responseType: "blob",
        }
      );
      if (response.data) {
        setIsLoading(false);
        const blob = new Blob([response.data], {
          type: "application/vnd.ms-excel",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "filename.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        error401();
      }
    }
  };

  const displayPDF = async (pdfUrl: string, condition?: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${pdfUrl}?${condition || ``}`, {
        headers: { Authorization: token },
        responseType: "blob",
      });
      const htmlCode = response.data;
      const updatedHtmlCode = htmlCode.replace(/font-family: SansSerif;/g, "");
      setPdf(updatedHtmlCode);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const error401 = () => {
    const message = "توکن شما منقضی شده است تا لحظاتی بعد به صفحه ورود منتقل میشوید";
    toast.error(message);
    setTimeout(() => {
      route.push("/auth/login");
    }, 2000);
  };

  const formIsValid = (): boolean => {
    const form = formRef.current;
    if (form?.checkValidity() === false) {
      setValidated(true);
      return false;
    }
    return true;
  };

  const showDetail = async (id: string | number) => {
    try {
      const response = await axios.get(getUrl(`${url}/${id}`), {
        headers: { Authorization: token },
      });
      setItem(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        error401();
      }
    }
  };

  const deleteItem = async (id: number | string) => {
    try {
      const response = await axios.delete(getUrl(`${url}/${id}`), {
        headers: { Authorization: token },
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("عملیات با موفقیت انجام شد");
        showList();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 409) {
          toast.error("خطای نامشخص");
        }
      }
    }
  };

  const updateItem = async (id: any) => {
    try {
      const data: any = { ...item };
      delete data?.created;
      delete data?.updated;
      delete data?.createdById;
      delete data?.createdByName;
      delete data?.updatedByName;
      delete data?.updatedById;
      delete data?.organizationName;
      delete data?.fullTitle;
      delete data?.bnkKpis;
      delete data?.bnkKpiValue;
      delete data?.parentName;
      delete data?.groupName;
      delete data?.menuName;
      delete data?.roleName;
      delete data?.userName;
      delete data?.parentName;
      const response = await axios.put(getUrl(`${url}/${id}`), data, {
        headers: { Authorization: token },
      });
      if ([200, 201, 204].includes(response.status)) {
        toast.success("عملیات با موفقیت انجام شد");
        setItem({} as T);

        showList();
      }
    } catch (error) {
      toast.error("خطا در ذخیره سازی");
    }
  };
  const insertItem = async () => {
    if (!formIsValid()) return;
    try {
      setInserting(true);
      const response = await axios.post(url, item, {
        headers: { Authorization: token },
      });
      if ([200, 201, 204].includes(response.status)) {
        toast.success("عملیات با موفقیت انجام شد");
        showList();
        setInserting(false);
        setItem({} as T);
      }
    } catch (error) {
      toast.error("خطا در ذخیره سازی");
      setInserting(false);
      if (axios.isAxiosError(error)) {
      }
    }
  };

  const insertExcelFile = async () => {
    if (!excelFile) return;
    try {
      await axios.post(`v1/aml/file/upload`, excelFile, {
        headers: { Authorization: token },
      });
    } catch (error) {}
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setItem((prev) => ({ ...prev, [name]: parseInt(value) }));
    }
    console.log(item);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (files) {
        setItem((prev) => ({
          ...prev,
          [name]: files[0],
          imagePath: reader.result as string,
        }));
      }
    };
    if (files) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement> | string, name: string) => {
    const value = e;
    setItem((prev) => ({
      ...prev,
      [name]: Number(e) ? Number(e) : e,
    }));
  };

  useEffect(() => {
    showList();
    return () => {};
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  return {
    list,
    formRef,
    validated,
    showDetail,
    deleteItem,
    updateItem,
    insertItem,
    handleInputChange,
    item,
    setItem,
    isLoading,
    handleSelectChange,
    setInsertModal,
    insertModal,
    insertExcelFile,
    setExcelfile,
    pageSize,
    pageNo,
    showList,
    pageNumbers,
    formIsValid,
    setValidated,
    isInserting,
    handleSearchChange,
    search,
    sortedBy,
    setSortedBy,
    displayPDF,
    pdf,
    setPdf,
    exportExcel,
    error401,
    handleNumberChange,
    handleImageChange,
    setInserting,
    dateParser,
  };
}

export default useControler;
