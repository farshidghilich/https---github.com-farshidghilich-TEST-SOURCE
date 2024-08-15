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
      url: "v1/uac/group?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "group",
    },
    {
      url: "v1/uac/role?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "role",
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
      url: "v1/uac/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
    {
      url: "/v1/meyar/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:1)&size=1000&page=0&sort=created,desc",
      picker: "kpiType",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/meyar/bnkKPI";

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
  const Filed: FiledTypes<FactMeasureType> = [
    {
      accessorKey: " مقدار",
      name: "value",
      type: "number",
    },
    {
      accessorKey: " قلم اطلاعاتی",
      name: "measureId",
      type: "select",
      picker: "bnkMeasures",
    },
    {
      accessorKey: " ارزیابی شونده ",
      name: "dimAssesseeId",
      type: "select",
      picker: "dimAssessee",
    },
    {
      accessorKey: "دوره زمانی ",
      name: "timeTypeId",
      type: "select",
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
      accessorKey: "ارزیابی شونده",
    },
    {
      name: "value",
      accessorKey: "مقدار",
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
