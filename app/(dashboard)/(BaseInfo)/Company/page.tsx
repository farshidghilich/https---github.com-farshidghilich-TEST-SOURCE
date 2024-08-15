import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Driver, Freighter, UserGroupRoleMenu } from "@/types/types";

const page = () => {
  const loadPickerOptions = [
    {
      url: "v1/pts/city?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
    {
      url: "v1/pts/associate?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "associate",
    },
    {
      url: "v1/pts/terminal?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "terminal",
    },
    {
      url: "v1/pts/location?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "location",
    },
    {
      url: "v1/pts/company?search=(deleted:0 AND active:true)&size=100000&page=0&sort=created,desc",
      picker: "company",
    },
    {
      url: "v1/pts/province?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "province",
    },
    {
      url: "v1/uac/user?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "user",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:18)&size=1000&page=0&sort=created,desc",
      picker: "base18",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:19)&size=1000&page=0&sort=created,desc",
      picker: "base19",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:20)&size=1000&page=0&sort=created,desc",
      picker: "base20",
    },
    {
      url: "v1/pts/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:21)&size=1000&page=0&sort=created,desc",
      picker: "base21",
    },
  ];
  const URL = "v1/pts/company";
  const columnOptions = [
    {
      accessorKey: " نام شرکت ",
      name: "name",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "  شناسه ملی ",
      name: "nationalCode",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },

    {
      accessorKey: " والد",
      name: "parentName",
      color: "",
    },
    {
      accessorKey: " شهر",
      name: "cityName",
      color: "",
    },
    {
      accessorKey: " انجمن ",
      name: "associateName",
      color: "",
    },

    {
      accessorKey: "ترمینال ",
      name: "terminalName",
      color: "",
    },
    {
      accessorKey: "مدیر عامل",
      name: "ownerName",
      color: "",
    },
  ];
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "شرکت", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  const Filed = [
    {
      accessorKey: " نام شرکت",
      name: "name",
      type: "text",
      order: 2,
    },
    {
      accessorKey: "آدرس",
      name: "address",
      type: "text",
      order: 22,
    },
    {
      accessorKey: "نام مدیرعامل",
      name: "firstName",
      type: "text",
      order: 17,
    },
    {
      accessorKey: "نام خانوادگی مدیرعامل",
      name: "lastName",
      type: "text",
      order: 18,
    },
    {
      accessorKey: "کد ملی مدیرعامل",
      name: "nationalId",
      type: "text",
      order: 15,
    },
    {
      accessorKey: "موبایل مدیرعامل",
      name: "mobileNo",
      type: "text",
      order: 19,
    },
    {
      accessorKey: "تلفن مدیرعامل",
      name: "phone",
      type: "text",
      order: 20,
    },
    {
      accessorKey: "شناسه ملی",
      name: "nationalCode",
      type: "text",
      order: 3,
    },
    {
      accessorKey: "شناسه شحباز شرکت",
      name: "companySourceId",
      type: "text",
      order: 27,
    },
    {
      accessorKey: "کد شرکت",
      name: "code",
      type: "number",
      order: 1,
    },
    {
      accessorKey: "محدوده فعالیت",
      name: "activityDomain",
      type: "costumeSelect",
      selectItem: [
        { name: "داخلی", value: "INTERNAL" },
        { name: "بین المللی", value: "INTERNATIONAL" },
      ],
      order: 7,
    },
    {
      accessorKey: "وضعیت فعالیت",
      name: "activityStatus",
      type: "costumeSelect",
      picker: "",
      selectItem: [
        { name: "فعال", value: "Active" },
        { name: "غیر فعال", value: "Inactive" },
      ],
      order: 28,
    },
    {
      accessorKey: "حوزه فعالیت",
      name: "locationActivityId",
      type: "select",
      picker: "base21",
      order: 8,
    },
    {
      accessorKey: "استان",
      name: "provinceId",
      type: "select",
      picker: "province",
    },
    {
      accessorKey: "نوع مالکیت",
      name: "ownerTypeId",
      type: "select",
      picker: "base19",
      order: 16,
    },
    {
      accessorKey: "متقاضی تاسیس",
      name: "kindOrgId",
      type: "select",
      picker: "base18",
      order: 10,
    },
    {
      accessorKey: "نوع پایانه",
      name: "terminalKindId",
      type: "select",
      picker: "base20",
      order: 23,
    },
    {
      accessorKey: "رتبه شرکت",
      name: "companyOrder",
      type: "number",
      order: 13,
    },
    {
      accessorKey: "تعداد مجاز آنلاین",
      name: "commissionOnlineNo",
      type: "number",
      order: 14,
    },
    {
      accessorKey: "سطح شرکت",
      name: "level",
      type: "number",
      order: 11,
    },
    {
      accessorKey: "هویت شرکت",
      name: "identityId",
      type: "number",
      order: 12,
    },
    {
      accessorKey: "نوع فعالیت",
      name: "activityType",
      type: "costumeSelect",
      selectItem: [
        { name: "باری", value: "BURDEN" },
        { name: "مسافری", value: "PASSENGER" },
      ],
      order: 9,
    },
    {
      accessorKey: "تاریخ اعتبار پروانه",
      name: "expireDate",
      type: "time",
      order: 6,
    },
    {
      accessorKey: "تاریخ شروع پروانه",
      name: "licenseDate",
      type: "time",
      order: 5,
    },
    {
      accessorKey: "تاریخ ثبت",
      name: "registerDate",
      type: "time",
      order: 4,
    },
    {
      accessorKey: "انجمن",
      name: "associateId",
      type: "select",
      picker: "associate",
      order: 25,
    },
    {
      accessorKey: "شهر",
      name: "cityId",
      type: "select",
      picker: "city",
      order: 21,
    },
    {
      accessorKey: "شرکت والد",
      name: "parentId",
      type: "select",
      picker: "company",
      order: 26,
    },
    {
      accessorKey: "پایانه",
      name: "terminalId",
      type: "select",
      picker: "terminal",
      order: 24,
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
