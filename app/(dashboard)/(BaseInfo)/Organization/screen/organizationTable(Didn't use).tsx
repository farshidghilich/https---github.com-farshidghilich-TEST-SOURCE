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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PickerSelect from "@/components/picker/PickerSelect";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Organization } from "@/types/types";
import useControler from "@/hooks/crudHandler";
import PersianDate from "@alireza-ab/persian-date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stacks, Stacks2 } from "@/components/svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuthStore, usePickerStore } from "@/store";
const persianDate = new PersianDate();
function OrganizationTable() {
  const Router = useRouter();
  const isMobile = useMediaQuery("(min-width: 768px)");
  const { token } = useAuthStore();
  const { loadPicker } =
    usePickerStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sort, setSort] = React.useState(false);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
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
    search
  } = useControler<Organization>("v1/meyar/organization");
  const data = list;
  const [edit, setEdit] = React.useState(false);
  React.useEffect(() => {
    loadPicker({
      url: "v1/meyar/location?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "location",
      token: token!,
    });
  }, []);
  const columns: ColumnDef<Organization>[] = [
    {
      id: "select",
      header: () => <div></div>,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "نام سازمان",
      header: ({ column, table }) => {
        const [isSearching, setIsSearching] = React.useState(false);

        return (
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                style={{ width: "fit-content" }}
                onClick={() => {
                  setSort((e) => !e);
                  sort
                    ? showList(pageNo, pageSize, "asc")
                    : showList(pageNo, pageSize, "desc");
                }}
              >
                نام سازمان
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <button
                onClick={() => setIsSearching(e=>!e)}
                className="ml-2"
              >
                {isSearching ? (
                  <SearchX className="h-5 w-5 text-gray-500 cursor-pointer" />
                ) : (
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <div
              className={`searchInputTable ${isSearching ? "open" : "closed"}`}
            >
              {true && (
                <Input
                  style={{ margin: "10px 0px", width: "100%" }}
                  placeholder={`جستجو ${column.id}...`}
                  name="fullTitle"
                  value={search.fullTitle}
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
      cell: ({ row }) => {
        return (
          <div className="font-medium text-card-foreground/80">
            <div className="flex space-x-3 rtl:space-x-reverse items-center">
              <span className="text-sm text-card-foreground whitespace-nowrap">
                {row.original.fullTitle}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "محل",
      header: ({ column, table }) => {
        const [isSearching, setIsSearching] = React.useState(false);

        return (
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                style={{ width: "fit-content" }}
                onClick={() => {
                  setSort((e) => !e);
                  sort
                    ? showList(pageNo, pageSize, "asc")
                    : showList(pageNo, pageSize, "desc");
                }}
              >
                محل
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <button
                onClick={() => setIsSearching(!isSearching)}
                className="ml-2"
              >
                {isSearching ? (
                  <SearchX className="h-5 w-5 text-gray-500 cursor-pointer" />
                ) : (
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <div
              className={`searchInputTable ${isSearching ? "open" : "closed"}`}
            >
              {isSearching && (
                <Input
                  style={{ margin: "10px 0px", width: "100%" }}
                  placeholder={`جستجو ${column.id}...`}
                  value={
                    (table.getColumn("محل")?.getFilterValue() as string) || ""
                  }
                  onChange={(event) =>
                    table.getColumn("محل")?.setFilterValue(event.target.value)
                  }
                />
              )}
            </div>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase whitespace-nowrap">
          {row.original.locationName}
        </div>
      ),
    },
    {
      accessorKey: "آدرس",
      header: ({ column, table }) => {
        const [isSearching, setIsSearching] = React.useState(false);

        return (
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                style={{ width: "fit-content" }}
                onClick={() => {
                  setSort((e) => !e);
                  sort
                    ? showList(pageNo, pageSize, "asc")
                    : showList(pageNo, pageSize, "desc");
                }}
              >
                آدرس
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <button
                onClick={() => setIsSearching(!isSearching)}
                className="ml-2"
              >
                {isSearching ? (
                  <SearchX className="h-5 w-5 text-gray-500 cursor-pointer" />
                ) : (
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <div
              className={`searchInputTable ${isSearching ? "open" : "closed"}`}
            >
              {isSearching && (
                <Input
                  style={{ margin: "10px 0px", width: "100%" }}
                  placeholder={`جستجو ${column.id}...`}
                  value={
                    (table.getColumn("آدرس")?.getFilterValue() as string) || ""
                  }
                  onChange={(event) =>
                    table.getColumn("آدرس")?.setFilterValue(event.target.value)
                  }
                />
              )}
            </div>
          </div>
        );
      },
      cell: ({ row }) => (
        <Badge variant="soft" color="info" className=" capitalize">
          {row.original.address}
        </Badge>
      ),
    },
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
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
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
      cell: ({ row }) => {
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Button
              size="icon"
              variant="outline"
              color="secondary"
              className=" h-7 w-7"
              onClick={() => {
                setEdit(true);
                showDetail(row.original.id!);
              }}
            >
              <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className=" h-7 w-7"
                  color="warning"
                >
                  <Icon
                    icon="heroicons:trash"
                    className="h-4 w-4"
                    color="warning"
                  />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {`آیا از پاک کردن ${row.original.fullTitle} اطمینان دارید؟`}{" "}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    در صورت پاک کردن شما قادر به بازگرداندن آن نخواهید بود
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className=" bg-warning">
                    انصراف
                  </AlertDialogCancel>
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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const EditingDialog = () => {
    return (
      <Dialog
        open={edit}
        onOpenChange={() => {
          setEdit(false);
          setItem({});
        }}
      >
        <DialogContent dir="rtl" size="4xl">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between" style={{ width: "98%" }}>
                <div>ویرایش {item.fullTitle}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <CalendarClock color="gray" style={{ cursor: "pointer" }} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[196px]"
                    style={{ zIndex: "999999" }}
                    align="start"
                  >
                    <DropdownMenuItem className=" focus:bg-transparent focus:text-default-950 text-default-500 cursor-pointer justify-center">
                      <div className="flex flex-nowrap items-center gap-3">
                        <span>
                          <UserCheck />
                        </span>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                          className="flex flex-col"
                        >
                          <span>{item.createdByName} </span>
                          <span>
                            {persianDate
                              .fromGregorian(item.created?.substring(0, 10))
                              .toString()}
                          </span>
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
                          <span>
                            {persianDate
                              .fromGregorian(item.updated?.substring(0, 10))
                              .toString()}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogTitle>
            <form action="#" className=" space-y-5 pt-4">
              <div className="max-h-[300px]">
                <div className="h-full px-6">
                  <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                    <div className="flex flex-col gap-2">
                      <Label>نام سازمان</Label>
                      <Input
                        name="name"
                        value={item.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>محل</Label>
                      <Input
                        name="locationName"
                        value={item.locationName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>آدرس</Label>
                      <Input
                        name="address"
                        value={item.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    color="destructive"
                    onClick={() => {
                      setEdit(false);
                      setItem({});
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
                      setItem({});
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
  console.log(item)
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

        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>ایجاد</DialogTitle>
            <form action="#" className=" space-y-5 pt-4">
              <div className="max-h-[300px]">
                <div className="h-full px-6">
                  <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                    <div className="flex flex-col gap-2">
                      <Label>نام سازمان</Label>
                      <Input
                        name="name"
                        value={item.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>محل</Label>
                      <Input
                        name="locationName"
                        value={item.locationName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>آدرس</Label>
                      <Input
                        name="address"
                        value={item.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Select>
                        <Label>محل</Label>
                        <SelectTrigger dir="rtl">
                          <SelectValue placeholder="محل مورد نظر..." />
                        </SelectTrigger>
                        <SelectContent style={{ zIndex: 9099999 }}>
                          <PickerSelect picker={"location"} />
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    color="destructive"
                    onClick={() => setEdit(false)}
                  >
                    انصراف
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    color="success"
                    onClick={() => {
                      insertItem();
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
  return (
    <div className="relative">
      <Breadcrumbs className="mb-2">
        <BreadcrumbItem
          endContent={<Home className="h-4 w-4" />}
          onClick={() => Router.push("/")}
        >
          خانه
        </BreadcrumbItem>
        <BreadcrumbItem endContent={<Layers className="h-4 w-4" />}>
          اطلاعات پایه
        </BreadcrumbItem>
        <BreadcrumbItem endContent={<Box className="h-4 w-4" />}>
          سازمان ها
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className={cn("rounded-md  bg-card text-card-foreground shadow-sm")}>
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    درحال دریافت اطلاعات...
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-right"
                  >
                    رکوردی یافت نشد.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center flex-wrap gap-4 px-4 py-4">
          <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
            {table.getFilteredSelectedRowModel().rows.length} از{" "}
            {table.getFilteredRowModel().rows.length} ردیف انتخاب شده.
          </div>

          <div className="flex gap-2  items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8"
            >
              <Icon
                icon="heroicons:chevron-left"
                className="w-5 h-5 rtl:rotate-180"
              />
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
              <Icon
                icon="heroicons:chevron-right"
                className="w-5 h-5 rtl:rotate-180"
              />
            </Button>
          </div>
        </div>
      </div>
      {InsertDialog()}
      {EditingDialog()}
    </div>
  );
}

export default OrganizationTable;
