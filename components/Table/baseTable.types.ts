export type URL =
  | "v1/meyar/factMeasures"
  | "v1/meyar/factMeasures"
  | "v1/meyar/dimDate";
export type pickerName =
  | "measureUnit"
  | "organization"
  | "role"
  | "group"
  | "user"
  | "endpoint"
  | "location"
  | "bnkMeasures"
  | "dimAssessee"
  | "mrfTimeType";
export type PickersUrls = {
  url:
    | "v1/meyar/dimBase/comboList?search=(deleted:0 AND active:true AND typeCode:6)&size=1000&page=0&sort=created,desc"
    | "v1/meyar/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc"
    | "v1/uac/role?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc"
    | "v1/uac/group?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc"
    | "v1/uac/user?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc"
    | "v1/uac/endpoint?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc"
    | "v1/uac/location?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc"
    | "v1/meyar/bnkMeasures/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc"
    | "v1/meyar/dimAssessee/comboList?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc"
    | "v1/meyar/dimTimeType?search=(deleted:0)&size=1000&page=0&sort=created,desc"
    | "v1/uac/organization?search=(deleted:0 AND active:true)&size=1000&page=0&sort=created,desc";
  picker: pickerName;
}[];
export type FiledTypes<T> = {
  accessorKey?: string;
  staticExtraState?: {
    stateName: string;
    stateValue: string;
    type: string;
  };
  required?: boolean;
  pattern?: RegExp;
  messagePattern?: string;
  validation?: {
    min?: number;

    required?: boolean;
    message?: string;
  };
  name: keyof T;
  name2?: string;
  type:
    | "text"
    | "textarea"
    | "time"
    | "timeRange"
    | "number"
    | "combobox"
    | "select"
    | "customSelect"
    | "O&D"
    | "map"
    | "plq"
    | "switch";
  picker?: pickerName;
  selectItem?: { name: string; value: any }[];
  placeholder?: string;
  startTimeName?: any;
  endTimeName?: any;
  order?: number;
  OriginAccessorKey?: string;
  OriginName?: string;
  DestAccessorKey?: string;
  DestName?: string;
  latName?: string;
  longName?: string;
  serialPlq?: string;
  Plq1?: string;
  Plq2?: string;
  Plq3?: string;
}[];

export interface propsBaseTable<U> {
  loadPickerOptions: {
    url: string;
    picker: string;
  }[];
  Url: string;
  NestedTable?: string;
  postAndPut?: boolean;
  columnOptions: {
    accessorKey: string;
    name: string;
    color?:
      | "default"
      | "secondary"
      | "destructive"
      | "warning"
      | "info"
      | "success"
      | "dark"
      | undefined
      | string;
    plq?: boolean;
    plqSerial?: string;
    plq1?: string;
    plq2?: string;
    plq3?: string;
    time?: string;
  }[];
  BreadCrumbOption?: { title: string; icon: React.ReactNode; path: string }[];
  Filed: FiledTypes<U>;
}
