import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Trip } from "@/types/types";
const TripTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/city/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
    {
      url: "v1/pts/company/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "company",
    },
    {
      url: "v1/pts/path/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "path",
    },
    {
      url: "v1/pts/terminal/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "terminal",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:29)&size=1000&page=0&sort=created,desc",
      picker: "base29",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:30)&size=1000&page=0&sort=created,desc",
      picker: "base30",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:32)&size=1000&page=0&sort=created,desc",
      picker: "base32",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:24)&size=1000&page=0&sort=created,desc",
      picker: "base24",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/trip";

  const columnOptions = [
    {
      accessorKey: "سریال سفر",
      name: "tripSerial",
      color: "",
    },
    {
      accessorKey: "کدرهگیری",
      name: "referenceNo",
      color: "warning",
    },
    {
      accessorKey: "شماره سفر",
      name: "tripNum",
      color: "info",
    },
    {
      accessorKey: "تاریخ سفر",
      name: "tripDate",
      color: "dark",
    },
    {
      accessorKey: "مبدا",
      name: "srcCityName",
      color: "success",
    },
    {
      accessorKey: "مقصد",
      name: "dstCityName",
      color: "success",
    },
    {
      accessorKey: "نوع وسیله",
      name: "freighterTypeTitle",
      color: "",
    },
    {
      accessorKey: "شرکت",
      name: "companyName",
      color: "",
    },
    {
      accessorKey: "وضعیت سفر",
      name: "tripStatusTitle",
      color: "",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت سفر", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "تعریف سفر", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "شماره سفر",
      name: "tripNum",
      type: "text",
      order: 1,
    },
    {
      accessorKey: "زمان سفر",
      name: "issueTime",
      name2: "issueDate",
      type: "time",
      order: 2,
    },
    {
      accessorKey: "زمان ثبت",
      name: "tripDate",
      name2: "tripTime",
      type: "time",
      order: 14,
    },
    {
      accessorKey: "مسافت",
      name: "distance",
      type: "number",
      order: 7,
    },
    {
      accessorKey: "تعداد صندلی",
      name: "chairCount",
      type: "number",
      order: 12,
    },
    {
      accessorKey: "وضعیت سفر",
      name: "tripStatusId",
      type: "select",
      picker: "base32",
      order: 13,
    },
    {
      accessorKey: "نوع ارسال",
      name: "sendTypeId",
      type: "select",
      picker: "base30",
      order: 15,
    },
    {
      accessorKey: " نوع ارسال سیستم",
      name: "systemSendType",
      type: "number",
      order: 16,
    },
    {
      accessorKey: "نوع طرح",
      name: "tripKindId",
      type: "select",
      picker: "base29",
      order: 10,
    },
    {
      accessorKey: "سریال سفر",
      name: "tripSerial",
      type: "text",
      order: 3,
    },
    {
      accessorKey: "سریال فارسی",
      name: "persianSeri",
      type: "text",
      order: 4,
    },
    {
      accessorKey: "مبدا و مقصد",
      name: "",
      type: "O&D",
      picker: "city",
      OriginAccessorKey: "مبدا",
      OriginName: "srcCityId",
      DestAccessorKey: "مقصد",
      DestName: "dstCityId",
      order: 5,
    },
    {
      accessorKey: " ترمینال مبدا و مقصد ",
      name: "",
      type: "O&D",
      picker: "terminal",
      OriginAccessorKey: "ترمینال مبدا",
      OriginName: "srcTerminalId",
      DestAccessorKey: "ترمینال مقصد",
      DestName: "dstTerminalId",
      order: 6,
    },
    {
      accessorKey: "شرکت",
      name: "companyId",
      type: "select",
      picker: "company",
      order: 8,
    },
    {
      accessorKey: "مسیر",
      name: "pathId",
      type: "select",
      picker: "path",
      order: 9,
    },
    {
      accessorKey: "نوع وسیله نقلیه",
      name: "freighterType",
      type: "select",
      picker: "base24",
      order: 11,
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<Trip>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
        NestedTable="tripDetial"
      />
    </Suspense>
  );
};

export default TripTable;
