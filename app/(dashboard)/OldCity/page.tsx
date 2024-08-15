import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { OldCity } from "@/types/types";
const OldCityTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "",
      picker: "",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/cityOld";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: "نام قدیمی شهر",
      name: "fullTitle",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "نام",
      name: "name",
      color: "",
    },
    {
      accessorKey: "نام سازمان",
      name: "organizationName",
      color: "info",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "شهر قدیم", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "کد",
      name: "code",
      type: "text",
      //name can be 'text' , 'select' or 'time'
      picker: "",
    },
    {
      accessorKey: "نام",
      name: "name",
      type: "text",
      picker: "",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<OldCity>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default OldCityTable;
