import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { DimBase, Organization, PathType, Station } from "@/types/types";
import SimpleTable from "@/components/Table/SimpleTable";
const page = () => {
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/meyar/dimDate";

  const columnOptions = [
    {
      name: "pyearCode",
      accessorKey: "  کدسال",
      show: true,
    },
    {
      name: "pyear",
      accessorKey: " سال  ",
      show: true,
    },

    {
      name: "pquarterCode",
      accessorKey: "کدفصل",
      show: true,
    },

    {
      name: "pquarter",
      accessorKey: "فصل",
      show: true,
    },
    {
      name: "pmonthCode",
      accessorKey: "کد ماه",
      show: true,
    },
    {
      name: "pmonth",
      accessorKey: "ماه",
      show: true,
    },
    {
      name: "pweekCode",
      accessorKey: "کد هفته",
      show: true,
    },
    {
      name: "pweek",
      accessorKey: "هفته",
      show: true,
    },
    {
      name: "pdayCode",
      accessorKey: "کد روز",
      show: true,
    },
    {
      name: "pday",
      accessorKey: "روز",
      show: true,
    },
    {
      name: "dateP",
      accessorKey: "تاریخ",
      show: true,
    },
  ];

  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "اطلاعات پایه", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: " سال شمسی", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <SimpleTable<DimBase>
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Url={URL}
        postAndPut={false}
      />
    </Suspense>
  );
};

export default page;
