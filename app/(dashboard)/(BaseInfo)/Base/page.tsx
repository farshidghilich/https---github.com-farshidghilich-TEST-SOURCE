import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { DimBase, Driver, Freighter, UserGroupRoleMenu } from "@/types/types";

const page = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/city?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
    {
      url: "v1/pts/freighter?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "freighter",
    },
    {
      url: "v1/pts/dimBase?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "parentBase",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/dimBase";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: " کد نوع  ",
      name: "typeCode",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "  نوع ",
      name: "typeTitle",
      color: "",
    },
    {
      accessorKey: "  کد ",
      name: "code",
      color: "",
    },
    {
      accessorKey: "  نام ",
      name: "title",
      color: "",
    },
    {
      accessorKey: "  نام والد ",
      name: "parentTitle",
      color: "",
    },
    {
      accessorKey: "  سطح  ",
      name: "level",
      color: "",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: " مقادیر پایه  ", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  const Filed = [
    {
      accessorKey: "عنوان ",
      name: "title",
      type: "text",
    },
    {
      accessorKey: "کد ",
      name: "code",
      type: "text",
    },
    {
      accessorKey: "کد نوع ",
      name: "typeCode",
      type: "text",
    },
    {
      accessorKey: "عنوان نوع ",
      name: "typeTitle",
      type: "text",
    },
    {
      accessorKey: " سطح ",
      name: "level",
      type: "number",
    },
    {
      accessorKey: " والد ",
      name: "parentId",
      type: "select",
      picker: "parentBase",
    },
    {
      accessorKey: " اخرین سطح ",
      name: "isLeaf",
      type: "switch",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<DimBase>
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
