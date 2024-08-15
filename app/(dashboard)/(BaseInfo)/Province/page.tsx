import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Province } from "@/types/types";

const ProvinceTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "",
      picker: "",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/province";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: "کد",
      name: "code",
      color: "",
    },
    {
      accessorKey: "نام استان",
      name: "name",
      color: "info",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "استان", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "کد",
      name: "code",
      type: "text",
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
      <BaseTable<Province>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default ProvinceTable;
