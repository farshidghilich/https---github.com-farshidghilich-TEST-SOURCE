import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Driver, UserGroupRoleMenu } from "@/types/types";

const UserGroupRoleMenuTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/city/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
    {
      url: "v1/pts/freighter/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "freighter",
    },
    {
      url: "v1/pts/province/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "province",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/driver";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: "نام راننده ",
      name: "nationalCode",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "نام راننده ",
      name: "fullTitle",
      color: "",
    },
    {
      accessorKey: "شماره کارت",
      name: "cardNo",
      color: "",
    },
    {
      accessorKey: "تاریخ انقضا کارت",
      name: "cardExpireDate",
      color: "info",
    },
    {
      accessorKey: "شماره گواهینامه",
      name: "certificateDriverNo",
      color: "",
    },
    {
      accessorKey: "تاریخ انقضا گواهینامه",
      name: "certificateExpirationDate",
      color: "info",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "راننده", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "نام   ",
      name: "name",
      type: "text",
      order:7
    },
    {
      accessorKey: "نام خانوادگی   ",
      name: "family",
      type: "text",
      order:8
    },
    {
      accessorKey: "کد ملی",
      name: "nationalCode",
      type: "text",
      order:5
    },
    {
      accessorKey: " نام پدر",
      name: "fatherName",
      type: "text",
      order:9
    },
    {
      accessorKey: "شهر محل تولد",
      name: "birthCityId",
      type: "select",
      picker: "city",
      order:21
    },
    {
      accessorKey: "شهر محل سکونت",
      name: "residenceCity",
      type: "select",
      picker: "city",
      order:22
    },
    {
      accessorKey: "محل دریافت",
      name: "receiptPlace",
      type: "select",
      picker: "province",
      order:24
    },
    {
      accessorKey: "تاریخ تولد",
      name: "birthDate",
      type: "time",
      order:10
    },
    {
      accessorKey: "تاریخ اعتبار کارت هوشمند",
      name: "cardExpireDate",
      type: "time",
      order:4
    },
    {
      accessorKey: "تاریخ صدور گواهینامه",
      name: "certificateIssueDate",
      type: "time",
      order:3
    },
    {
      accessorKey: "تاریخ اعتبار گواهینامه",
      name: "certificateExpirationDate",
      type: "time",
      order:16
    },
    {
      accessorKey: "تاریخ اعتبار کارت سلامت",
      name: "healthCardValidityDate",
      type: "time",
      order:18
    },
    {
      accessorKey: "شماره کارت سلامت",
      name: "healthCardId",
      type: "text",
      order:17
    },
    {
      accessorKey: "شماره شناسنامه",
      name: "birthCertificateNo",
      type: "text",
      order:11
    },
    {
      accessorKey: "شماره بیمه",
      name: "insuranceNo",
      type: "text",
      order:19
    },
    {
      accessorKey: "بیمه گذار",
      name: "insuranceBranch",
      type: "text",
      order:20
    },
    {
      accessorKey: "شماره گواهینامه",
      name: "certificateDriverNo",
      type: "text",
      order:15
    },
    {
      accessorKey: "سریال شناسنامه",
      name: "birthCertificateSerial",
      type: "text",
      order:12
    },
    {
      accessorKey: "شرح آخرین فعالیت",
      name: "activityDesc",
      type: "text",
      order:28
    },
    {
      accessorKey: "شماره کارت",
      name: "cardNo",
      type: "text",
      order:2
    },
    {
      accessorKey: "شماره پرونده",
      name: "docNumber",
      type: "text",
      order:1
    },
    {
      accessorKey: "شماره گذرنامه",
      name: "passportId",
      type: "text",
      order:13
    },
    {
      accessorKey: "شعبه",
      name: "branch",
      type: "number",
      order:25
    },
    {
      accessorKey: "استان",
      name: "provinceId",
      type: "select",
      picker: "province",
      order:23
    },
    {
      accessorKey: "سطح تحصیلات",
      name: "educationLevelCode",
      type: "number",
      order:14
    },
    {
      accessorKey: "نوع راننده",
      name: "driverType",
      type: "costumeSelect",
      picker: "",
      selectItem: [
        { name: "باری", value: 1 },
        { name: "مسافری", value: 2 },
        { name: "وانت بار", value: 3 },
        { name: "روستایی", value: 4 },
      ],
      order:6,
    },
    {
      accessorKey: "وضعیت فعالیت",
      name: "activityStatus",
      type: "costumeSelect",
      picker: "",
      selectItem: [
        { name: "فعال", value: 1 },
        { name: "غیرفعال", value: 0 },
      ],
      order:27,
    },
    {
      accessorKey: "ناوگان",
      name: "freighterId",
      type: "select",
      picker: "freighter",
      order:26
    },
    {
      accessorKey: "توضیحات",
      name: "description",
      type: "textarea",
      picker: "",
    },
    {
      accessorKey: "فعال",
      name: "active",
      type: "switch",
      picker: "",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<Driver>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default UserGroupRoleMenuTable;
