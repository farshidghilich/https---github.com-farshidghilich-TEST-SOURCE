"use client";
import * as React from "react";
import { ArrowUpDown, SearchIcon, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as IranFlag from "@/app/(dashboard)/(BaseInfo)/Inquiry/screen/flag-4.png";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import PersianDate from "@alireza-ab/persian-date";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import useControler from "@/hooks/crudHandler";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuthStore, usePickerStore } from "@/store";
import { AnyThing } from "@/types/types";
import "react-swipeable-list/dist/styles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
const persianDate = new PersianDate();
interface propsSimpleTable {
  Url: string;
  NestedTable?: string;
  postAndPut?: boolean;
  columnOptions: {
    accessorKey: string;
    name: string;
    color?:
      | "default"
      | "secondary"
      | "destructive"
      | "warning"
      | "info"
      | "success"
      | "dark"
      | undefined
      | string;
    plq?: boolean;
    plqSerial?: string;
    plq1?: string;
    plq2?: string;
    plq3?: string;
    time?: string;
  }[];
  BreadCrumbOption?: { title: string; icon: React.ReactNode; path: string }[];
}
function SimpleTable<T extends AnyThing>({
  BreadCrumbOption,
  Url,
  columnOptions,
}: propsSimpleTable) {
  const validationSchema = z.object({
    author: z
      .string()
      .min(3, { message: "Author name must be at least 3 charecters." })
      .max(8, { message: "The author's name must not exceed 8 characters." }),
    phone: z.string().refine((value) => value.length === 11, {
      message: "Phone number must be exactly 11 characters long.",
    }),
    city: z.string().min(3, { message: "Enter minimum 3 charecters" }),
    web: z.string().url({ message: "Enter valid web address" }),
    inputMessage: z
      .string()
      .max(30, { message: "Message should not be exceed 30 charecters." }),
  });

  const Router = useRouter();
  const [searchBoxVisibility, setSearchBoxVisibility] = React.useState<{
    [key: string]: boolean;
  }>({});
  const isMobile = useMediaQuery("(min-width: 768px)");
  const { token } = useAuthStore();
  const { loadPicker } = usePickerStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
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
    handleSelectChange,
    handleNumberChange,
    search,
  } = useControler<T>(Url);
  const data = list;
  const [edit, setEdit] = React.useState(false);
  const isValidISODate = (dateString: string) => {
    // Regex to validate the full ISO date format and the simple date format
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    const simpleDateRegex = /^\d{4}-\d{2}-\d{2}$/;

    // First check for the full ISO date format
    if (isoDateRegex.test(dateString)) {
      const date = new Date(dateString);
      return date instanceof Date && !isNaN(date.getTime());
    }

    // Then check for the simple date format
    if (simpleDateRegex.test(dateString)) {
      const date = new Date(dateString);
      return date instanceof Date && !isNaN(date.getTime());
    }

    return false;
  };
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
  console.log(item);
  const columns: ColumnDef<T>[] = [
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
                  sort
                    ? showList(pageNo, pageSize, "asc")
                    : showList(pageNo, pageSize, "desc");
                }}
              >
                {item.accessorKey}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
              <button
                onClick={() =>
                  setSearchBoxVisibility((prev) => ({
                    ...prev,
                    [item.accessorKey]: !isSearching,
                  }))
                }
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
          <div className="flex space-x-3 rtl:space-x-reverse items-center justify-center">
            <span className="text-sm text-card-foreground whitespace-nowrap">
              {item.color ? (
                <Badge variant="soft" color={item.color} className="capitalize">
                  <span>
                    {Boolean(row.original[item.name]) ? (
                      isValidISODate(row.original[item.name]) ? (
                        persianDate
                          .fromGregorian(
                            row.original[item.name].substring(0, 10)
                          )
                          .toString()
                      ) : (
                        row.original[item.name]
                      )
                    ) : (
                      <span className="text-sm text-red-500">
                        داده وجود ندارد
                      </span>
                    )}
                  </span>
                </Badge>
              ) : item.plq ? (
                <div className=" flex items-center justify-center ">
                  <div
                    className={`flex items-center justify-between w-72 h-16 border-2 border-black rounded-sm p-2 relative ${
                      row.original[item.plq2!] == "ع" ||
                      row.original[item.plq2!] == "ت"
                        ? "bg-yellow-400"
                        : row.original[item.plq2!] == "الف"
                        ? "bg-red-500"
                        : "bg-white"
                    }`}
                  >
                    <div
                      style={{ zIndex: "3" }}
                      className="z-50 flex flex-col items-center justify-center text-white bg-blue-700 w-7 h-full rounded-l-sm absolute left-0"
                    >
                      <div style={{ zIndex: "1", width: "%100" }}>
                        <Image
                          alt="ایران"
                          src={IranFlag}
                          width={100}
                          className=" h-5 mt-1 rounded z-10 rounded-tl-sm"
                        />
                      </div>
                      <div
                        className="mt-auto text-md"
                        style={{ fontSize: "8px" }}
                      >
                        <div
                          style={{ textAlign: "left" }}
                          className="mt-1 mr-1 "
                        >
                          I.R.
                        </div>
                        <div
                          style={{ textAlign: "left" }}
                          className=" mr-1 p-0"
                        >
                          IRAN
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-black w-16 h-full">
                      <div className="text-md persian-text mb-2 mx-auto text-md font-bold">
                        ایران
                      </div>
                      <input
                        type="tel"
                        maxLength={2}
                        value={
                          item.plqSerial ? row.original[item.plqSerial] : "_"
                        }
                        readOnly={true}
                        placeholder="_ _"
                        className="text-lg persian-text text-md font-bold text-center border-none bg-transparent outline-none w-6"
                      />{" "}
                      <div className="border-r-2 border-black h-full absolute right-16 top-0"></div>
                    </div>
                    <div className="flex flex-grow items-center justify-center ml-12 mr-8 gap-5">
                      <input
                        type="tel"
                        maxLength={3}
                        value={item.plq1 ? row.original[item.plq1] : "_"}
                        readOnly={true}
                        placeholder="_ _ _"
                        className="text-lg persian-text text-md font-bold text-center border-none bg-transparent outline-none w-14"
                      />{" "}
                      <div className="persian-text text-xl font-bold border-none bg-transparent outline-none">
                        <div className="persian-text text-xl font-bold border-none bg-transparent outline-none">
                          {item.plq2 ? row.original[item.plq2] : "_"}
                        </div>{" "}
                      </div>{" "}
                      <input
                        type="tel"
                        value={item.plq3 ? row.original[item.plq3] : "_"}
                        maxLength={2}
                        className="text-lg persian-text text-md font-bold text-center border-none bg-transparent outline-none w-10"
                        placeholder="_ _"
                        readOnly={true}
                      />{" "}
                    </div>
                  </div>
                </div>
              ) : (
                <span>
                  {Boolean(row.original[item.name]) ? (
                    isValidISODate(row.original[item.name]) ? (
                      persianDate
                        .fromGregorian(
                          row.original[item.name]?.substring(0, 10)
                        )
                        ?.toString()
                    ) : (
                      row.original[item.name]
                    )
                  ) : (
                    <span className="text-sm text-red-500">
                      داده وجود ندارد
                    </span>
                  )}
                </span>
              )}
            </span>
          </div>
        </div>
      ),
    })),
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

  return (
    <div className="relative">
      <Breadcrumbs className="mb-2">
        {BreadCrumbOption?.map((item) => (
          <BreadcrumbItem
            endContent={item.icon}
            onClick={() => Router.push(item.path)}
          >
            {item.title}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <div className={cn("rounded-md  bg-card text-card-foreground shadow-sm")}>
        <div>
          <Table wrapperClass="max-h-[68vh] overflow-auto custom-scrollbar ">
            <TableHeader className="sticky top-0 bg-card z-40 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={`${
                          header.id == "عملیات" &&
                          isMobile &&
                          "font-semibold sticky  left-0 top-0 bg-background drop-shadow-md z-20"
                        }`}
                        style={{ borderRadius: "15px" }}
                      >
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
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={`${
                            cell.column.id == "عملیات" &&
                            isMobile &&
                            "font-medium  text-card-foreground/80 sticky left-0 bg-background drop-shadow-md z-10"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
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

        <div className="flex items-center flex-wrap justify-center gap-4 px-4 py-4 ">
          <div className="flex gap-2  items-center ">
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
            <div className="flex w-[100px] items-center justify-center text-sm font-medium text-muted-foreground">
              صفحه {table.getState().pagination.pageIndex + 1} از{" "}
              {table.getPageCount()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleTable;
