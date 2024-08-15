import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Associate, Driver, Freighter, UserGroupRoleMenu } from "@/types/types";

const page = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/city/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
  ];
  const URL = "v1/pts/associate";

  const columnOptions = [
    {
      accessorKey: "  کد ",
      name: "code",
      color: "",
    },
    {
      accessorKey: " نام  ",
      name: "name",
      color: "",
    },
    {
      accessorKey: " شهر  ",
      name: "cityName",
      color: "",
    },
    {
      accessorKey: "  نام مدیرعامل  ",
      name: "managerName",
      color: "",
    },
    {
      accessorKey: "  نام خانوادگی مدیرعامل  ",
      name: "managerFamily",
      color: "",
    },
    {
      accessorKey: " کد ملی مدیر عامل  ",
      name: "managerNationalCode",
      color: "danger",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت اطلاعات", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "انجمن", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: " نام شرکت",
      name: "name",
      type: "text",
    },
    {
      accessorKey: "کد شرکت",
      name: "code",
      type: "text",
    },
    {
      accessorKey: "کد ملی مدیر",
      name: "managerNationalCode",
      type: "text",
    },
    {
      accessorKey: "نام مدیر",
      name: "managerName",
      type: "text",
    },
    {
      accessorKey: "نام خانوادگی مدیر",
      name: "managerFamily",
      type: "text",
    },
    {
      accessorKey: "شماره ثابت",
      name: "mobileNo",
      type: "text",
    },
    {
      accessorKey: "شماره تلفن همراه",
      name: "phone",
      type: "number",
    },
    {
      accessorKey: "شهر",
      name: "cityId",
      type: "select",
      picker: "city",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<Associate>
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
