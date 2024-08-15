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
  Check,
  ChevronsUpDown,
  X,
  Repeat2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as IranFlag from "@/app/(dashboard)/(BaseInfo)/Inquiry/screen/flag-4.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import PersianDate from "@alireza-ab/persian-date";
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
import PickerCombo from "@/components/picker/PickerCombo";
import { Icon } from "@iconify/react";
import useControler from "@/hooks/crudHandler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stacks2 } from "@/components/svg";
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
import { AnyThing } from "@/types/types";
import "react-swipeable-list/dist/styles.css";
import TripDetailTable from "@/app/(dashboard)/(Trip-controller)/passenger/page";
import InputMap from "@/components/Map/Map";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { propsBaseTable } from "@/components/Table/baseTable.types";
import { DimKpiTypes } from "@/types/DimTypes";
const persianDate = new PersianDate();
function DimkpiTable({
  Filed,
  NestedTable,
  BreadCrumbOption,
  Url,
  columnOptions,
  loadPickerOptions,
  postAndPut = true,
}: propsBaseTable<DimKpiTypes>) {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnyThing>({
    resolver: zodResolver(validationSchema),
  });
  const modifiedFiled = Filed.map((field) => ({
    ...field,
    //define and add default order to the Field element for the element that didn't have any order property
    order: field.order || 9000000000000000,
  }));
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
  } = useControler<DimKpiTypes>(Url);
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
  const columns: ColumnDef<DimKpiTypes>[] = [
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
      cell: ({ row }: any) => {
        if (!postAndPut) {
          return null;
        }
        return (
          <div className="flex space-x-3 rtl:space-x-reverse justify-center">
            <Button
              size="icon"
              variant="outline"
              color="secondary"
              className="h-7 w-7"
              onClick={() => {
                setEdit(true);
                showDetail(row.original.id!);
              }}
            >
              <Icon icon="heroicons:pencil" className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
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
                  <AlertDialogCancel className="bg-warning">
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
  const EditSheet = () => {
    return (
      <Sheet
        open={edit}
        onOpenChange={() => {
          setEdit(false);
          setItem({} as T);
        }}
      >
        <SheetContent
          side={isMobile ? "left" : "bottom"}
          className="max-w-[736px]"
          style={{
            height: isMobile ? "none" : "90%",
            borderRadius: isMobile ? "none" : "6% 6% 0% 0% / 5% 5% 25% 25%",
          }}
          dir="rtl"
        >
          {!isMobile && (
            <div className="text-center bg-gray-500 w-12 h-2 mx-auto rounded-md mb-4"></div>
          )}
          <SheetHeader>
            <SheetTitle className="flex align-middle gap-4">
              <div className="flex justify-between" style={{ width: "98%" }}>
                <div className="flex gap-8">
                  ویرایش{" "}
                  {modifiedFiled.map(
                    (filetype, index) =>
                      filetype.type === "switch" && (
                        <div className="flex gap-2">
                          <Label className="text-xs">
                            {filetype.accessorKey}
                          </Label>
                          <Switch
                            checked={!!item[filetype.name as keyof T]}
                            className="h-5 w-11 "
                            thumbClass={cn(
                              "h-6 w-6  data-[state=unchecked]:ml-0 bg-background"
                            )}
                            onCheckedChange={(e) => {
                              setItem((prev) => ({
                                ...prev,
                                [filetype.name]: e,
                              }));
                            }}
                            thumbIcon={
                              item[filetype.name as keyof T] ? (
                                <Check className="text-green-500 stroke-dark w-4 h-4 " />
                              ) : (
                                <X className="text-red-600 stroke-red-600 w-4 h-4" />
                              )
                            }
                          />
                        </div>
                      )
                  )}
                </div>
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
                            {!Array.isArray(item.created) ? (
                              persianDate
                                .fromGregorian(item?.created?.substring(0, 10))
                                .toString()
                            ) : (
                              <div>تاریخ نامعتبر</div>
                            )}
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
                            {!Array.isArray(item.updated) ? (
                              persianDate
                                .fromGregorian(item?.updated?.substring(0, 10))
                                .toString()
                            ) : (
                              <div>تاریخ نامعتبر</div>
                            )}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="max-h-[100%]" style={{ overflowY: "auto" }}>
            <div className="pb-5">
              <div className="md:grid md:grid-cols-2 gap-6 mt-6 space-y-6 md:space-y-0 pb-14">
                {modifiedFiled
                  .sort((a, b) => a.order - b.order)
                  .map(
                    (filetype, index) =>
                      (filetype.type === "text" && (
                        <div className="flex flex-col gap-2">
                          <Label>{filetype.accessorKey}</Label>
                          <Input
                            name={filetype.name}
                            value={item[filetype.name as keyof T]}
                            onChange={handleInputChange}
                            placeholder={filetype.placeholder}
                          />
                        </div>
                      )) ||
                      (filetype.type === "textarea" && (
                        <div className="flex flex-col gap-2">
                          <Label>{filetype.accessorKey}</Label>
                          <Textarea
                            name={filetype.name}
                            value={
                              item[filetype.name as keyof T]
                                ? String(item[filetype.name as keyof T])
                                : ""
                            }
                            onChange={(e) => {
                              console.log(e.target.value);
                              setItem({
                                ...item,
                                [filetype.name]: e.target.value,
                              });
                            }}
                            placeholder={filetype.placeholder}
                          />
                        </div>
                      )) ||
                      (filetype.type === "time" && (
                        <div className="flex flex-col gap-2">
                          <Label>{filetype.accessorKey}</Label>
                          <DatePicker
                            name={filetype.name}
                            calendar={persian}
                            value={
                              item.created
                                ? new Date(
                                    item[filetype.name as keyof T] as string
                                  )
                                : null
                            }
                            className="bg-background"
                            style={{
                              borderRadius: "15px",
                              border:
                                "1px solid hsl(var(--default-300) / var(--tw-border-opacity))",
                              width: "-webkit-fill-available",
                              textAlign: "center",
                              height: "2.6em",
                              cursor: "pointer",
                            }}
                            containerClassName="form-control"
                            inputClass="form-control text-dark"
                            required
                            onChange={(value) => {
                              filetype.name2
                                ? setItem((pre) => {
                                    const temp = {
                                      ...pre,
                                      [filetype.name]: value!
                                        .toDate()
                                        .toISOString(),
                                      [filetype.name2!]: value!
                                        .toDate()
                                        .toISOString(),
                                    };
                                    return temp;
                                  })
                                : setItem((pre) => {
                                    const temp = {
                                      ...pre,
                                      [filetype.name]: value!
                                        .toDate()
                                        .toISOString(),
                                    };
                                    return temp;
                                  });
                            }}
                            placeholder={filetype.placeholder || "1403/01/01"}
                            locale={persian_fa}
                          />
                        </div>
                      )) ||
                      (filetype.type === "timeRange" && (
                        <div className="flex flex-col gap-2">
                          <Label>{filetype.accessorKey}</Label>
                          <DatePicker
                            name={filetype.name}
                            range
                            rangeHover
                            className="bg-background"
                            style={{
                              borderRadius: "15px",
                              width: "-webkit-fill-available",
                              textAlign: "center",
                              height: "2.6em",
                              cursor: "pointer",
                              border: "1px solid rgb(107 114 128 / 37%)",
                            }}
                            value={[
                              item[filetype.startTimeName as keyof T]
                                ? new Date(
                                    item[
                                      filetype.startTimeName as keyof T
                                    ] as string
                                  )
                                : null,
                              item[filetype.endTimeName as keyof T]
                                ? new Date(
                                    item[
                                      filetype.endTimeName as keyof T
                                    ] as string
                                  )
                                : null,
                            ]}
                            calendar={persian}
                            containerClassName="form-control"
                            inputClass="form-control text-dark"
                            required
                            onChange={(values) => {
                              if (values.length === 2) {
                                const [startValue, endValue] = values.map(
                                  (date) => date.toDate().toISOString()
                                );

                                setItem((prev) => ({
                                  ...prev,
                                  [filetype.startTimeName]: startValue,
                                  [filetype.endTimeName]: endValue,
                                }));
                              }
                            }}
                            placeholder={filetype.placeholder || "1403/01/01"}
                            locale={persian_fa}
                          />
                        </div>
                      )) ||
                      (filetype.type === "number" && (
                        <div className="flex flex-col gap-2">
                          <Label>{filetype.accessorKey}</Label>
                          <Input
                            type="number"
                            name={filetype.name}
                            value={item[filetype.name as keyof T]}
                            onChange={handleNumberChange}
                            placeholder={filetype.placeholder}
                          />
                        </div>
                      )) ||
                      (filetype.type === "combobox" && (
                        <div className="flex flex-col gap-2">
                          <Label>{filetype.accessorKey}</Label>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                style={{
                                  border:
                                    "1px solid hsl(var(--default-300) / var(--tw-border-opacity))",
                                  color:
                                    "hsl(var(--default-500) / var(--tw-border-opacity))",
                                }}
                                aria-expanded={open}
                                className="justify-between bg-background hover:bg-background"
                              >
                                <span
                                  className="text-sm"
                                  style={{ fontWeight: "normal" }}
                                >
                                  {value
                                    ? value
                                    : filetype.placeholder
                                    ? filetype.placeholder
                                    : "انتخاب کنید..."}
                                </span>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              dir="rtl"
                              className="p-0"
                              style={{
                                zIndex: 9099999,
                              }}
                            >
                              <Command>
                                <CommandInput
                                  placeholder={`جتسجو ${filetype.accessorKey}`}
                                />
                                <CommandEmpty>{` ${filetype.accessorKey} یافت نشد`}</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea
                                    style={{
                                      maxHeight: "200px",
                                      overflowY: "auto",
                                    }}
                                  >
                                    <PickerCombo
                                      picker={filetype.picker}
                                      setOpen={setOpen}
                                      setValue={setValue}
                                      name={filetype.name}
                                      handleSelectChange={handleSelectChange}
                                    />
                                  </ScrollArea>
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      )) ||
                      (filetype.type === "select" && (
                        <div className="flex flex-col gap-2">
                          <Select
                            value={item[filetype.name as keyof T]}
                            name={filetype.name}
                            onValueChange={(e) =>
                              handleSelectChange(e, filetype.name)
                            }
                          >
                            <Label>{filetype.accessorKey}</Label>
                            <SelectTrigger dir="rtl">
                              <SelectValue
                                placeholder={
                                  filetype.placeholder || "انتخاب کنید..."
                                }
                              />
                            </SelectTrigger>
                            <SelectContent
                              style={{
                                zIndex: 9099999,
                              }}
                            >
                              <ScrollArea
                                style={{
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                <PickerSelect picker={filetype.picker} />
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </div>
                      )) ||
                      (filetype.type === "customSelect" && (
                        <div className="flex flex-col gap-2">
                          <Select
                            value={item[filetype.name as keyof T]}
                            name={filetype.name}
                            onValueChange={(e) => {
                              handleSelectChange(e, filetype.name);
                            }}
                          >
                            <Label>{filetype.accessorKey}</Label>
                            <SelectTrigger dir="rtl">
                              <SelectValue
                                placeholder={
                                  filetype.placeholder || "انتخاب کنید..."
                                }
                              />
                            </SelectTrigger>
                            <SelectContent
                              style={{
                                zIndex: 9099999,
                              }}
                            >
                              {filetype?.selectItem!.map((select) => (
                                <SelectItem
                                  key={index + 1}
                                  value={select.value}
                                  dir="rtl"
                                >
                                  {select.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )) ||
                      (filetype.type === "O&D" && (
                        <div className="flex flex-col gap-2 ">
                          <Label>{filetype.accessorKey}</Label>
                          {/* first */}
                          <div className="flex flex-row gap-2 items-center">
                            <Select
                              value={item[filetype.OriginName as keyof T]}
                              name={filetype.OriginName}
                              onValueChange={(e) =>
                                handleSelectChange(e, filetype.OriginName!)
                              }
                            >
                              <SelectTrigger dir="rtl">
                                <SelectValue
                                  placeholder={filetype.OriginAccessorKey}
                                />
                              </SelectTrigger>
                              <SelectContent
                                style={{
                                  zIndex: 9099999,
                                }}
                              >
                                <ScrollArea
                                  style={{
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                  }}
                                >
                                  <PickerSelect picker={filetype.picker} />
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                            {/* second */}
                            <Repeat2 size={50} />
                            <Select
                              value={item[filetype.DestName as keyof T]}
                              name={filetype.DestName}
                              onValueChange={(e) =>
                                handleSelectChange(e, filetype.DestName!)
                              }
                            >
                              <SelectTrigger dir="rtl">
                                <SelectValue
                                  placeholder={filetype.DestAccessorKey}
                                />
                              </SelectTrigger>
                              <SelectContent
                                style={{
                                  zIndex: 9099999,
                                }}
                              >
                                <ScrollArea
                                  style={{
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                  }}
                                >
                                  <PickerSelect picker={filetype.picker} />
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )) ||
                      (filetype.type === "map" && (
                        <div className="flex flex-col gap-2">
                          <Label>{filetype.accessorKey}</Label>
                          <InputMap
                            setItem={setItem}
                            latName={filetype.latName}
                            longName={filetype.longName}
                            initialPosition={{
                              latitude: item[filetype.latName as keyof T],
                              longitude: item[filetype.longName as keyof T],
                            }}
                          />
                        </div>
                      )) ||
                      (filetype.type === "plq" && (
                        <div className="flex flex-col gap-2">
                          <Label>{filetype.accessorKey}</Label>
                          <div className=" flex items-center justify-center ">
                            <div
                              className={`flex items-center justify-between w-72 h-16 border-2 border-black rounded-sm p-2 relative ${
                                item[filetype.Plq2 as keyof AnyThing] === "ع" ||
                                item[filetype.Plq2 as keyof AnyThing] === "ت"
                                  ? "bg-yellow-400"
                                  : item[filetype.Plq2 as keyof AnyThing] ===
                                    "الف"
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
                                  name={filetype.serialPlq}
                                  value={item[filetype.serialPlq as keyof T]}
                                  onChange={handleInputChange}
                                  placeholder="_ _"
                                  className="text-lg persian-text text-md font-bold text-center border-none bg-transparent outline-none w-6"
                                />{" "}
                                <div className="border-r-2 border-black h-full absolute right-16 top-0"></div>
                              </div>
                              <div className="flex flex-grow items-center justify-center ml-12 mr-8">
                                <input
                                  type="tel"
                                  maxLength={3}
                                  name={filetype.Plq1}
                                  value={item[filetype.Plq1 as keyof T]}
                                  onChange={handleInputChange}
                                  placeholder="_ _ _"
                                  className="text-lg persian-text text-md font-bold text-center border-none bg-transparent outline-none w-14"
                                />{" "}
                                <div className="persian-text text-xl font-bold border-none bg-transparent outline-none">
                                  <select
                                    className="persian-text text-xl font-bold border-none bg-transparent outline-none"
                                    name={filetype.Plq2}
                                    value={
                                      item[filetype.Plq2 as keyof AnyThing]
                                    }
                                    onChange={(e) =>
                                      handleSelectChange(
                                        e.target.value,
                                        filetype.Plq2!
                                      )
                                    }
                                  >
                                    {" "}
                                    <option value="">_</option>
                                    <option value="الف">الف</option>
                                    <option value="ب">ب</option>
                                    <option value="پ">پ</option>
                                    <option value="ت">ت</option>
                                    <option value="ث">ث</option>
                                    <option value="ج">ج</option>
                                    <option value="ح">ح</option>
                                    <option value="د">د</option>
                                    <option value="ذ">ذ</option>
                                    <option value="ر">ر</option>
                                    <option value="ز">ز</option>
                                    <option value="س">س</option>
                                    <option value="ش">ش</option>
                                    <option value="ص">ص</option>
                                    <option value="ض">ض</option>
                                    <option value="ط">ط</option>
                                    <option value="ظ">ظ</option>
                                    <option value="غ">غ</option>
                                    <option value="ع">ع</option>
                                    <option value="ف">ف</option>
                                    <option value="ق">ق</option>
                                    <option value="ک">ک</option>
                                    <option value="گ">گ</option>
                                    <option value="ل">ل</option>
                                    <option value="م">م</option>
                                    <option value="ن">ن</option>
                                    <option value="و">و</option>
                                    <option value="ه">ه</option>
                                  </select>{" "}
                                </div>{" "}
                                <input
                                  type="tel"
                                  name={filetype.Plq3}
                                  value={item[filetype.Plq3 as keyof T]}
                                  onChange={handleInputChange}
                                  maxLength={2}
                                  className="text-lg persian-text text-md font-bold text-center border-none bg-transparent outline-none w-7"
                                  placeholder="_ _"
                                />{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
              </div>
              {NestedTable === "tripDetial" && <TripDetailTable />}
            </div>
            <div
              className="space-x-4 rtl:space-x-reverse fixed bottom-0 bg-card z-10 p-2 text-center pb-4"
              style={{ width: "95%", maxWidth: "679px" }}
            >
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  color="destructive"
                  onClick={() => {
                    setEdit(false);
                    setItem({} as T);
                  }}
                >
                  انصراف
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  color="success"
                  onClick={() => {
                    updateItem(item.id);
                    setEdit(false);
                  }}
                >
                  ذخیره
                </Button>
              </SheetClose>
            </div>{" "}
          </div>
        </SheetContent>
      </Sheet>
    );
  };
  const InsertSheet = () => {
    return (
      <Sheet>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button
                  variant="soft"
                  style={{ backgroundColor: "green", color: "white" }}
                  className="fixed ltr:right-4 rtl:left-4 bottom-24 z-50 rounded-full h-12 w-12"
                >
                  {" "}
                  <Stacks2 className="h-7 w-7" />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent color="success" side="right">
              ایجاد
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SheetContent
          side={isMobile ? "right" : "bottom"}
          className="max-w-[736px]"
          style={{
            height: isMobile ? "none" : "90%",
            borderRadius: isMobile ? "none" : "6% 6% 0% 0% / 5% 5% 25% 25%",
          }}
          dir="rtl"
        >
          {!isMobile && (
            <div className="text-center bg-gray-500 w-12 h-2 mx-auto rounded-md mb-4"></div>
          )}
          <SheetHeader>
            <SheetTitle className="flex align-middle gap-4">
              <div>ایجاد</div>
              <div>
                {modifiedFiled
                  .sort((a, b) => a.order - b.order)
                  .map(
                    (filetype, index) =>
                      filetype.type === "switch" && (
                        <div className="flex gap-1 items-center">
                          <Label className="text-xs">
                            {filetype.accessorKey}
                          </Label>
                          <Switch
                            checked={!!item[filetype.name as keyof T]}
                            className="h-5 w-11 "
                            thumbClass={cn(
                              "h-6 w-6  data-[state=unchecked]:ml-0 bg-background"
                            )}
                            onCheckedChange={(e) => {
                              setItem((prev) => ({
                                ...prev,
                                [filetype.name]: e,
                              }));
                            }}
                            thumbIcon={
                              item[filetype.name as keyof T] ? (
                                <Check className="text-green-500 stroke-dark w-4 h-4 " />
                              ) : (
                                <X className="text-red-600 stroke-red-600 w-4 h-4" />
                              )
                            }
                          />
                        </div>
                      )
                  )}
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="max-h-[100%]" style={{ overflowY: "auto" }}>
            <div className="pb-5">
              <div className="md:grid md:grid-cols-2 gap-6 mt-6 space-y-6 md:space-y-0 pb-14">
                {modifiedFiled.map(
                  (filetype, index) =>
                    (filetype.type === "text" && (
                      <div className="flex flex-col gap-2">
                        <Label>{filetype.accessorKey}</Label>
                        <Input
                          name={filetype.name as any}
                          value={item[filetype.name] as any}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            setItem((prev) => ({ ...prev, [name]: value }));
                            if (filetype.staticExtraState) {
                              setItem({
                                ...item,
                                [filetype.staticExtraState.stateName]:
                                  filetype.staticExtraState.stateValue,
                              });
                            }
                          }}
                          placeholder={filetype.placeholder}
                        />
                      </div>
                    )) ||
                    (filetype.type === "textarea" && (
                      <div className="flex flex-col gap-2">
                        <Label>{filetype.accessorKey}</Label>
                        <Textarea
                          name={filetype.name}
                          value={
                            item[filetype.name as keyof T]
                              ? String(item[filetype.name as keyof T])
                              : ""
                          }
                          onChange={(e) => {
                            console.log(e.target.value);
                            setItem({
                              ...item,
                              [filetype.name]: e.target.value,
                            });
                          }}
                          placeholder={filetype.placeholder}
                        />
                      </div>
                    )) ||
                    (filetype.type === "time" && (
                      <div className="flex flex-col gap-2">
                        <Label>{filetype.accessorKey}</Label>
                        <DatePicker
                          name={filetype.name}
                          calendar={persian}
                          className="bg-background"
                          style={{
                            borderRadius: "15px",
                            border:
                              "1px solid hsl(var(--default-300) / var(--tw-border-opacity))",
                            width: "-webkit-fill-available",
                            textAlign: "center",
                            height: "2.6em",
                            cursor: "pointer",
                          }}
                          containerClassName="form-control"
                          inputClass="form-control text-dark"
                          required
                          onChange={(value) => {
                            filetype.name2
                              ? setItem((pre) => {
                                  const temp = {
                                    ...pre,
                                    [filetype.name]: value!
                                      .toDate()
                                      .toISOString(),
                                    [filetype.name2!]: value!
                                      .toDate()
                                      .toISOString(),
                                  };
                                  return temp;
                                })
                              : setItem((pre) => {
                                  const temp = {
                                    ...pre,
                                    [filetype.name]: value!
                                      .toDate()
                                      .toISOString(),
                                  };
                                  return temp;
                                });
                          }}
                          placeholder={filetype.placeholder || "1403/01/01"}
                          locale={persian_fa}
                        />
                      </div>
                    )) ||
                    (filetype.type === "timeRange" && (
                      <div className="flex flex-col gap-2">
                        <Label>{filetype.accessorKey}</Label>
                        <DatePicker
                          name={filetype.name}
                          range
                          rangeHover
                          className="bg-background"
                          style={{
                            borderRadius: "15px",
                            width: "-webkit-fill-available",
                            textAlign: "center",
                            height: "2.6em",
                            cursor: "pointer",
                            border: "1px solid rgb(107 114 128 / 37%)",
                          }}
                          calendar={persian}
                          containerClassName="form-control"
                          inputClass="form-control text-dark"
                          required
                          onChange={(values) => {
                            if (values.length === 2) {
                              const [startValue, endValue] = values.map(
                                (date) => date.toDate().toISOString()
                              );

                              setItem((prev) => ({
                                ...prev,
                                [filetype.startTimeName]: startValue,
                                [filetype.endTimeName]: endValue,
                              }));
                            }
                          }}
                          placeholder={filetype.placeholder || "1403/01/01"}
                          locale={persian_fa}
                        />
                      </div>
                    )) ||
                    (filetype.type === "number" && (
                      <div className="flex flex-col gap-2">
                        <Label>{filetype.accessorKey}</Label>
                        <Input
                          type="number"
                          name={filetype.name as any}
                          value={item[filetype.name] as any}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            setItem((prev) => ({ ...prev, [name]: value }));
                            if (filetype.staticExtraState) {
                              setItem({
                                ...item,
                                [filetype.staticExtraState.stateName]:
                                  filetype.staticExtraState.stateValue,
                              });
                            }
                          }}
                          placeholder={filetype.placeholder}
                        />
                      </div>
                    )) ||
                    (filetype.type === "combobox" && (
                      <div className="flex flex-col gap-2">
                        <Label>{filetype.accessorKey}</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              style={{
                                border:
                                  "1px solid hsl(var(--default-300) / var(--tw-border-opacity))",
                                color:
                                  "hsl(var(--default-500) / var(--tw-border-opacity))",
                              }}
                              aria-expanded={open}
                              className="justify-between bg-background hover:bg-background"
                            >
                              <span
                                className="text-sm"
                                style={{ fontWeight: "normal" }}
                              >
                                {value
                                  ? value
                                  : filetype.placeholder
                                  ? filetype.placeholder
                                  : "انتخاب کنید..."}{" "}
                              </span>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            dir="rtl"
                            className="p-0"
                            style={{
                              zIndex: 9099999,
                            }}
                          >
                            <Command>
                              <CommandInput
                                placeholder={`جتسجو ${filetype.accessorKey}`}
                              />
                              <CommandEmpty>{` ${filetype.accessorKey} یافت نشد`}</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea
                                  style={{
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                  }}
                                >
                                  <PickerCombo
                                    picker={filetype.picker}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    name={filetype.name}
                                    handleSelectChange={handleSelectChange}
                                  />
                                </ScrollArea>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )) ||
                    (filetype.type === "customSelect" && (
                      <div className="flex flex-col gap-2">
                        <Select
                          value={item[filetype.name] as any}
                          name={filetype.name as string}
                          onValueChange={(e) => {
                            handleSelectChange(e, filetype.name as string);
                          }}
                        >
                          <Label>{filetype.accessorKey}</Label>
                          <SelectTrigger dir="rtl">
                            <SelectValue
                              placeholder={
                                filetype.placeholder || "انتخاب کنید..."
                              }
                            />
                          </SelectTrigger>
                          <SelectContent
                            style={{
                              zIndex: 9099999,
                            }}
                          >
                            {filetype?.selectItem!.map(
                              (select, indexSelect) => (
                                <SelectItem
                                  key={index + 1}
                                  value={select.value}
                                  dir="rtl"
                                >
                                  {select.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )) ||
                    (filetype.type === "select" && (
                      <div className="flex flex-col gap-2">
                        <Select
                          value={item[filetype.name] as any}
                          name={filetype.name as string}
                          onValueChange={(e) =>
                            handleSelectChange(e, filetype.name as string)
                          }
                        >
                          <Label>{filetype.accessorKey}</Label>
                          <SelectTrigger dir="rtl">
                            <SelectValue
                              placeholder={
                                filetype.placeholder || "انتخاب کنید..."
                              }
                            />
                          </SelectTrigger>
                          <SelectContent
                            style={{
                              zIndex: 9099999,
                            }}
                          >
                            <ScrollArea
                              style={{
                                maxHeight: "200px",
                                overflowY: "auto",
                              }}
                            >
                              <PickerSelect picker={filetype.picker} />
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                    )) ||
                    (filetype.type === "O&D" && (
                      <div className="flex flex-col gap-2 ">
                        <Label>{filetype.accessorKey}</Label>
                        {/* first */}
                        <div className="flex flex-row gap-2 items-center">
                          <Select
                            value={item[filetype.OriginName as keyof T] as any}
                            name={filetype.OriginName}
                            onValueChange={(e) =>
                              handleSelectChange(e, filetype.OriginName!)
                            }
                          >
                            <SelectTrigger dir="rtl">
                              <SelectValue
                                placeholder={filetype.OriginAccessorKey}
                              />
                            </SelectTrigger>
                            <SelectContent
                              style={{
                                zIndex: 9099999,
                              }}
                            >
                              <ScrollArea
                                style={{
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                <PickerSelect picker={filetype.picker} />
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                          {/* second */}
                          <Repeat2 size={50} />
                          <Select
                            value={item[filetype.DestName as keyof T] as any}
                            name={filetype.DestName}
                            onValueChange={(e) =>
                              handleSelectChange(e, filetype.DestName!)
                            }
                          >
                            <SelectTrigger dir="rtl">
                              <SelectValue
                                placeholder={filetype.DestAccessorKey}
                              />
                            </SelectTrigger>
                            <SelectContent
                              style={{
                                zIndex: 9099999,
                              }}
                            >
                              <ScrollArea
                                style={{
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                <PickerSelect picker={filetype.picker} />
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )) ||
                    (filetype.type === "map" && (
                      <div className="flex flex-col gap-2">
                        <Label>{filetype.accessorKey}</Label>
                        <InputMap
                          setItem={setItem}
                          latName={filetype.latName}
                          longName={filetype.longName}
                          initialPosition={{
                            latitude: item[filetype.latName as keyof T],
                            longitude: item[filetype.longName as keyof T],
                          }}
                        />
                      </div>
                    )) ||
                    (filetype.type === "plq" && (
                      <div className="flex flex-col gap-2">
                        <Label>{filetype.accessorKey}</Label>
                        <div className=" flex items-center justify-center ">
                          <div
                            className={`flex items-center justify-between w-72 h-16 border-2 border-black rounded-sm p-2 relative ${
                              item[filetype.Plq2 as keyof AnyThing] === "ع" ||
                              item[filetype.Plq2 as keyof AnyThing] === "ت"
                                ? "bg-yellow-400"
                                : item[filetype.Plq2 as keyof AnyThing] ===
                                  "الف"
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
                                name={filetype.serialPlq}
                                value={item[filetype.serialPlq as keyof T]}
                                onChange={handleInputChange}
                                placeholder="_ _"
                                className="text-lg persian-text text-md font-bold text-center border-none bg-transparent outline-none w-6"
                              />{" "}
                              <div className="border-r-2 border-black h-full absolute right-16 top-0"></div>
                            </div>
                            <div className="flex flex-grow items-center justify-center ml-12 mr-8">
                              <input
                                type="tel"
                                maxLength={3}
                                name={filetype.Plq1}
                                value={item[filetype.Plq1 as keyof T] as any}
                                onChange={handleInputChange}
                                placeholder="_ _ _"
                                className="text-lg persian-text text-md font-bold text-center border-none bg-transparent outline-none w-14"
                              />{" "}
                              <div className="persian-text text-xl font-bold border-none bg-transparent outline-none">
                                <select
                                  className="persian-text text-xl font-bold border-none bg-transparent outline-none"
                                  name={filetype.Plq2}
                                  value={item[filetype.Plq2 as keyof AnyThing]}
                                  onChange={(e) =>
                                    handleSelectChange(
                                      e.target.value,
                                      filetype.Plq2!
                                    )
                                  }
                                >
                                  {" "}
                                  <option value="">_</option>
                                  <option value="الف">الف</option>
                                  <option value="ب">ب</option>
                                  <option value="پ">پ</option>
                                  <option value="ت">ت</option>
                                  <option value="ث">ث</option>
                                  <option value="ج">ج</option>
                                  <option value="ح">ح</option>
                                  <option value="د">د</option>
                                  <option value="ذ">ذ</option>
                                  <option value="ر">ر</option>
                                  <option value="ز">ز</option>
                                  <option value="س">س</option>
                                  <option value="ش">ش</option>
                                  <option value="ص">ص</option>
                                  <option value="ض">ض</option>
                                  <option value="ط">ط</option>
                                  <option value="ظ">ظ</option>
                                  <option value="غ">غ</option>
                                  <option value="ع">ع</option>
                                  <option value="ف">ف</option>
                                  <option value="ق">ق</option>
                                  <option value="ک">ک</option>
                                  <option value="گ">گ</option>
                                  <option value="ل">ل</option>
                                  <option value="م">م</option>
                                  <option value="ن">ن</option>
                                  <option value="و">و</option>
                                  <option value="ه">ه</option>
                                </select>{" "}
                              </div>{" "}
                              <input
                                type="tel"
                                name={filetype.Plq3}
                                value={item[filetype.Plq3 as keyof T] as any}
                                onChange={handleInputChange}
                                maxLength={2}
                                className="text-lg persian-text text-md font-bold text-center border-none bg-transparent outline-none w-7"
                                placeholder="_ _"
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
            <div
              className="space-x-4 rtl:space-x-reverse fixed bottom-0 bg-card z-10 p-2 text-center pb-4"
              style={{ width: "95%", maxWidth: "679px" }}
            >
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  color="destructive"
                  onClick={() => setEdit(false)}
                >
                  انصراف
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  color="success"
                  onClick={() => {
                    insertItem();
                  }}
                >
                  ذخیره
                </Button>
              </SheetClose>
            </div>{" "}
          </div>
        </SheetContent>
      </Sheet>
    );
  };
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
      {postAndPut && InsertSheet()}
      {postAndPut && EditSheet()}
    </div>
  );
}

export default DimkpiTable;
