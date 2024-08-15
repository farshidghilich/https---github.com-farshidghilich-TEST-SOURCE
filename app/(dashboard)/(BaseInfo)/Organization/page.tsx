import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Organization } from "@/types/types";
const page = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/location?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "location",
    },
    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/meyar/organization";

  const columnOptions = [
    {
      accessorKey: "نام سازمان",
      name: "parentName",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: " سازمان والد",
      name: "fullTitle",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "تلفن",
      name: "phone",
      color: "",
    },
    {
      accessorKey: "آدرس",
      name: "address",
      color: "",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "سازمان ها", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "نام سازمان",
      name: "name",
      type: "text",
    },
    {
      accessorKey: "تلفن",
      name: "phone",
      type: "text",
    },
    {
      accessorKey: "آدرس",
      name: "address",
      type: "text",
      order: 1,
    },
    {
      accessorKey: "محل",
      name: "locationId",
      type: "select",
      picker: "location",
    },
    {
      accessorKey: "سازمان والد",
      name: "parentId",
      type: "select",
      picker: "organization",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<Organization>
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
