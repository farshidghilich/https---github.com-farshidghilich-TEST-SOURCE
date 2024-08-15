// // apiService.ts
// import axiosInstance from "./axios.config";

// // نوع عمومی برای داده‌های پاسخ
// interface ApiResponse<T> {
//   data: T;
// }

// // GET Request
// export const getData = async <T>(endpoint: string): Promise<T> => {
//   try {
//     const response = await axiosInstance.get<ApiResponse<T>>(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

// // POST Request
// export const postData = async <T>(endpoint: string, data: any): Promise<T> => {
//   try {
//     const response = await axiosInstance.post<ApiResponse<T>>(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error posting data:", error);
//     throw error;
//   }
// };

// export const putData = async <T>(endpoint: string, data: any): Promise<T> => {
//   try {
//     const response = await axiosInstance.put<ApiResponse<T>>(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating data:", error);
//     throw error;
//   }
// };

// export const deleteData = async <T>(endpoint: string): Promise<T> => {
//   try {
//     const response = await axiosInstance.delete<ApiResponse<T>>(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting data:", error);
//     throw error;
//   }
// };
