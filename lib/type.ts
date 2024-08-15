// color type
export type color = "primary" | "info" | "warning" | "success" | "destructive" | "secondary";
export type TextAreaColor = "primary" | "info" | "warning" | "success" | "destructive";
export type InputColor = "primary" | "info" | "warning" | "success" | "destructive";

//  variant
export type InputVariant = "flat" | "underline" | "bordered" | "faded" | "ghost" | "flat-underline";
export type TextAreaVariant = "flat" | "underline" | "bordered" | "faded" | "ghost" | "flat-underline";

// shadow
export type Shadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

// radius

export type Radius = "none" | "sm" | "md" | "lg" | "xl";

export type LoginInfo = {
  userId?: number | null;
  username?: string | null;
  organizationId?: number | null;
  refreshToken?: string | null;
  token?: string | null ;
};

export type Initialmenu = {
  displayName?: string | null;
  icon?: string | null;
  id?: number | null;
  name?: string | null;
  orderNode?: number | null;
  parentId?: number | null;
  parentName?: string | null;
  path?: string | null;
};