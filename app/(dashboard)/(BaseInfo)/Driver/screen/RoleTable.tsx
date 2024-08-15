"use client";
import * as React from "react";

import {
  ArrowUpDown,
  ChevronDown,
  SearchIcon,
  SearchX,
  UserCheck,
  UserCog,
  CalendarClock,
  PlusCircle,
  Home,
  Layers,
  Box,
} from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PickerSelect from "@/components/picker/PickerSelect";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Organization, ResType, Role, User, UserGroup, UserGroupRole, UserRole } from "@/types/types";
import useControler from "@/hooks/crudHandler";
import PersianDate from "@alireza-ab/persian-date";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stacks, Stacks2 } from "@/components/svg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuthStore, usePickerStore } from "@/store";
import axios from "axios";
import { getUrl } from "@/hooks/utility";

export default function RoleTable() {
  const loadPickerOptions = [
    {
      url: "v1/pts/location?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "location",
    },
    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
    {
      url: "v1/uac/role?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "role",
    },
    {
      url: "v1/uac/group?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "group",
    },
    {
      url: "v1/uac/user?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "user",
    },
  ];
  const URL = "v1/uac/role";
  const columnOptions = [
    {
      accessorKey: "نام ",
      name: "name",
      color: "success",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },

    {
      accessorKey: "عنوان ",
      name: "displayName",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "نام سازمان ",
      name: "organizationName",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
  ];
  const roleColumnOptions = [
    {
      accessorKey: "کاربر ",
      name: "username",
      color: "success",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "نقش ",
      name: "masterRoleName",
      color: "success",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "توضیحات ",
      name: "description",
      color: "success",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
  ];
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "اطلاعات پایه", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "سازمان ها", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  const Filed = [
    {
      accessorKey: "نام",
      name: "name",
      type: "text",
      picker: "",
    },

    {
      accessorKey: "عنوان",
      name: "displayName",
      type: "text",
      picker: "",
    },

    {
      accessorKey: "توضیحات",
      name: "description",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "سازمان ",
      name: "organizationId",
      type: "select",
      picker: "organization",
    },
  ];
  const Router = useRouter();
  const [searchBoxVisibility, setSearchBoxVisibility] = React.useState<{ [key: string]: boolean }>({});
  const [roleList, setRoleList] = React.useState<UserRole[]>([]);
  const [groupList, setGroupList] = React.useState<UserGroup[]>([]);
  const [usergroupRoleList, setuserGroupRoleList] = React.useState<UserGroupRole[]>([]);
  const [isRoleInsert, setIsRoleInsert] = React.useState<boolean>(false);
  const [isGroupInsert, setIsGroupInsert] = React.useState<boolean>(false);
  const [isUserInsert, setIsUserInsert] = React.useState<boolean>(false);

  const isMobile = useMediaQuery("(min-width: 768px)");
  const { token, organizationId } = useAuthStore();
  const { loadPicker } = usePickerStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sort, setSort] = React.useState(false);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [row, setRow] = React.useState<User & UserRole & UserGroup>({} as User & UserRole & UserGroup);
  const {
    list,
    showDetail,
    deleteItem,
    updateItem,
    insertItem,
    handleInputChange,
    item,
    setItem,
    isLoading,
    showList,
    pageSize,
    pageNo,
    handleSearchChange,
    handleSelectChange,
    search,
  } = useControler<User>(URL);
  console.log(item.fullTitle);
  const data = list;
  const [edit, setEdit] = React.useState(false);
  const [roleAssign, setRoleAssign] = React.useState<boolean>(false);
  const [groupAssign, setGroupAssign] = React.useState<boolean>(false);
  const [userAssign, setUserAssign] = React.useState<boolean>(false);
  React.useEffect(() => {
    loadPickerOptions.map((item) => {
      if (item.url) {
        loadPicker({
          url: item.url,
          picker: item.picker,
          token: token!,
        });
      }
    });
  }, []);

  const columns: ColumnDef<User>[] = [
    ...columnOptions.map((item) => ({
      accessorKey: item.accessorKey,
      header: ({ column }: any) => {
        const isSearching = searchBoxVisibility[item.accessorKey] || false;

        return (
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                style={{ width: "fit-content" }}
                onClick={() => {
                  setSort((e) => !e);
                  sort ? showList(pageNo, pageSize, "asc") : showList(pageNo, pageSize, "desc");
                }}
              >
                {item.accessorKey}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <button
                onClick={() => setSearchBoxVisibility((prev) => ({ ...prev, [item.accessorKey]: !isSearching }))}
                className="ml-2"
              >
                {isSearching ? (
                  <SearchX className="h-5 w-5 text-gray-500 cursor-pointer" />
                ) : (
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className={`searchInputTable ${isSearching ? "open" : "closed"}`}>
              {isSearching && (
                <Input
                  style={{ margin: "10px 0px", width: "100%" }}
                  placeholder={`جستجو ${column.id}...`}
                  name={item.name}
                  autoFocus
                  value={search[item.name]}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      showList();
                    }
                  }}
                />
              )}
            </div>
          </div>
        );
      },
      cell: ({ row }: any) => (
        <div className="font-medium text-card-foreground/80">
          <div className="flex space-x-3 rtl:space-x-reverse items-center">
            <span className="text-sm text-card-foreground whitespace-nowrap">
              {item.color ? (
                <Badge variant="soft" color={item.color} className="capitalize">
                  {row.original[item.name]}
                </Badge>
              ) : (
                <span>{row.original[item.name]}</span>
              )}
            </span>
          </div>
        </div>
      ),
    })),
    {
      id: "عملیات",
      header: ({ table }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                عملیات ها <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
      cell: ({ row }: any) => {
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Button
              size="icon"
              variant="outline"
              color="info"
              className="h-7 w-7"
              onClick={() => {
                setEdit(true);
                showDetail(row.original.id!);
              }}
            >
              <Icon icon="heroicons:pencil" className="h-4 w-4" />
            </Button>{" "}
            <Button
              size="icon"
              variant="outline"
              color="secondary"
              className="h-7 w-7"
              onClick={() => {
                setRoleAssign(true);
                setRow(row);
                getRoleList(row.original.id!);
              }}
            >
              <Icon icon="heroicons:cog" className="h-4 w-4" />
              <Icon icon="heroicons:user" className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              color="warning"
              className="h-7 w-7"
              onClick={() => {
                setGroupAssign(true);
                setRow(row);
                getGroupList(row.original.id!);
              }}
            >
              <Icon icon="heroicons:users" className="h-4 w-4" />
            </Button>{" "}
            <Button
              size="icon"
              variant="outline"
              color="warning"
              className="h-7 w-7"
              onClick={() => {
                setUserAssign(true);
                setRow(row);
                getUserList(row.original.id!);
              }}
            >
              <Icon icon="heroicons:user" className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="outline" className="h-7 w-7" color="warning">
                  <Icon icon="heroicons:trash" className="h-4 w-4" color="warning" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{`آیا از پاک کردن ${row.original.fullTitle} اطمینان دارید؟`} </AlertDialogTitle>
                  <AlertDialogDescription>
                    در صورت پاک کردن شما قادر به بازگرداندن آن نخواهید بود
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-warning">انصراف</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-success hover:bg-destructive/80"
                    onClick={() => deleteItem(row.original.id!)}
                  >
                    تایید
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];
  const getUserList = async (id: number) => {
    try {
      const { data } = await axios.get<ResType<UserGroupRole[] | []>>(
        getUrl(
          `v1/uac/userGroupRole?search=(deleted:0 AND active:true AND active:true AND masterRole.id:${id} AND type:ENT_USER)&size=1000&page=0&sort=created,desc`
        ),
        {
          headers: { Authorization: token },
        }
      );
      setuserGroupRoleList(data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const getRoleList = async (id: number) => {
    try {
      const { data } = await axios.get<ResType<(UserRole[] & UserGroupRole[]) | []>>(
        getUrl(
          `v1/uac/userGroupRole?search=(deleted:0 AND active:true AND active:true AND masterRole.id:${id} AND type:ENT_ROLE)&size=1000&page=0&sort=created,desc`
        ),
        {
          headers: { Authorization: token },
        }
      );
      setRoleList(data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const getGroupList = async (id: number) => {
    try {
      const { data } = await axios.get<ResType<(UserRole[] & UserGroup[] & UserGroupRole[]) | []>>(
        getUrl(
          `v1/uac/userGroupRole?search=(deleted:0 AND active:true AND active:true AND masterRole.id:${id} AND type:ENT_GROUP)&size=1000&page=0&sort=created,desc`
        ),
        {
          headers: { Authorization: token },
        }
      );
      setGroupList(data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      // rowSelection,
    },
  });
  const EditingDialog = () => {
    return (
      <Dialog
        open={edit}
        onOpenChange={() => {
          setEdit(false);
          setItem({} as User);
        }}
      >
        <DialogContent dir="rtl" size="5xl">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between" style={{ width: "98%" }}>
                <div>ویرایش {item.fullTitle}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <CalendarClock color="gray" style={{ cursor: "pointer" }} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[196px]" style={{ zIndex: "999999" }} align="start">
                    <DropdownMenuItem className=" focus:bg-transparent focus:text-default-950 text-default-500 cursor-pointer justify-center">
                      <div className="flex flex-nowrap items-center gap-3">
                        <span>
                          <UserCheck />
                        </span>
                        <div style={{ display: "flex", flexDirection: "column" }} className="flex flex-col">
                          <span>{item.createdByName} </span>
                          {/* <span>{persianDate.fromGregorian(item.created?.substring(0, 10)).toString()}</span> */}
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" focus:bg-transparent focus:text-default-950 text-default-500 cursor-pointer justify-center">
                      <div className="flex flex-nowrap items-center gap-3">
                        <span>
                          <UserCog />
                        </span>
                        <div className="flex flex-col">
                          <span>{item.createdByName} </span>
                          {/* <span>{persianDate.fromGregorian(item.updated?.substring(0, 10)).toString()}</span> */}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogTitle>
            <form
              onSubmit={() => {
                updateItem(item.id);
                setItem({} as User);
                setEdit(false);
              }}
              className=" space-y-5 pt-4"
            >
              <div className="max-h-[300px]">
                <div className="h-full px-6">
                  <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                    {Filed.map(
                      (filetype) =>
                        filetype.type === "text" &&
                        filetype.name !== "password" &&
                        filetype.name !== "email" && (
                          <div className="flex flex-col gap-2">
                            <Label>{filetype.accessorKey}</Label>
                            <Input
                              name={filetype.name}
                              value={item[filetype.name as keyof User]}
                              onChange={handleInputChange}
                            />
                          </div>
                        )
                    )}
                    {Filed.map(
                      (filetype) =>
                        filetype.type === "select" && (
                          <div className="flex flex-col gap-2">
                            <Select name="roleId" onValueChange={(e) => handleSelectChange(e, filetype.name)}>
                              <Label>{filetype.accessorKey}</Label>
                              <SelectTrigger dir="rtl">
                                <SelectValue placeholder="انتخاب کنید..." />
                              </SelectTrigger>
                              <SelectContent style={{ zIndex: 9099999 }}>
                                <PickerSelect picker={"role"} />
                              </SelectContent>
                            </Select>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 gap-2">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    color="destructive"
                    onClick={() => {
                      setEdit(false);
                      setItem({} as User);
                    }}
                  >
                    انصراف
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    color="success"
                    onClick={() => {
                      updateItem(item.id);
                      setItem({} as User);
                      setEdit(false);
                    }}
                  >
                    ذخیره
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };
  const InsertDialog = () => {
    return (
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="soft"
                  style={{ backgroundColor: "green", color: "white" }}
                  className="fixed ltr:right-4 rtl:left-4 bottom-24 z-50 rounded-full h-12 w-12"
                >
                  {" "}
                  <Stacks2 className="h-7 w-7" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent color="success" side="right">
              ایجاد
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent dir="rtl" size="5xl">
          <DialogHeader>
            <DialogTitle>ایجاد</DialogTitle>
            <form
              onSubmit={() => {
                insertItem();
                setItem({} as User);
              }}
              className=" space-y-5 pt-4"
            >
              <div className="max-h-[300px]">
                <div className="h-full px-6">
                  <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                    {Filed.map(
                      (filetype) =>
                        filetype.type === "text" && (
                          <div className="flex flex-col gap-2">
                            <Label>{filetype.accessorKey}</Label>
                            <Input
                              name={filetype.name}
                              value={item[filetype.name as keyof User]}
                              onChange={handleInputChange}
                            />
                          </div>
                        )
                    )}
                    {Filed.map(
                      (filetype) =>
                        filetype.type === "select" && (
                          <div className="flex flex-col gap-2">
                            <Select
                              value={item[filetype.name as keyof User]}
                              name={filetype.name}
                              onValueChange={(e) => handleSelectChange(e, filetype.name)}
                            >
                              <Label>{filetype.accessorKey}</Label>
                              <SelectTrigger dir="rtl">
                                <SelectValue placeholder="انتخاب کنید..." />
                              </SelectTrigger>
                              <SelectContent style={{ zIndex: 9099999 }}>
                                <PickerSelect picker={filetype.picker} />
                              </SelectContent>
                            </Select>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" color="destructive" onClick={() => setEdit(false)}>
                    انصراف
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    color="success"
                    onClick={() => {
                      insertItem();
                      setItem({} as User);
                    }}
                  >
                    ذخیره
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };
  const roleAssignInsert = async () => {
    // if (!this.formIsValid()) return;
    const data = {
      masterRoleId: +row.id,
      roleId: row.roleId,

      organizationId: organizationId,
      description: row.description,
      type: "ENT_ROLE",
      active: true,
    };
    try {
      await axios
        .post(getUrl("v1/uac/userGroupRole"), data, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response.status == 201 || response.status == 200) {
            showList();
            getRoleList(row.id);
          } else {
          }
        });
    } catch (error) {}
  };
  const groupAssignInsert = async () => {
    // if (!this.formIsValid()) return;
    const data = {
      masterRoleId: row.id,
      groupId: row.groupId,

      organizationId: organizationId,
      description: row.description,
      type: "ENT_GROUP",
      active: true,
    };
    try {
      await axios
        .post(getUrl("v1/uac/userGroupRole"), data, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response.status == 201 || response.status == 200) {
            getGroupList(row.id);
            setIsGroupInsert(false);
          } else {
          }
        });
    } catch (error) {}
  };
  const userAssignInsert = async () => {
    // if (!this.formIsValid()) return;
    const data = {
      userId: row.userId,
      masterRoleId: +row.id,

      organizationId: organizationId,
      description: row.description,
      type: "ENT_USER",
      active: true,
    };
    try {
      await axios
        .post(getUrl("v1/uac/userGroupRole"), data, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response.status == 201 || response.status == 200) {
            getUserList(row.id);
            setIsGroupInsert(false);
          } else {
          }
        });
    } catch (error) {}
  };
  const RoleBox = () => {
    return (
      <Dialog
        open={roleAssign}
        onOpenChange={() => {
          setRoleAssign(false);
        }}
      >
        <DialogContent dir="rtl" size="5xl">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between" style={{ width: "98%" }}>
                <div>لیست نقش ها {item.fullTitle}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <CalendarClock color="gray" style={{ cursor: "pointer" }} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[196px]" style={{ zIndex: "999999" }} align="start">
                    <DropdownMenuItem className=" focus:bg-transparent focus:text-default-950 text-default-500 cursor-pointer justify-center">
                      <div className="flex flex-nowrap items-center gap-3">
                        <span>
                          <UserCheck />
                        </span>
                        <div style={{ display: "flex", flexDirection: "column" }} className="flex flex-col">
                          <span>{item.createdByName} </span>
                          {/* <span>{persianDate.fromGregorian(item.created?.substring(0, 10)).toString()}</span> */}
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" focus:bg-transparent focus:text-default-950 text-default-500 cursor-pointer justify-center">
                      <div className="flex flex-nowrap items-center gap-3">
                        <span>
                          <UserCog />
                        </span>
                        <div className="flex flex-col">
                          <span>{item.createdByName} </span>
                          {/* <span>{persianDate.fromGregorian(item.updated?.substring(0, 10)).toString()}</span> */}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogTitle>
            {!isRoleInsert && (
              <Button
                color="success"
                className="mt-10"
                onClick={() => {
                  setIsRoleInsert(true);
                }}
              >
                تخصیص نقش
              </Button>
            )}

            {isRoleInsert && (
              <>
                <div className="max-h-[300px]">
                  <div className="h-full px-6">
                    <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                      <div className="flex flex-col gap-2">
                        <Select
                          name="roleId"
                          value={row.roleId}
                          onValueChange={(e) => {
                            console.log(e);
                            setRow({ ...row, roleId: +e });
                          }}
                        >
                          <Label>نقش</Label>
                          <SelectTrigger dir="rtl">
                            <SelectValue placeholder="انتخاب کنید..." />
                          </SelectTrigger>
                          <SelectContent style={{ zIndex: 9099999 }}>
                            <PickerSelect picker={"role"} />
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>توضیحات</Label>

                        <Input
                          name="description"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setRow({ ...row, description: e.target.value });
                          }}
                          value={item.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 gap-2">
                  <Button type="button" variant="outline" color="destructive" onClick={() => setIsRoleInsert(false)}>
                    انصراف
                  </Button>

                  <Button
                    color="success"
                    onClick={() => {
                      roleAssignInsert();
                    }}
                  >
                    ذخیره
                  </Button>
                </div>
              </>
            )}
            <Table wrapperClass="h-[300px] overflow-auto custom-scrollbar">
              <TableHeader>
                <TableRow>
                  {roleColumnOptions.map((column, index: number) => (
                    <TableHead key={`simple-table-${index} `}>{column.accessorKey}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {roleList.length == 0 && (
                  <TableRow className="text-center">
                    <TableCell></TableCell>
                    <TableCell>نقشی برای این کاربر پیدا نشد</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
                {roleList.map((item, index) => (
                  <TableRow className="text-center" key={index}>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell>{item.masterRoleName}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };
  const GroupBox = () => {
    return (
      <Dialog
        open={groupAssign}
        onOpenChange={() => {
          setGroupAssign(false);
        }}
      >
        <DialogContent dir="rtl" size="5xl">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between" style={{ width: "98%" }}>
                <div> گروه ها </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <CalendarClock color="gray" style={{ cursor: "pointer" }} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[196px]" style={{ zIndex: "999999" }} align="start">
                    <DropdownMenuItem className=" focus:bg-transparent focus:text-default-950 text-default-500 cursor-pointer justify-center">
                      <div className="flex flex-nowrap items-center gap-3">
                        <span>
                          <UserCheck />
                        </span>
                        <div style={{ display: "flex", flexDirection: "column" }} className="flex flex-col">
                          <span>{item.createdByName} </span>
                          {/* <span>{persianDate.fromGregorian(item.created?.substring(0, 10)).toString()}</span> */}
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" focus:bg-transparent focus:text-default-950 text-default-500 cursor-pointer justify-center">
                      <div className="flex flex-nowrap items-center gap-3">
                        <span>
                          <UserCog />
                        </span>
                        <div className="flex flex-col">
                          <span>{item.createdByName} </span>
                          {/* <span>{persianDate.fromGregorian(item.updated?.substring(0, 10)).toString()}</span> */}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogTitle>
            {!isGroupInsert && (
              <Button
                color="success"
                className="mt-10"
                onClick={() => {
                  setIsGroupInsert(true);
                }}
              >
                تخصیص گروه
              </Button>
            )}

            {isGroupInsert && (
              <>
                <div className="max-h-[300px]">
                  <div className="h-full px-6">
                    <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                      <div className="flex flex-col gap-2">
                        <Select
                          name="groupId"
                          value={row.groupId}
                          onValueChange={(e) => {
                            console.log(e);
                            setRow({ ...row, groupId: +e });
                          }}
                        >
                          <Label>گروه</Label>
                          <SelectTrigger dir="rtl">
                            <SelectValue placeholder="انتخاب کنید..." />
                          </SelectTrigger>
                          <SelectContent style={{ zIndex: 9099999 }}>
                            <PickerSelect picker={"group"} />
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>توضیحات</Label>

                        <Input
                          name="description"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setRow({ ...row, description: e.target.value });
                          }}
                          value={item.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 gap-2">
                  <Button type="button" variant="outline" color="destructive" onClick={() => setIsGroupInsert(false)}>
                    انصراف
                  </Button>

                  <Button
                    color="success"
                    onClick={() => {
                      groupAssignInsert();
                    }}
                  >
                    ذخیره
                  </Button>
                </div>
              </>
            )}
            <Table wrapperClass="h-[300px] overflow-auto custom-scrollbar">
              <TableHeader>
                <TableRow>
                  <TableHead>کاربر</TableHead>
                  <TableHead>گروه</TableHead>
                  <TableHead>توضیحات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roleList.length == 0 && (
                  <TableRow className="text-center">
                    <TableCell></TableCell>
                    <TableCell>نقشی برای این کاربر پیدا نشد</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
                {groupList.map((item, index) => (
                  <TableRow className="text-center" key={index}>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell>{item.groupName}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };
  const UserBox = () => {
    return (
      <Dialog
        open={userAssign}
        onOpenChange={() => {
          setUserAssign(false);
        }}
      >
        <DialogContent dir="rtl" size="5xl">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between" style={{ width: "98%" }}>
                <div> کاربران </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <CalendarClock color="gray" style={{ cursor: "pointer" }} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[196px]" style={{ zIndex: "999999" }} align="start">
                    <DropdownMenuItem className=" focus:bg-transparent focus:text-default-950 text-default-500 cursor-pointer justify-center">
                      <div className="flex flex-nowrap items-center gap-3">
                        <span>
                          <UserCheck />
                        </span>
                        <div style={{ display: "flex", flexDirection: "column" }} className="flex flex-col">
                          <span>{item.createdByName} </span>
                          {/* <span>{persianDate.fromGregorian(item.created?.substring(0, 10)).toString()}</span> */}
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" focus:bg-transparent focus:text-default-950 text-default-500 cursor-pointer justify-center">
                      <div className="flex flex-nowrap items-center gap-3">
                        <span>
                          <UserCog />
                        </span>
                        <div className="flex flex-col">
                          <span>{item.createdByName} </span>
                          {/* <span>{persianDate.fromGregorian(item.updated?.substring(0, 10)).toString()}</span> */}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogTitle>
            {!isUserInsert && (
              <Button
                color="success"
                className="mt-10"
                onClick={() => {
                  setIsUserInsert(true);
                }}
              >
                تخصیص کاربر
              </Button>
            )}
            {isUserInsert && (
              <>
                <div className="max-h-[300px]">
                  <div className="h-full px-6">
                    <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                      <div className="flex flex-col gap-2">
                        <Select
                          name="userId"
                          value={row.userId}
                          onValueChange={(e) => {
                            console.log(e);
                            setRow({ ...row, userId: +e });
                          }}
                        >
                          <Label>کاربر</Label>
                          <SelectTrigger dir="rtl">
                            <SelectValue placeholder="انتخاب کنید..." />
                          </SelectTrigger>
                          <SelectContent style={{ zIndex: 9099999 }}>
                            <PickerSelect picker={"user"} />
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>توضیحات</Label>

                        <Input
                          name="description"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setRow({ ...row, description: e.target.value });
                          }}
                          value={item.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 gap-2">
                  <Button type="button" variant="outline" color="destructive" onClick={() => setIsGroupInsert(false)}>
                    انصراف
                  </Button>

                  <Button
                    color="success"
                    onClick={() => {
                      userAssignInsert();
                    }}
                  >
                    ذخیره
                  </Button>
                </div>
              </>
            )}
            <Table wrapperClass="h-[300px] overflow-auto custom-scrollbar">
              <TableHeader>
                <TableRow>
                  <TableHead>نقش</TableHead>
                  <TableHead>کاربر</TableHead>
                  <TableHead>توضیحات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usergroupRoleList.length == 0 && (
                  <TableRow className="text-center">
                    <TableCell></TableCell>
                    <TableCell>نقشی برای این کاربر پیدا نشد</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
                {usergroupRoleList.map((item, index) => (
                  <TableRow className="text-center" key={index}>
                    <TableCell>{item.roleName}</TableCell>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };
  return (
    <div className="relative">
      <Breadcrumbs className="mb-2">
        <BreadcrumbItem endContent={<Home className="h-4 w-4" />} onClick={() => Router.push("/")}>
          خانه
        </BreadcrumbItem>
        <BreadcrumbItem endContent={<Layers className="h-4 w-4" />}>مدیریت کاربران</BreadcrumbItem>
        <BreadcrumbItem endContent={<Box className="h-4 w-4" />}>نقش</BreadcrumbItem>
      </Breadcrumbs>
      <div className={cn("rounded-md  bg-card text-card-foreground shadow-sm")}>
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={`${
                          header.id == "عملیات" && "font-semibold sticky left-0 bg-background drop-shadow-md"
                        }`}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => {
                      console.log(cell.getContext());
                      console.log(cell.column.id);
                      return (
                        <TableCell
                          className={`${
                            cell.column.id == "عملیات" &&
                            "font-medium  text-card-foreground/80 sticky left-0 bg-background drop-shadow-md"
                          }`}
                          key={cell.id}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    درحال دریافت اطلاعات...
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-right">
                    رکوردی یافت نشد.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center flex-wrap gap-4 px-4 py-4">
          <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
            {table.getFilteredSelectedRowModel().rows.length} از {table.getFilteredRowModel().rows.length} ردیف انتخاب
            شده.
          </div>

          <div className="flex gap-2  items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8"
            >
              <Icon icon="heroicons:chevron-left" className="w-5 h-5 rtl:rotate-180" />
            </Button>

            {table.getPageOptions().map((page, pageIdx) => (
              <Button
                key={`basic-data-table-${pageIdx}`}
                onClick={() => table.setPageIndex(pageIdx)}
                className={cn("w-8 h-8")}
              >
                {page + 1}
              </Button>
            ))}
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <Icon icon="heroicons:chevron-right" className="w-5 h-5 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </div>
      {InsertDialog()}
      {EditingDialog()}
      {RoleBox()}
      {GroupBox()}
      {UserBox()}
    </div>
  );
}
