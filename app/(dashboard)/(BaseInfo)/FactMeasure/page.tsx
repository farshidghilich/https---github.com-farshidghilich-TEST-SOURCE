"use client";
import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { Organization } from "@/types/types";
import { FactMeasureType } from "@/types/DimTypes";
import { FiledTypes, PickersUrls } from "@/components/Table/baseTable.types";
const page = () => {
  // load picker for showing the option of select
  const loadPickerOptions: PickersUrls = [
    {
      url: "v1/meyar/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:6)&size=1000&page=0&sort=created,desc",
      picker: "measureUnit",
    },
    {
      url: "v1/meyar/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },

    {
      url: "v1/uac/role?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "role",
    },

    {
      url: "v1/uac/group?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "group",
    },
    {
      url: "v1/uac/user?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "user",
    },
    {
      url: "v1/uac/endpoint?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "endpoint",
    },

    {
      url: "v1/meyar/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:6)&size=1000&page=0&sort=created,desc",
      picker: "measureUnit",
    },
    {
      url: "v1/meyar/bnkMeasures/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "bnkMeasures",
    },
    {
      url: "v1/meyar/dimAssessee/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "dimAssessee",
    },
    {
      url: "v1/meyar/dimTimeType?search=(deleted:0)&size=1000&page=0&sort=created,desc",
      picker: "mrfTimeType",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/meyar/factMeasures";
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    {
      title: "مدیریت  اقلام اطلاعاتی",
      icon: <Layers className="h-4 w-4" />,
      path: " ",
    },
    {
      title: "مقادیر اقلام اطلاعاتی",
      icon: <Box className="h-4 w-4" />,
      path: " ",
    },
  ];
  const columnOptions = [
    {
      name: "timeTypeTitle",
      accessorKey: "نوع دوره زمانی",
    },
    {
      name: "organizationName",
      accessorKey: " واحد سازمانی ",
    },
    {
      name: "measureTitle",
      accessorKey: " قلم اطلاعاتی",
    },
    {
      name: "dimAssesseeName",
      accessorKey: "ارزیابی شونده ",
    },
    {
      name: "value",
      accessorKey: "مقدار",
    },
  ];
  const Filed: FiledTypes<FactMeasureType> = [
    {
      name: "value",
      accessorKey: "تلفن همراه",
      type: "text",
      picker: "measureUnit",
      required: true,
      pattern: /^09[0-9]{9}$/,
      messagePattern: "فرمت شماره تلفن اشتباه است",
      validation: {
        min: 0,

        message: "عدد باید بزرگتر از صفر باشد",
      },
    },
    {
      accessorKey: "  کد ملی",
      name: "measureId",
      type: "select",
      picker: "bnkMeasures",
      required: true,
      pattern: /^[0-9]{10}$/,
      messagePattern: "فرمت  کد ملی اشتباه است",
      validation: {
        min: 0,

        message: "عدد باید بزرگتر از صفر باشد",
      },
    },
    {
      accessorKey: " ارزیابی شونده ",
      name: "dimAssesseeId",
      type: "select",
      required: true,
      validation: {
        min: 0,
        message: "عدد باید بزرگتر از صفر باشد",
      },
      picker: "dimAssessee",
    },
    {
      accessorKey: "دوره زمانی ",
      name: "timeTypeId",
      type: "select",
      required: true,
      validation: {
        min: 0,
        message: "عدد باید بزرگتر از صفر باشد",
      },
      picker: "mrfTimeType",
    },

    {
      accessorKey: "تاریخ اخرین به روز رسانی ",
      name: "lastUpdate",
      staticExtraState: {
        stateName: "calculationType",
        stateValue: "ASSESSEE",
        type: "input",
      },
      type: "number",
      required: true,
      validation: {
        min: 0,
        message: "عدد باید بزرگتر از صفر باشد",
      },
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<FactMeasureType>
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
