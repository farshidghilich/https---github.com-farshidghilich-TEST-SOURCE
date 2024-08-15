import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Endpoint } from "@/types/types";

const EndpointTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/uac/endpoint";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: "نام ",
      name: "name",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "عنوان",
      name: "displayName",
      color: "info",
    },
    {
      accessorKey: "توضیحات",
      name: "description",
      color: "",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت کاربران", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "عملیات", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
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
      accessorKey: "نام کلاس",
      name: "endpointClass",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "آدرس",
      name: "endpointURI",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "نوع متد",
      name: "method",
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
      accessorKey: "وضعیت",
      name: "active",
      type: "switch",
      picker: "",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<Endpoint>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default EndpointTable;
