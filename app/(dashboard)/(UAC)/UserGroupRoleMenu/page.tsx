import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";
import BaseTable from "@/components/Table/BaseTable";
import { UserGroupRoleMenu } from "@/types/types";

const UserGroupRoleMenuTable = () => {
  // load picker for showing the option of select
  const loadPickerOptions = [
    {
      url: "v1/pts/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "organization",
    },
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
      url: "v1/uac/menu?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc",
      picker: "menu",
    },
  ];
  //the url for sending request POST , GET , DELETE, PUT
  const URL = "v1/uac/userGroupRoleMenu";
  // set the header and cell of the table
  const columnOptions = [
    {
      accessorKey: "نام کاربری ",
      name: "username",
      color: "",
      //color can be 'info' , 'dark' , 'destructive','secondary','success' or 'warning'
    },
    {
      accessorKey: "گروه",
      name: "groupName",
      color: "",
    },
    {
      accessorKey: "نقش",
      name: "roleName",
      color: "info",
    },
    {
      accessorKey: "نام منو",
      name: "menuName",
      color: "",
    },
  ];
  // the breadCrumb is the way that user come to the component c
  const BreadCrumbOption = [
    { title: "خانه", icon: <Home className="h-4 w-4" />, path: "/" },
    { title: "مدیریت کاربران", icon: <Layers className="h-4 w-4" />, path: "" },
    { title: "دسترسی منو", icon: <Box className="h-4 w-4" />, path: "" },
  ];
  //this section written for the input filed for modal insert and edit
  const Filed = [
    {
      accessorKey: "نام کاربر",
      name: "userId",
      type: "select",
      picker: "user",
    },
    {
      accessorKey: "نام گروه",
      name: "groupId",
      type: "select",
      picker: "group",
    },
    {
      accessorKey: "نقش",
      name: "roleId",
      type: "select",
      picker: "role",
    },
    {
      accessorKey: "منو",
      name: "menuId",
      type: "combobox",
      picker: "menu",
    },
    {
      accessorKey: "تخصیص به",
      name: "type",
      type: "costumeSelect",
      picker: "",
      selectItem: [
        { name: "نقش", value: "ENT_ROLE" },
        { name: "گروه", value: "ENT_GROUP" },
        { name: "کاربر", value: "ENT_USER" },
      ],
    },
    {
      accessorKey: "توضیحات",
      name: "description",
      type: "textarea",
      picker: "",
    },
    {
      accessorKey: "دسترسی",
      name: "hasAccess",
      type: "switch",
      picker: "",
    },
  ];
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <BaseTable<UserGroupRoleMenu>
        loadPickerOptions={loadPickerOptions}
        columnOptions={columnOptions}
        BreadCrumbOption={BreadCrumbOption}
        Filed={Filed}
        Url={URL}
      />
    </Suspense>
  );
};

export default UserGroupRoleMenuTable;
