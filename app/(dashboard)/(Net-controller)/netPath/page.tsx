import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { NetPathType, Organization, PathType, Station } from "@/types/types";
const page = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/path?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "path",
    },
    {
      url: "v1/pts/contract?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "contract",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:24)&size=1000&page=0&sort=created,desc",
      picker: "freighterType",
    },

    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/netPath";

  const columnOptions = [
    {
      accessorKey: "مسیر",
      name: "pathName",
      color: "",
    },
    {
      accessorKey: "نوع ناوگان",
      name: "freighterTypeTitle",
      color: "info",
    },
    {
      accessorKey: "تعداد ناوگان",
      name: "freighterNum",
      color: "",
    },
    {
      accessorKey: "قرارداد",
      name: "contractName",
      color: "",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت شبکه سیر", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "  سیر مسیر", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "ردیف",
      name: "articleId",
      type: "number",
      order: 1,
    },

    {
      accessorKey: "قرارداد ",
      name: "contractId",
      type: "select",
      picker: "contract",
      order: 2,
    },
    {
      accessorKey: "تعداد ناوگان",
      name: "freighterNum",
      type: "number",
      order: 1,
    },
    {
      accessorKey: "نوع ناوگان ",
      name: "freighterTypeId",
      type: "select",
      picker: "freighterType",
      order: 2,
    },

    {
      accessorKey: "مسیر ",
      name: "pathId",
      type: "select",
      picker: "path",
      order: 52,
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<NetPathType>
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
