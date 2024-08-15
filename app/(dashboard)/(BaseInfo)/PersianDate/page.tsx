import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { DimBase, Organization, PathType, Station } from "@/types/types";
import SimpleTable from "@/components/Table/SimpleTable";
const page = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/company?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "company",
    },
    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
    {
      url: "v1/pts/city?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "city",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/meyar/dimDate";
  const columnOptions = [
    {
      name: "pyearCode",
      accessorKey: "  کدسال",
    },
    {
      name: "pyear",
      accessorKey: " سال  ",
    },

    {
      name: "pquarterCode",
      accessorKey: "کدفصل",
    },

    {
      name: "pquarter",
      accessorKey: "فصل",
    },
    {
      name: "pmonthCode",
      accessorKey: "کد ماه",
    },
    {
      name: "pmonth",
      accessorKey: "ماه",
    },
    {
      name: "pweekCode",
      accessorKey: "کد هفته",
    },
    {
      name: "pweek",
      accessorKey: "هفته",
    },
    {
      name: "pdayCode",
      accessorKey: "کد روز",
    },
    {
      name: "pday",
      accessorKey: "روز",
    },
    {
      name: "dateP",
      accessorKey: "تاریخ",
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
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Url={URL}
        postAndPut={false}
      />
    </Suspense>
  );
};

export default page;
