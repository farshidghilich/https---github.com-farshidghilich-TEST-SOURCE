import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Terminal } from "@/types/types";
const TerminalTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/city/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:33)&size=1000&page=0&sort=created,desc",
      picker: "base33",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:31)&size=1000&page=0&sort=created,desc",
      picker: "base31",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/terminal";
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "پایانه", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  const columnOptions = [
    {
      accessorKey: "کد ترمینال",
      name: "terminalCode",
      color: "",
    },
    {
      accessorKey: "نام",
      name: "terminalName",
      color: "info",
    },
    {
      accessorKey: "شهر",
      name: "cityName",
      color: "",
    },
    {
      accessorKey: "ترمینال",
      name: "terminalType",
      color: "",
    },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "کد ترمینال",
      name: "terminalCode",
      type: "number",
      order: 1,
    },
    {
      accessorKey: "نام پایانه",
      name: "terminalName",
      type: "text",
      order: 2,
    },
    {
      accessorKey: "آدرس",
      name: "address",
      type: "text",
      order: 4,
    },
    {
      accessorKey: "مالک پایانه",
      name: "terminalOwner",
      type: "text",
      order: 5,
    },
    {
      accessorKey: "نوع پایانه",
      name: "terminalKind",
      type: "select",
      order: 8,
      picker:"base31"
    },

    {
      accessorKey: "تلفن",
      name: "tel",
      type: "number",
      placeholder: "021...",
      order: 6,
    },
    {
      accessorKey: "نحوه تمرکز پایانه",
      name: "terminalType",
      type: "select",
      picker:'base33',
      order: 7,
    },
    {
      accessorKey: "دسترسی",
      name: "hasAccess",
      type: "switch",
      picker: "",
    },
    {
      accessorKey: "نام شهر",
      name: "cityId",
      type: "select",
      picker: "city",
      order: 3,
    },
    {
      accessorKey: "موقعیت پایانه",
      name: "",
      type: "map",
      latName: "terminalPositionX",
      longName: "terminalPositionY",
      order: 9,
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<Terminal>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default TerminalTable;
