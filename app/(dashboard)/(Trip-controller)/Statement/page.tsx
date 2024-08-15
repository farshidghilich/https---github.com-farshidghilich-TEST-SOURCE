import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Trip } from "@/types/types";
const TripTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/trip/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "trip",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:30)&size=1000&page=0&sort=created,desc",
      picker: "base30",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:32)&size=1000&page=0&sort=created,desc",
      picker: "base32",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/statement";

  const columnOptions = [
    {
      accessorKey: "کد پیگیری",
      name: "referenceNo",
      color: "info",
    },
    {
      accessorKey: "سریال",
      name: "statementSerial",
      color: "info",
    },
    {
      accessorKey: "شماره",
      name: "statementNum",
      color: "success",
    },
    {
      accessorKey: "شماره سفر",
      name: "tripTitle",
      color: "success",
    },
    {
      accessorKey: "تعداد مسافر",
      name: "passengerCount",
      color: "warning",
    },
    {
      accessorKey: "ناوگان",
      name: "freighterTitle",
      color: "",
    },
    {
      accessorKey: "راننده اول",
      name: "driverName1",
      color: "",
    },
    {
      accessorKey: "وضعیت",
      name: "tripStatusTitle",
      color: "",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت سفر", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "صورت وضعیت", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "سفر",
      name: "tripId",
      type: "select",
      picker:"trip",
      order:1
    },
    {
      accessorKey: "تعداد مسافر",
      name: "passengerCount",
      type: "number",
      order:3
    },
    {
      accessorKey: "هزینه سفر",
      name: "costTrip",
      type: "number",
      order:4
    },
    {
      accessorKey: "کد ملی راننده1",
      name: "driverNationalId1",
      type: "text",
      order:8
    },
    {
      accessorKey: "کد ملی راننده2",
      name: "driverNationalId2",
      type: "text",
      order:9
    },
    {
      accessorKey: "کد ملی راننده3",
      name: "driverNationalId3",
      type: "text",
      order:10
    },
    {
      accessorKey: "مبلغ بیمه سرنشین",
      name: "insurancePassTrip",
      type: "number",
      order:5
    },
    {
      accessorKey: "مبلغ بیمه بدنه",
      name: "insuranceBusTrip",
      type: "number",
      order:6
    },
    {
      accessorKey: "وضعیت سفر",
      name: "tripStatusId",
      type: "select",
      picker:'base32',
      order:11
    },
    {
      accessorKey: "نوع ارسال",
      name: "sendTypeId",
      type: "select",
      picker:'base30',
      order:13
    },
    {
      accessorKey: " نوع ارسال سیستم",
      name: "systemSendTypeId",
      type: "number",
      order:14
    },
    {
      accessorKey: "سریال فارسی",
      name: "persianSeri",
      type: "text",
      order:16
    },
    {
      accessorKey: "شماره صورت وضعیت",
      name: "statementNum",
      type: "number",
      order:17
    },
    {
      accessorKey: "شماره کارت هوشمند ناوگان",
      name: "freighterCardNo",
      type: "text",
      order:7
    },
    {
      accessorKey: "ُسریال صورت وضعیت",
      name: "statementSerial",
      type: "text",
      order:15
    },
    {
      accessorKey: "زمان صدور",
      name: "issueDate",
      placeholder: "انتخاب تاریخ",
      type: "time",
      order:2
    },
    {
      accessorKey: "نوع صورت وضعیت",
      name: "tripType",
      type: "costumeSelect",
      picker: "",
      selectItem: [
        { name: "اتوبوس", value: "BUS" },
        { name: "مینی بوس", value: "MINIBUS" },
        { name: "دربست", value: "CLOSE" },
        { name: "بین الملل", value: "INTERNATIONAL" },
      ],
      order:12
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
        NestedTable='tripDetial'
      />
    </Suspense>
  );
};

export default TripTable;
