import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Menu } from "@/types/types";

const MenuTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
    {
      url: "v1/uac/endpoint?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "menu",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/uac/menu";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: "نام",
      name: "name",
      color: "",
    },
    {
      accessorKey: "عنوان",
      name: "displayName",
      color: "",
    },
    {
      accessorKey: "آدرس",
      name: "path",
      color: "",
    },
    {
      accessorKey: "ترتیب",
      name: "orderNode",
      color: "",
    },
    {
      accessorKey: "آیکون",
      name: "icon",
      color: "info",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت کاربران", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "منو", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "عنوان ",
      name: "displayName",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "نام",
      name: "name",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "منو والد",
      name: "parentId",
      type: "select",
      picker: "menu",
    },
    {
      accessorKey: "نام سازمان",
      name: "organizationId",
      type: "select",
      picker: "organization",
    },
    {
      accessorKey: "آدرس",
      name: "path",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "آیکون",
      name: "icon",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "ترتیب",
      name: "orderNode",
      type: "number",
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
      <BaseTable<Menu>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default MenuTable;
