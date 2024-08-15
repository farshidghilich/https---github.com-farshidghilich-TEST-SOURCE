import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { NetFreighter } from "@/types/types";
const NetFreighterTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/city?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
    {
      url: "v1/pts/province?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "province",
    },
    {
      url: "v1/pts/company?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "company",
    },
    {
      url: "v1/pts/freighter?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "freighter",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:25)&size=1000&page=0&sort=created,desc",
      picker: "base25",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:18)&size=1000&page=0&sort=created,desc",
      picker: "base18",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/netFreighter";
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    {
      title: "مدیریت شبکه سیر",
      icon: <Layers className="h-4 w-4" />,
      path: "",
    },
    {
      title: "ناوگان های شبکه سیر",
      icon: <Box className="h-4 w-4" />,
      path: "",
    },
  ];
  const columnOptions = [
    {
      accessorKey: "شرکت مادر",
      name: "companyName",
      color: "",
    },
    {
      accessorKey: "ناوگان",
      name: "freighterTitle",
      color: "info",
    },
    {
      accessorKey: "تاریخ شروع",
      name: "startDate",
      color: "",
    },
    {
      accessorKey: "تاریخ پایان",
      name: "endDate",
      color: "",
    },
    {
      accessorKey: "شهر",
      name: "cityName",
      color: "",
    },
    {
      accessorKey: "نوع وابستگی",
      name: "ownershipKindTitle",
      color: "success",
    },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "شرکت",
      name: "companyId",
      type: "select",
      picker: "company",
      order:1
    },
    {
      accessorKey: "ناوگان",
      name: "freighterId",
      type: "select",
      picker: "freighter",
      order:2
    },
    {
      accessorKey: "استان",
      name: "provinceId",
      type: "select",
      picker: "province",
      order:7
    },
    {
      accessorKey: "شهر",
      name: "cityId",
      type: "select",
      picker: "city",
      order:8
    },
    {
      accessorKey: "نوع وابستگی",
      name: "ownershipKindId",
      type: "select",
      picker: "base25",
      order:3
    },
    {
      accessorKey: "متقاضی تاسیس",
      name: "requestKindId",
      type: "select",
      picker: "base18",
      order:4
    },
    {
      accessorKey: "فعال",
      name: "active",
      type: "switch",
    },
    {
      accessorKey: "تاریخ شروع",
      name: "startDate",
      type: "time",
      order:5
    },
    {
      accessorKey: "تاریخ پایان",
      name: "endDate",
      type: "time",
      order:6
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<NetFreighter>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default NetFreighterTable;
