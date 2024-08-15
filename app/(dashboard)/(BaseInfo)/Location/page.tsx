import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { location } from "@/types/types";

const LocationTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "",
      picker: "",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/location";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: "نام",
      name: "name",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "منطقه",
      name: "zone",
      color: "",
    },
    {
      accessorKey: "استان",
      name: "province",
      color: "",
    },
    {
      accessorKey: "شهر",
      name: "city",
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
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "موقعیت", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "نام",
      name: "name",
      type: "text",
      //name can be 'text' , 'select' or 'time'
      picker: "",
    },
    {
      accessorKey: "منطقه",
      name: "zone",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "استان",
      name: "province",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "شهر",
      name: "city",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "توضیحات",
      name: "description",
      type: "text",
      picker: "",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<location>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
        postAndPut={false}
      />
    </Suspense>
  );
};

export default LocationTable;
