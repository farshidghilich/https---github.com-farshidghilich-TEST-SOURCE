import PersianDate from "@alireza-ab/persian-date";
const persianDate = new PersianDate();
export const getPersianDate = (date: string): string => {
  return persianDate.fromGregorian(date?.substring(0, 10))?.toString();
};
