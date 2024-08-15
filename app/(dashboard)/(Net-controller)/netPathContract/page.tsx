import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { NetPathContract } from "@/types/types";
const NetPathContractTable = () => {
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
      url: "v1/pts/company?search=(deleted:0 AND active:true)&size=100&page=0&sort=created,desc",
      picker: "company",
    },
    {
      url: "v1/pts/freighter?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "freighter",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:26)&size=1000&page=0&sort=created,desc",
      picker: "base26",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:27)&size=1000&page=0&sort=created,desc",
      picker: "base27",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/contract";
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    {
      title: "مدیریت شبکه سیر",
      icon: <Layers className="h-4 w-4" />,
      path: "",
    },
    {
      title: "قرارداد های شبکه سیر",
      icon: <Box className="h-4 w-4" />,
      path: "",
    },
  ];
  const columnOptions = [
    {
      accessorKey: "نام",
      name: "fullTitle",
      color: "",
    },
    {
      accessorKey: "نوع قرارداد",
      name: "typeTitle",
      color: "",
    },
    {
      accessorKey: "تاریخ شروع",
      name: "startDate",
      color: "info",
    },
    {
      accessorKey: "تاریخ پایان",
      name: "endDate",
      color: "info",
    },
    {
      accessorKey: "طرف اول",
      name: "company1Name",
      color: "",
    },
    {
      accessorKey: "طرف دوم",
      name: "company2Name",
      color: "",
    },
    {
      accessorKey: "وضعیت",
      name: "statusTitle",
      color: "",
    },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "نام قرارداد",
      name: "name",
      type: "text",
      order: 1,
    },
    {
      accessorKey: "مسیر قرارداد همکاری",
      name: "path",
      type: "text",
      order: 11,
    },
    {
      accessorKey: "شماره قرارداد",
      name: "contractNo",
      type: "text",
      order: 2,
    },
    {
      accessorKey: "شرکت والد",
      name: "headCompanyId",
      type: "select",
      picker: "company",
      order: 7,
    },
    {
      accessorKey: "شهر شرکت والد",
      name: "headCompanyCityId",
      type: "select",
      picker: "city",
      order: 8,
    },
    {
      accessorKey: "وضعیت",
      name: "statusId",
      type: "select",
      picker: "base27",
      order: 12,
    },
    {
      accessorKey: "نوع قرارداد",
      name: "typeId",
      type: "select",
      picker: "base26",
      order: 4,
    },
    {
      accessorKey: "فعال",
      name: "active",
      type: "switch",
    },
    {
      accessorKey: "شرکت طرف اول",
      name: "company1Id",
      type: "select",
      picker: "company",
      order: 5,
    },
    {
      accessorKey: "شهر شرکت طرف اول",
      name: "company1CityId",
      type: "select",
      picker: "city",
      order: 13,
    },
    {
      accessorKey: "شهر شرکت طرف دوم",
      name: "company2CityId",
      type: "select",
      picker: "city",
      order: 14,
    },
    {
      accessorKey: "شرکت طرف دوم",
      name: "company2Id",
      type: "select",
      picker: "company",
      order: 6,
    },
    {
      accessorKey: "تاریخ قرارداد",
      name: "contractDate",
      type: "time",
      order: 3,
    },
    {
      accessorKey: "تاریخ شروع",
      name: "startDate",
      type: "time",
      order: 9,
    },
    {
      accessorKey: "تاریخ پایان",
      name: "contractDate",
      type: "time",
      order: 10,
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<NetPathContract>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default NetPathContractTable;
