import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Organization, PathType, Station } from "@/types/types";
const page = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/company?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "company",
    },
    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
    {
      url: "v1/pts/city?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/path";

  const columnOptions = [
    {
      accessorKey: "شهر مبدا",
      name: "srcCityName",
      color: "destructive",
    },
    {
      accessorKey: "شهر مقصد",
      name: "dstCityName",
      color: "success",
    },
    {
      accessorKey: "فاصله",
      name: "distance",
      color: "",
    },
    {
      accessorKey: "شرکت ",
      name: "companyName",
      color: "info",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: " مسیر  ها", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "نام ایستگاه",
      name: "name",
      type: "text",
      order: 4,
    },
    {
      accessorKey: " شهر مبدا و مقصد ",
      name: "",
      type: "O&D",
      picker: "city",
      OriginAccessorKey: "شهر مبدا",
      OriginName: "srcCityId",
      DestAccessorKey: "شهر مقصد",
      DestName: "dstCityId",
      order: 3,
    },
    {
      accessorKey: "موقعیت مبدا",
      name: "",
      type: "map",
      latName: "srcPositionX",
      longName: "srcPositiony",
      order: 1,
    },
    {
      accessorKey: "موقعیت مقصد",
      name: "",
      type: "map",
      latName: "dstPositionX",
      longName: "dstPositionY",
      order: 2,
    },
    {
      accessorKey: "طول مسیر  ",
      name: "distance",
      type: "number",
      order: 5,
    },
    {
      accessorKey: "شرکت",
      name: "companyId",
      type: "select",
      picker: "company",
      order: 6,
    },
    {
      accessorKey: "کد محور",
      name: "axisCode",
      type: "number",
      order: 7,
    },
    {
      accessorKey: " محور  پیش فرض ",
      name: "isDefault",
      type: "costumeSelect",
      order: 8,
      selectItem: [
        { name: " باشد", value: 1 },
        { name: " نباشد", value: 0 },
      ],
    },
    {
      accessorKey: " سطح والد",
      name: "parentLevel",
      type: "costumeSelect",
      order: 9,
      selectItem: [
        { name: "سطح 1", value: 1 },
        { name: "سطح 2", value: 2 },
        { name: "سطح 3", value: 3 },
      ],
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<PathType>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default page;
