import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Driver, Freighter, UserGroupRoleMenu } from "@/types/types";

const page = () => {
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
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:24)&size=1000&page=0&sort=created,desc",
      picker: "base",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/freighter";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: "شماره کارت هوشمند",
      name: "cardNo",
      color: "",
      order: 2,
    },

    {
      accessorKey: "پلاک",
      name: "plq",
      plq: true,
      plqSerial: "plkSerial",
      plq1: "plk1",
      plq2: "plk2",
      plq3: "plk3",
    },
    {
      accessorKey: "نوع وسیله",
      name: "freighterTypeTitle",
      color: "info",
    },
    {
      accessorKey: " تاریخ صدور",
      name: "issueDate",
      color: "info",
    },
    {
      accessorKey: " تاریخ انقضا",
      name: "expireDate",
      color: "danger",
    },
    {
      accessorKey: " شرکت",
      name: "companyName",
      color: "",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: " ناوگان", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "شماره کارت هوشمند   ",
      name: "cardNo",
      type: "number",
      order: 2,
    },
    {
      accessorKey: "نام مالک",
      name: "ownerName",
      type: "text",
      order: 12,
    },
    {
      accessorKey: "کد ملی مالک",
      name: "ownerNationalId",
      type: "text",
      order: 11,
    },
    {
      accessorKey: "شناسه ملی مالک حقوقی",
      name: "legalOwnerNationalId",
      type: "text",
      order: 15,
    },
    {
      accessorKey: "شرح فعالیت",
      name: "activityDesc",
      type: "text",
      order: 24,
    },
    {
      accessorKey: "تعداد محور",
      name: "numberAxis",
      type: "number",
      order: 13,
    },
    {
      accessorKey: "تعداد مسافر",
      name: "passengerCount",
      type: "number",
      order: 9,
    },
    {
      accessorKey: "حجم بار",
      name: "barCapacity",
      type: "number",
      order: 10,
    },
    {
      accessorKey: "شماره پرونده",
      name: "docNumber",
      type: "number",
      order: 1,
    },
    {
      accessorKey: "شماره VIN خودرو",
      name: "carVinId",
      type: "text",
      order: 6,
    },
    {
      accessorKey: "سال ساخت",
      name: "makeYear",
      type: "number",
      order: 5,
    },
    {
      accessorKey: "وضعیت",
      name: "activityStatus",
      selectItem: [
        { name: "فعال", value: "Active" },
        { name: "غیرفعال", value: "Inactive" },
      ],
      type: "costumeSelect",
      order: 23,
    },
    {
      accessorKey: "کد سیستم",
      name: "systemCode",
      type: "number",
      order: 18,
    },
    {
      accessorKey: "کد تیپ",
      name: "typeCode",
      type: "number",
      order: 17,
    },
    {
      accessorKey: " استان محل دریافت",
      name: "provinceId",
      type: "select",
      picker: "province",
      order: 14,
    },
    {
      accessorKey: "نوع ناوگان مسافری",
      name: "freighterPassengerType",
      type: "costumeSelect",
      selectItem: [
        { name: "عمومی", value: "PUBLIC" },
        { name: "روستایی", value: "RUral" },
      ],
      order: 8,
    },
    {
      accessorKey: "کد ناجا",
      name: "najaId",
      type: "number",
      order: 16,
    },
    {
      accessorKey: "شرکت",
      name: "companyId",
      type: "select",
      picker: "company",
      order: 25,
    },
    {
      accessorKey: "نوع ناوگان",
      name: "freighterTypeId",
      type: "select",
      picker: "base",
      order: 7,
    },
    {
      accessorKey: "تاریخ صدور",
      name: "issueDate",
      type: "time",
      order: 19,
    },
    {
      accessorKey: "تاریخ پایان اعتبار",
      name: "expireDate",
      type: "time",
      order: 20,
    },
    {
      accessorKey: "تاریخ معاینه فنی",
      name: "technicalInspectionDate",
      type: "time",
      order: 21,
    },
    {
      accessorKey: "تاریخ اعتبار معاینه فنی",
      name: "technicalInspectionExpireDate",
      type: "time",
      order: 22,
    },
    {
      accessorKey: "فعال",
      name: "active",
      type: "switch",
      picker: "",
    },
    {
      accessorKey: "نوع پلاک",
      name: "plkType",
      type: "costumeSelect",
      selectItem: [
        {
          name: "ایران",
          value: 1,
        },
        {
          name: "قدیمی",
          value: 2,
        },
        {
          name: "لیزری",
          value: 3,
        },
        {
          name: "منطقه آزاد",
          value: 4,
        },
        {
          name: "کشوری",
          value: 5,
        },
      ],
      order: 3,
    },
    {
      accessorKey: "پلاک",
      serialPlq: "plkSerial",
      order: 4,
      Plq1: "plk1",
      Plq2: "plk2",
      Plq3: "plk3",
      type: "plq",
      name: "پلاک",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<Freighter>
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
