import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { TripDetail } from "@/types/types";
const TripDetailTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/station/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "station",
    },
    {
      url: "v1/pts/trip/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "trip",
    }
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/pts/tripDetail";

  const columnOptions = [
    {
      accessorKey: "سفر",
      name: "tripName",
      color: "",
    },
    {
      accessorKey: "نام",
      name: "name",
      color: "",
    },
    {
      accessorKey: "نام خانوادگی",
      name: "family",
      color: "",
    },
    {
      accessorKey: "کد ملی",
      name: "nationalId",
      color: "info",
    },
    {
      accessorKey: "شماره صندلی",
      name: "chair_num",
      color: "warning",
    },
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
      accessorKey: "نام",
      name: "name",
      type: "text",
      order:3
    },
    {
      accessorKey: "نام خانوادگی",
      name: "family",
      type: "text",
      order:4
    },
    {
      accessorKey: "موبایل",
      name: "mobile",
      type: "number",
      order:5
    },
    {
      accessorKey: "شماره صندلی",
      name: "chair_num",
      type: "number",
      order:6
    },
    {
      accessorKey: "هزینه",
      name: "cost",
      type: "number",
      order:7
    },
    {
      accessorKey: "کدملی",
      name: "nationalId",
      type: "number",
      order:2
    },
    {
      accessorKey: "ایستگاه مبدا و مقصد ",
      name: "",
      type: "O&D",
      picker: "station",
      OriginAccessorKey: "ایستگاه مبدا",
      OriginName: "srcTerminalId",
      DestAccessorKey: "ایستگاه مقصد",
      DestName: "dstTerminalId",
      order: 8,
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<TripDetail>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default TripDetailTable;
