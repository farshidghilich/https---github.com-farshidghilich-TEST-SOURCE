import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Organization } from "@/types/types";
import { DimMeasureType } from "@/types/DimTypes";
const page = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/meyar/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:6)&size=1000&page=0&sort=created,desc",
      picker: "measureUnit",
    },
    {
      url: "v1/meyar/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/meyar/bnkMeasures";

  const columnOptions = [
    {
      name: "code",
      accessorKey: " کد ",
    },
    {
      name: "titleFa",
      accessorKey: " عنوان ",
    },
    {
      name: "definition",
      accessorKey: " شرح",
    },
    {
      name: "measureUnitTitle",

      accessorKey: "واحد سنجش",
    },
    {
      name: "email",
      accessorKey: "ایمیل",
    },
    {
      name: "calculationPeriod",
      accessorKey: "بازه زمانی محاسبه",
    },
    {
      name: "calculationStartDate",
      accessorKey: "تاریخ شروع  محاسبه",
    },
    {
      name: "calculationLastDate",
      accessorKey: "تاریخ پایان  محاسبه",
    },
    {
      name: "isCumulative",

      accessorKey: "تجمعی",
    },
  ];
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    {
      title: "مدیریت  اقلام اطلاعاتی",
      icon: <Layers className="h-4 w-4" />,
      path: "",
    },
    {
      title: "تعریف قلم اطلاعاتی",
      icon: <Box className="h-4 w-4" />,
      path: "",
    },
  ];
  const Filed = [
    {
      accessorKey: " کد",
      name: "code",
      type: "text",
      required: true,
      validation: {
        min: 0,
        message: "عدد باید بزرگتر از صفر باشد",
      },
    },
    {
      accessorKey: "عنوان فارسی",
      name: "titleFa",
      type: "text",
      required: true,
    },
    {
      accessorKey: "عنوان انگلیسی",
      name: "titleEn",
      type: "text",
      order: 1,
      required: true,
      validation: {
        min: 0,
        message: "عدد باید بزرگتر از صفر باشد",
      },
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<DimMeasureType>
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
