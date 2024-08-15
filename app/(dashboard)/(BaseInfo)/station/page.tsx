import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Organization, Station } from "@/types/types";
const page = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/location?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "location",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:28)&size=1000&page=0&sort=created,desc",
      picker: "pathType",
    },
    {
      url: "v1/pts/path?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "path",
    },
    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/station";

  const columnOptions = [
    {
      accessorKey: "نام ایستگاه",
      name: "name",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "نوع ایستگاه",
      name: "type",
      color: "",
    },
    {
      accessorKey: " مسیر ",
      name: "pathId",
      color: "success",
    },
    {
      accessorKey: " فاصله تا مبدا ",
      name: "distanceOfSrc",
      color: "warning",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: " ایستگاه ها", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "نام ایستگاه",
      name: "name",
      type: "text",
      order: 1,
    },
    {
      accessorKey: "نوع مسیر",
      name: "type",
      type: "select",
      picker: "pathType",
      order: 2,
    },
    {
      accessorKey: "موقعیت مکانی",
      name: "",
      type: "map",
      latName: "posPositionX",
      longName: "posPositionY",
      order: 21,
    },
    {
      accessorKey: "فاصله تا مبدا",
      name: "distanceOfSrc",
      type: "number",
      order: 3,
    },
    {
      accessorKey: "مسیر",
      name: "pathId",
      type: "select",
      picker: "path",
      order: 4,
    },
    {
      accessorKey: "سازمان والد",
      name: "parentId",
      type: "select",
      picker: "organization",
      order: 20,
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<Station>
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
