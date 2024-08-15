"use client";
import * as React from "react";

import { Home, Layers, Box, Bus, Building2 } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Organization, ResType, Role, User, UserGroup, UserRole } from "@/types/types";
import PersianDate from "@alireza-ab/persian-date";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuthStore, usePickerStore } from "@/store";
import axios from "axios";
import { getUrl } from "@/hooks/utility";
import {
  CompaniesAllVehicleType,
  CompanyAgreementsTypes,
  CompanyType,
  DriverInfo,
  FreighterInfo,
  InqueryData,
} from "../types/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import * as IranFlag from "./flag-4.png";
import toast from "react-hot-toast";

type DriverFetchStatus = {
  success: boolean;
  loading: boolean;
  error: boolean;
};
type TabTypes = {
  driver: boolean;
  freighter: boolean;
  company: boolean;
  companyAgreement: boolean;
  companiesAllVehicle: boolean;
};
const persianDate = new PersianDate();
export default function InqueryTable() {
  const Router = useRouter();
  const [inqueryData, setInqueryData] = React.useState<InqueryData>({ nationalId: "", cardNo: "", companyCode: "" });
  const [driverInfo, setDriverInfo] = React.useState<DriverInfo>({} as DriverInfo);
  const [freighterInfo, setfreighterInfo] = React.useState<FreighterInfo>({} as FreighterInfo);
  const [companyInfo, setcompanyInfo] = React.useState<CompanyType>({} as CompanyType);
  const [companiesAllVehicleS, setCompaniesAllVehicles] = React.useState<CompaniesAllVehicleType[]>([]);
  const [companyAgreements, setCompanyAgreements] = React.useState<CompanyAgreementsTypes[]>([]);
  const [collapsedRows, setCollapsedRows] = React.useState<number[]>([]);
  const [driverStatus, setDriverStatus] = React.useState<DriverFetchStatus>({
    loading: false,
    error: false,
    success: false,
  });
  const [tabTypes, setTabTypes] = React.useState<TabTypes>({
    driver: true,
    freighter: false,
    company: false,
    companyAgreement: false,
    companiesAllVehicle: false,
  });
  const toggleRow = (id: number) => {
    if (collapsedRows.includes(id)) {
      setCollapsedRows(collapsedRows.filter((rowId) => rowId !== id));
    } else {
      setCollapsedRows([...collapsedRows, id]);
    }
  };
  const { token } = useAuthStore();
  const getDriverInfo = async () => {
    try {
      setDriverStatus({ ...driverStatus, loading: true, success: false, error: false });
      await axios
        .get<DriverInfo>(getUrl(`v1/pts/inquiry/getDriverInfo?nationalId=${inqueryData.nationalId}`), {
          headers: { Authorization: token },
        })
        .then((response) => {
          setDriverStatus({ ...driverStatus, loading: false, success: true, error: false });

          setDriverInfo(response.data);
        });
    } catch (error) {
      setDriverStatus({ ...driverStatus, loading: false, success: false, error: true });
    }
  };
  const getfrigterInfo = async () => {
    try {
      setDriverStatus({ ...driverStatus, loading: true, success: false, error: false });

      await axios
        .get<FreighterInfo>(getUrl(`v1/pts/inquiry/getFreighterInfoByCardNo?cardNo=${inqueryData.cardNo}`), {
          headers: { Authorization: token },
        })
        .then((response) => {
          setDriverStatus({ ...driverStatus, loading: false, success: true, error: false });

          setfreighterInfo(response.data);
        });
    } catch (error) {
      setDriverStatus({ ...driverStatus, loading: false, success: false, error: true });
    }
  };
  const getcompanyInfo = async () => {
    try {
      setDriverStatus({ ...driverStatus, loading: true, success: false, error: false });

      await axios
        .get<CompanyType>(getUrl(`v1/pts/inquiry/getCompanyInfo?companyCode=${inqueryData.companyCode}`), {
          headers: { Authorization: token },
        })
        .then((response) => {
          setDriverStatus({ ...driverStatus, loading: false, success: true, error: false });

          setcompanyInfo(response.data);
        });
    } catch (error) {
      setDriverStatus({ ...driverStatus, loading: false, success: false, error: true });
    }
  };
  const getCompaniesAllVehicle = async () => {
    try {
      setDriverStatus({ ...driverStatus, loading: true, success: false, error: false });
      type resType = {
        results: CompaniesAllVehicleType[];
      };
      await axios
        .get<resType>(getUrl(`v1/pts/inquiry/getCompaniesAllVehicle?nationalId=${inqueryData.nationalId}`), {
          headers: { Authorization: token },
        })
        .then((response) => {
          setDriverStatus({ ...driverStatus, loading: false, success: true, error: false });

          setCompaniesAllVehicles(response.data.results);
        });
    } catch (error) {
      setDriverStatus({ ...driverStatus, loading: false, success: false, error: true });
    }
  };
  const getCompanyAgreements = async () => {
    try {
      setDriverStatus({ ...driverStatus, loading: true, success: false, error: false });
      type resType = {
        results: CompanyAgreementsTypes[];
      };
      await axios
        .get<resType>(getUrl(`v1/pts/inquiry/getCompanyAgreements?companyCode=${inqueryData.companyCode}`), {
          headers: { Authorization: token },
        })
        .then((response) => {
          setDriverStatus({ ...driverStatus, loading: false, success: true, error: false });

          setCompanyAgreements(response.data.results);
        });
    } catch (error) {
      toast.success(" خطا در برقرای ارتباط با سرور");
      setDriverStatus({ ...driverStatus, loading: false, success: false, error: true });
    }
  };
  return (
    <div className="relative">
      <Breadcrumbs className="mb-2">
        <BreadcrumbItem endContent={<Home className="h-4 w-4" />} onClick={() => Router.push("/")}>
          خانه
        </BreadcrumbItem>
        <BreadcrumbItem endContent={<Layers className="h-4 w-4" />}>مدیریت اطلاعات</BreadcrumbItem>
        <BreadcrumbItem endContent={<Box className="h-4 w-4" />}>استعلامات</BreadcrumbItem>
      </Breadcrumbs>
      <div className={cn("rounded-md  bg-card text-card-foreground shadow-sm mt-7")}>
        <Tabs
          defaultValue="driver"
          className=" inline-block w-full"
          onChange={(e) => {
            console.log(e);
          }}
        >
          <TabsList
            className=" border bg-background  my-1 mx-2 lg:flex  p-2"
            onChange={(e) => {
              console.log(e);
            }}
          >
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-4"
              value="driver"
              onClick={() => {
                setDriverStatus({ ...driverStatus, loading: false, success: false, error: false });
                setInqueryData({ nationalId: "", cardNo: "", companyCode: "" });

                setTabTypes({
                  driver: true,
                  freighter: false,
                  company: false,
                  companyAgreement: false,
                  companiesAllVehicle: false,
                });
              }}
            >
              <Icon icon="ph:user-circle" className="h-5 w-5  ml-2 " />
              راننده
            </TabsTrigger>
            <TabsTrigger
              value="freighter"
              className="p-4 rounded-full data-[state=active]:bg-red-600 data-[state=active]:text-primary-foreground "
              onClick={() => {
                setDriverStatus({ ...driverStatus, loading: false, success: false, error: false });
                setInqueryData({ nationalId: "", cardNo: "", companyCode: "" });
                setTabTypes({
                  driver: false,
                  freighter: true,
                  company: false,
                  companyAgreement: false,
                  companiesAllVehicle: false,
                });
              }}
            >
              <Icon icon="ph:car" className="h-5 w-5  mr-2 ml-2" />
              ناوگان
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setDriverStatus({ ...driverStatus, loading: false, success: false, error: false });

                setTabTypes({
                  driver: false,
                  freighter: false,
                  company: true,
                  companyAgreement: false,
                  companiesAllVehicle: false,
                });
              }}
              value="company"
              className=" rounded-full data-[state=active]:bg-yellow-400 data-[state=active]:text-black-foreground p-4"
            >
              <Building2 className=" h-5 w-5  mr-2 ml-2" />
              شرکت (کمپانی)
            </TabsTrigger>{" "}
            <TabsTrigger
              value="companiesAllVehicles"
              className=" rounded-full data-[state=active]:bg-red-600 data-[state=active]:text-primary-foreground p-4 "
              onClick={() => {
                setDriverStatus({ ...driverStatus, loading: false, success: false, error: false });
                setInqueryData({ nationalId: "", cardNo: "", companyCode: "" });

                setTabTypes({
                  driver: false,
                  freighter: false,
                  company: false,
                  companyAgreement: false,
                  companiesAllVehicle: true,
                });
              }}
            >
              <Bus className="h-5 w-5  mr-2 ml-2" />
              ناوگان شرکت
            </TabsTrigger>{" "}
            <TabsTrigger
              value="companyAgreements"
              className=" rounded-full data-[state=active]:bg-red-600 data-[state=active]:text-primary-foreground p-4"
              onClick={() => {
                setDriverStatus({ ...driverStatus, loading: false, success: false, error: false });
                setInqueryData({ nationalId: "", cardNo: "", companyCode: "" });

                setTabTypes({
                  driver: false,
                  freighter: false,
                  company: false,
                  companyAgreement: true,
                  companiesAllVehicle: false,
                });
              }}
            >
              <Icon icon="ph:document" className="h-5 w-5  mr-2 ml-2" />
              قرارداد های شرکت
            </TabsTrigger>{" "}
          </TabsList>
          <TabsContent value="driver">
            <Card>
              <CardHeader>
                <CardTitle>استعلام</CardTitle>

                <CardDescription>برای استعلام راننده کد ملی راننده رو وارد کنید</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label>کد ملی راننده</Label>
                <Input
                  name="nationalId"
                  className=""
                  value={inqueryData.nationalId}
                  onChange={(e) => {
                    setInqueryData({ ...inqueryData, nationalId: e.target.value });
                  }}
                />
              </CardContent>
              <CardFooter>
                <Button
                  disabled={driverStatus.loading}
                  variant="outline"
                  onClick={(e) => {
                    getDriverInfo();
                  }}
                >
                  {driverStatus.loading ? <>لطفا صبر کنید...</> : "استعلام"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="freighter">
            <Card>
              <CardHeader>
                <CardTitle>استعلام</CardTitle>

                {tabTypes.freighter && <CardDescription> استعلام ناوگان باشماره کارت هوشمند </CardDescription>}
              </CardHeader>
              <CardContent className="space-y-2">
                {tabTypes.freighter && <Label> شماره کارت هوشمند</Label>}

                <Input
                  name="cardNo"
                  value={inqueryData.cardNo}
                  onChange={(e) => {
                    setInqueryData({ ...inqueryData, cardNo: e.target.value });
                  }}
                />
              </CardContent>
              <CardFooter>
                <Button
                  disabled={driverStatus.loading}
                  variant="outline"
                  onClick={(e) => {
                    getfrigterInfo();
                  }}
                >
                  {driverStatus.loading ? <>لطفا صبر کنید...</> : "استعلام"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>استعلام</CardTitle>
                <CardDescription> استعلام اطلاعات شرکت </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label> کد شرکت </Label>

                <Input
                  name="companyCode"
                  value={inqueryData.companyCode}
                  onChange={(e) => {
                    setInqueryData({ ...inqueryData, companyCode: e.target.value });
                  }}
                />
              </CardContent>
              <CardFooter>
                <Button
                  disabled={driverStatus.loading}
                  variant="outline"
                  onClick={(e) => {
                    getcompanyInfo();
                  }}
                >
                  {driverStatus.loading ? <>لطفا صبر کنید...</> : "استعلام"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="companiesAllVehicles">
            <Card>
              <CardHeader>
                <CardTitle>استعلام</CardTitle>
                <CardDescription> استعلام تمام ناوگان شرکت </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label> شناسه ملی شرکت </Label>

                <Input
                  name="nationalId"
                  value={inqueryData.nationalId}
                  onChange={(e) => {
                    setInqueryData({ ...inqueryData, nationalId: e.target.value });
                  }}
                />
              </CardContent>
              <CardFooter>
                <Button
                  disabled={driverStatus.loading}
                  variant="outline"
                  onClick={(e) => {
                    getCompaniesAllVehicle();
                  }}
                >
                  {driverStatus.loading ? <>لطفا صبر کنید...</> : "استعلام"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>{" "}
          <TabsContent value="companyAgreements">
            <Card>
              <CardHeader>
                <CardTitle>استعلام</CardTitle>
                <CardDescription> استعلام تمام قرارداد های شرکت </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label> کد شرکت </Label>

                <Input
                  name="companyCode"
                  value={inqueryData.companyCode}
                  onChange={(e) => {
                    setInqueryData({ ...inqueryData, companyCode: e.target.value });
                  }}
                />
              </CardContent>
              <CardFooter>
                <Button
                  disabled={driverStatus.loading}
                  variant="outline"
                  onClick={(e) => {
                    getCompanyAgreements();
                  }}
                >
                  {driverStatus.loading ? <>لطفا صبر کنید...</> : "استعلام"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className={cn("rounded-md  bg-card text-card-foreground shadow-sm mt-10 mb-10")}>
        <div>
          {driverStatus.success && (
            <Table>
              <TableHeader>
                {tabTypes.driver && (
                  <TableRow>
                    <TableHead> {tabTypes.driver && "نام راننده"}</TableHead>
                    <TableHead>{tabTypes.driver && "کد ملی"}</TableHead>
                    <TableHead>{tabTypes.driver && " تاریخ تولد "}</TableHead>
                    <TableHead>{tabTypes.driver && " نام پدر "}</TableHead>
                    <TableHead>{tabTypes.driver && " شمار کارت هوشمند "}</TableHead>
                    <TableHead>{tabTypes.driver && " شمار بیمه "}</TableHead>
                    <TableHead>{tabTypes.driver && " شمار گواهی نام "}</TableHead>
                  </TableRow>
                )}
                {tabTypes.freighter && (
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead> {tabTypes.freighter && "نام مالک"}</TableHead>

                    <TableHead>{tabTypes.freighter && " شماره ملی"}</TableHead>
                    <TableHead>{tabTypes.freighter && "  تاریخ  معاینه فنی "}</TableHead>
                    <TableHead>{tabTypes.freighter && " شماره پلاک"}</TableHead>
                    <TableHead>{tabTypes.freighter && "سال ساخت"}</TableHead>
                    <TableHead>{tabTypes.freighter && "ظرفیت ناوگان"}</TableHead>
                    <TableHead>{tabTypes.freighter && " نوع  وسیله نقلیه"}</TableHead>
                  </TableRow>
                )}
                {tabTypes.company && (
                  <TableRow>
                    <TableHead> جزییات </TableHead>

                    <TableHead> نام شرکت </TableHead>
                    <TableHead>آدرس</TableHead>
                    <TableHead>تلفن </TableHead>
                    <TableHead> نام مدیرعامل</TableHead>
                    <TableHead>کد ملی مدیر عامل </TableHead>
                    <TableHead>همراه مدیرعامل </TableHead>
                  </TableRow>
                )}
                {tabTypes.companiesAllVehicle && (
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead> {" کد شرکت"}</TableHead>

                    <TableHead>{"  شماره کارت هوشمند"}</TableHead>
                    <TableHead>{" شماره پلاک"}</TableHead>
                    <TableHead>{" نوع مالکیت"}</TableHead>
                    <TableHead>{"    تاریخ شروع"}</TableHead>
                    <TableHead>{"    تاریخ پایان"}</TableHead>
                  </TableRow>
                )}{" "}
                {tabTypes.companyAgreement && (
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>کد شرکت مادر</TableHead>
                    <TableHead>کد شرکت طرف قرارداد</TableHead>
                    <TableHead>کد شرکت ثبت کننده</TableHead>
                    <TableHead>کد شهر شرکت مادر</TableHead>
                    <TableHead>کد شهر شرکت طرف قرارداد</TableHead>
                    <TableHead>کد شهر شرکت ثبت کننده</TableHead>
                    <TableHead> مسیر</TableHead>
                    <TableHead>{"    تاریخ شروع"}</TableHead>
                    <TableHead>{"    تاریخ پایان"}</TableHead>
                    <TableHead> وظعیت</TableHead>
                  </TableRow>
                )}
              </TableHeader>
              <TableBody>
                <TableRow>
                  {tabTypes.driver && (
                    <>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Button
                            onClick={() => {
                              tabTypes.driver ? toggleRow(1) : tabTypes.freighter ? toggleRow(2) : toggleRow(1);
                            }}
                            size="icon"
                            variant="outline"
                            color="secondary"
                            className=" h-7 w-7 border-none rounded-full "
                          >
                            <Icon
                              icon="heroicons:chevron-down"
                              className={cn("h-5 w-5 transition-all duration-300 ", {
                                "rotate-180": collapsedRows.includes(1),
                              })}
                            />
                          </Button>
                          <div className="flex gap-3 items-center">
                            <span className="mx-2">{driverInfo.name}</span> <span>{driverInfo.family}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="even:bg-default-100 text-center">{driverInfo.code_meli}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">{driverInfo.birth_date}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">{driverInfo.father_name}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">{driverInfo.no_kart}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">{driverInfo.somare_bime}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">
                        {driverInfo.shomare_gavahinameh}
                      </TableCell>
                    </>
                  )}
                  {tabTypes.freighter && (
                    <>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Button
                            onClick={() => {
                              toggleRow(2);
                            }}
                            size="icon"
                            variant="outline"
                            color="secondary"
                            className=" h-7 w-7 border-none rounded-full "
                          >
                            <Icon
                              icon="heroicons:chevron-down"
                              className={cn("h-5 w-5 transition-all duration-300 ", {
                                "rotate-180": collapsedRows.includes(2),
                              })}
                            />
                          </Button>
                        </div>
                      </TableCell>

                      <TableCell className="even:bg-default-100 text-center">{freighterInfo.NAME_MALEK}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">{freighterInfo.SHENASE_MELI}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">{freighterInfo.TARIKH_MOAYENE}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">
                        <div className=" flex items-center justify-center ">
                          <div className="flex items-center justify-between w-60 h-16 bg-yellow-400 border-2 border-black rounded-sm p-2 relative">
                            <div
                              style={{ zIndex: "3" }}
                              className="z-50 flex flex-col items-center justify-center text-white bg-blue-700 w-7 h-full rounded-l-sm absolute left-0"
                            >
                              <div style={{ zIndex: "1", width: "%100" }}>
                                <Image
                                  alt="ایران"
                                  src={IranFlag}
                                  width={100}
                                  className=" h-5 mt-1 rounded z-10 rounded-tl-sm"
                                />
                              </div>
                              <div className="mt-auto text-md" style={{ fontSize: "8px" }}>
                                <div style={{ textAlign: "left" }} className="mt-1 mr-1 ">
                                  I.R.
                                </div>
                                <div style={{ textAlign: "left" }} className=" mr-1 p-0">
                                  IRAN
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center justify-center text-black w-16 h-full">
                              <div className="text-md persian-text mb-2 mx-auto text-md font-bold">
                                {freighterInfo.shomare_serial_plaque}
                              </div>
                              <div className="text-md persian-text text-md font-bold">
                                <span> {freighterInfo.nove_plaque}</span>
                              </div>
                              <div className="border-r-2 border-black h-full absolute right-16 top-0"></div>
                            </div>

                            <div className="flex flex-grow items-center justify-center ml-12">
                              <div className=" persian-text" style={{ fontSize: "20px", fontWeight: "bold" }}>
                                <span className="mx-1">{freighterInfo.plq3}</span>
                                <span>{freighterInfo.plq2}</span>
                                <span className="mx-1">{freighterInfo.plq1}</span>
                              </div>
                            </div>

                            {/* <div className="absolute left-12 top-0 bottom-0 w-px bg-black"></div> */}
                          </div>
                        </div>
                        {/* <div className="flex items-center justify-center ">
                          <div className="flex items-center justify-between w-72 h-16 bg-yellow-400 border-4 border-black rounded-lg p-2">
                            <div className="flex flex-col items-center justify-center text-white bg-blue-700 w-16 h-full rounded-md">
                              <div className="text-xs persian-text">ایران</div>
                              <div className="mt-auto text-xs">I.R. </div>
                            </div>
                            <div className="text-4xl font-bold persian-text">۱۲۳۴۵۶۷</div>
                            <div className="flex flex-col items-center justify-center text-black w-16 h-full">
                              <div className="text-xs persian-text">ایران</div>
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="border rounded p-4">
                          <span className="mx-1 font-medium">{freighterInfo.shomare_serial_plaque}</span>
                          <span> {freighterInfo.nove_plaque}</span>
                          <span className="mx-1">{freighterInfo.plq3}</span>
                          <span>{freighterInfo.plq2}</span>
                          <span className="mx-1">{freighterInfo.plq1}</span>
                        </div> */}
                      </TableCell>
                      <TableCell className="even:bg-default-100 text-center">{freighterInfo.sal_sakht}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">{freighterInfo.zarfiat}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">{freighterInfo.nove_vasile}</TableCell>
                    </>
                  )}
                  {tabTypes.company && (
                    <>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Button
                            onClick={() => {
                              toggleRow(3);
                            }}
                            size="icon"
                            variant="outline"
                            color="secondary"
                            className=" h-7 w-7 border-none rounded-full "
                          >
                            <Icon
                              icon="heroicons:chevron-down"
                              className={cn("h-5 w-5 transition-all duration-300 ", {
                                "rotate-180": collapsedRows.includes(3),
                              })}
                            />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="even:bg-default-100 text-center">{companyInfo.results[0].NAME}</TableCell>
                      <TableCell className="even:bg-default-100 text-center">
                        {companyInfo.results[0].ADDRESSC}
                      </TableCell>
                      <TableCell className="even:bg-default-100 text-center">
                        {companyInfo.results[0].WORK_PHONE}
                      </TableCell>
                      <TableCell className="even:bg-default-100 text-center">
                        {companyInfo.results[0].FIRST_NAME}{" "}
                        <span className="mx-2">{companyInfo.results[0].LAST_NAME}</span>
                      </TableCell>
                      <TableCell className="even:bg-default-100 text-center">
                        {companyInfo.results[0].NATIONAL_CODE}
                      </TableCell>

                      <TableCell className="even:bg-default-100 text-center">
                        {companyInfo.results[0].CELLPHONE}
                      </TableCell>
                    </>
                  )}
                </TableRow>
                {tabTypes.companiesAllVehicle && (
                  <>
                    {companiesAllVehicleS.map((item, index) => (
                      <TableRow>
                        <>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Button
                                onClick={() => {
                                  toggleRow(index + 50);
                                }}
                                size="icon"
                                variant="outline"
                                color="secondary"
                                className=" h-7 w-7 border-none rounded-full "
                              >
                                <Icon
                                  icon="heroicons:chevron-down"
                                  className={cn("h-5 w-5 transition-all duration-300 ", {
                                    "rotate-180": collapsedRows.includes(index + 50),
                                  })}
                                />
                              </Button>
                            </div>
                          </TableCell>

                          <TableCell className="even:bg-default-100 text-center">{item.CODE}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">{item.INTELLIGENCE_CARD}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">
                            <div className=" flex items-center justify-center ">
                              <div className="flex items-center justify-between w-60 h-16 bg-yellow-400 border-2 border-black rounded-sm p-2 relative">
                                <div
                                  style={{ zIndex: "3" }}
                                  className="z-50 flex flex-col items-center justify-center text-white bg-blue-700 w-7 h-full rounded-l-sm absolute left-0"
                                >
                                  <div style={{ zIndex: "1", width: "%100" }}>
                                    <Image
                                      alt="ایران"
                                      src={IranFlag}
                                      width={100}
                                      className=" h-5 mt-1 rounded z-10 rounded-tl-sm"
                                    />
                                  </div>
                                  <div className="mt-auto text-md" style={{ fontSize: "8px" }}>
                                    <div style={{ textAlign: "left" }} className="mt-1 mr-1 ">
                                      I.R.
                                    </div>
                                    <div style={{ textAlign: "left" }} className=" mr-1 p-0">
                                      IRAN
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-center justify-center text-black w-16 h-full">
                                  <div className="text-md persian-text mb-2 mx-auto text-md font-bold">ایران</div>
                                  <div className="text-md persian-text text-md font-bold">
                                    <span> {item.SERIAL_MASHIN}</span>
                                  </div>
                                  <div className="border-r-2 border-black h-full absolute right-16 top-0"></div>
                                </div>

                                <div className="flex flex-grow items-center justify-center ml-12">
                                  <div className=" persian-text" style={{ fontSize: "20px", fontWeight: "bold" }}>
                                    <span className="mx-1">{item.PELAK3}</span>
                                    <span>{item.PELAK1}</span>
                                    <span className="mx-1">{item.PELAK2}</span>
                                  </div>
                                </div>

                                {/* <div className="absolute left-12 top-0 bottom-0 w-px bg-black"></div> */}
                              </div>
                            </div>
                            {/* <div className="flex items-center justify-center ">
                          <div className="flex items-center justify-between w-72 h-16 bg-yellow-400 border-4 border-black rounded-lg p-2">
                            <div className="flex flex-col items-center justify-center text-white bg-blue-700 w-16 h-full rounded-md">
                              <div className="text-xs persian-text">ایران</div>
                              <div className="mt-auto text-xs">I.R. </div>
                            </div>
                            <div className="text-4xl font-bold persian-text">۱۲۳۴۵۶۷</div>
                            <div className="flex flex-col items-center justify-center text-black w-16 h-full">
                              <div className="text-xs persian-text">ایران</div>
                            </div>
                          </div>
                        </div> */}
                            {/* <div className="border rounded p-4">
                          <span className="mx-1 font-medium">{freighterInfo.shomare_serial_plaque}</span>
                          <span> {freighterInfo.nove_plaque}</span>
                          <span className="mx-1">{freighterInfo.plq3}</span>
                          <span>{freighterInfo.plq2}</span>
                          <span className="mx-1">{freighterInfo.plq1}</span>
                        </div> */}
                          </TableCell>
                          <TableCell className="even:bg-default-100 text-center">{item.OWNER_KIND}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">
                            {persianDate.fromGregorian(item.BELONG_START_DATE?.iso?.substring(0, 10)).toString()}
                          </TableCell>
                          <TableCell className="even:bg-default-100 text-center">
                            {persianDate.fromGregorian(item.BELONG_END_DATE?.iso?.substring(0, 10)).toString()}
                          </TableCell>
                        </>
                      </TableRow>
                    ))}
                  </>
                )}
                {tabTypes.companyAgreement && (
                  <>
                    {companyAgreements.map((item, index) => (
                      <TableRow>
                        <>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Button
                                onClick={() => {
                                  toggleRow(index + 250);
                                }}
                                size="icon"
                                variant="outline"
                                color="secondary"
                                className=" h-7 w-7 border-none rounded-full "
                              >
                                <Icon
                                  icon="heroicons:chevron-down"
                                  className={cn("h-5 w-5 transition-all duration-300 ", {
                                    "rotate-180": collapsedRows.includes(index + 250),
                                  })}
                                />
                              </Button>
                            </div>
                          </TableCell>

                          <TableCell className="even:bg-default-100 text-center">{item.MotherCode}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">{item.CODE_COMPANY_BASE}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">{item.CODE_COMPANY_SUBS}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">{item.CODE_PLACE_MOTHER}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">{item.CODE_PLACE_BASE}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">{item.CODE_PLACE_SUBS}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">{item.path}</TableCell>
                          <TableCell className="even:bg-default-100 text-center">
                            {persianDate.fromGregorian(item.START_DATE?.iso?.substring(0, 10)).toString()}
                          </TableCell>
                          <TableCell className="even:bg-default-100 text-center">
                            {persianDate.fromGregorian(item.END_DATE?.iso?.substring(0, 10)).toString()}
                          </TableCell>
                          <TableCell className="even:bg-default-100 text-center">{item.STATUS}</TableCell>
                        </>
                      </TableRow>
                    ))}
                  </>
                )}
                {tabTypes.driver && (
                  <>
                    {collapsedRows.includes(1) && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div className="ltr:pl-12 rtl:pr-12 flex flex-col items-start">
                            <p> تاریخ صدور کارت: {driverInfo.tarikh_sodor}</p>
                            <p>شماره کارت سلامت:{driverInfo.salamat_date}</p>
                            <p>شهر محل سکونت: {driverInfo.shahr_mahal_sokonat} </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
                {tabTypes.freighter && (
                  <>
                    {collapsedRows.includes(2) && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div className="ltr:pl-12 rtl:pr-12 flex flex-col items-start">
                            <p> کد نوع: {freighterInfo.type_code}</p>
                            <p> تاریخ صدور:{freighterInfo.tarikh_sodor}</p>
                            <p> تاریخ پایان اعتبار: {freighterInfo.tarikh_payan_etebar} </p>
                            <p> شماره vin خودرو: {freighterInfo.shenaseh_khodro} </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}{" "}
                {tabTypes.company && (
                  <>
                    {collapsedRows.includes(3) && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div className="ltr:pl-12 rtl:pr-12 flex flex-col items-start">
                            <p> کد مجوز فعالیت: {companyInfo.results[0].ACTIVITY_TYPE_CODE}</p>{" "}
                            <p> کد شهر : {companyInfo.results[0].CITY_PLACE_CODE}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
                {tabTypes.companiesAllVehicle && (
                  <>
                    {companiesAllVehicleS.map((item, index) => (
                      <>
                        {collapsedRows.includes(index + 50) && (
                          <>
                            <TableRow>
                              <TableCell colSpan={7}>
                                <div className="ltr:pl-12 rtl:pr-12 flex flex-col items-start">
                                  <p>بدون جزییات</p>{" "}
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                      </>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
