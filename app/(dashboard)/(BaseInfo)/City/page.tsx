import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { City } from "@/types/types";

const CityTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/cityOld?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "cityOld",
    },
    {
      url: "v1/pts/city?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
    {
      url: "v1/pts/province?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "province",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/city";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: "کد",
      name: "code",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "نام",
      name: "name",
      color: "",
    },
    {
      accessorKey: "استان",
      name: "provinceName",
    },
    {
      accessorKey: "والد",
      name: "parentName",
      color:"info"
    },
    {
      accessorKey: "سطح",
      name: "level",
      color: "",
    },
    {
      accessorKey: "شهر قدیم",
      name: "cityOldName",
      color: "info",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "شهر", icon: <Box className="h-4 w-4" />, path: "" },
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
    {
      accessorKey: "مرحله",
      name: "level",
      type: "text",
      picker: "",
    },
    {
      accessorKey: "شهرقدیم",
      name: "cityOldId",
      type: "select",
      picker: "cityOld",
    },
    {
      accessorKey: "نام سازمان",
      name: "parentId",
      type: "select",
      picker: "organization",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<City>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default CityTable;
