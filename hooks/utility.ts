import configData from "../config.json";

// const user: string | null = localStorage.getItem("user");

export const getUrl = (apiName: string): string => {
  return `${configData.API_URL}/${apiName}`;
};

// export const getPickerUrl = (actionName: string, actionParams?: string): string => {
//   return `${configData.API_URL}/Picker/${actionName}${!actionParams || actionParams.length <= 0 ? "" : actionParams}`;
// };

// export const makeCamelCase = (text: string): string => {
//   return text?.charAt(0).toLowerCase() + text?.slice(1);
// };


// export const getUserName = (): string | undefined => {
//   if (user) {
//     const parsedUser = JSON.parse(user);
//     return parsedUser?.userName;
//   }
// };

// export const getFullName = (): string | undefined => {
//   if (user) {
//     const parsedUser = JSON.parse(user);
//     return parsedUser?.fullName;
//   }
// };
