"use client";

import { Card } from "@/components/ui/card";
import { CircularProgress } from "../ui/progress";
import React, { Fragment, useState, useEffect } from "react";  
import axios, { AxiosResponse } from 'axios';  
import { getUrl } from "@/hooks/utility";  
import { useAuthStore } from "@/store";  
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface ResponseStatictis {  
  id?: number;  
  name?: string;  
  value?: number;  
  color?:'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'destructive' | 'default' | 'dark' 
}  
const ReportsCard = () => {
      const [report, setReport] = useState<ResponseStatictis[]>([]);  
      const { token } = useAuthStore();  
      const route = useRouter();
    
      // Function to fetch data from the server  
      async function fetchData(url: string): Promise<ResponseStatictis[]> {  
        try {  
          // Make a GET request  
          const response: AxiosResponse<ResponseStatictis[]> = await axios.get<ResponseStatictis[]>(getUrl(url), {  
            headers: { Authorization: token },  
          });  
          
          // Return the data  
          return response.data;  
        } catch (error) {  
          // Handle errors here, optionally log the error  
          if (axios.isAxiosError(error)) {  
            console.error(error.message);  
          } else {  
            console.error(error);  
          }  
          throw error; // Re-throw the error after logging  
        }  
      }  
    
      // Use useEffect to fetch data on component mount  
      useEffect(() => {  
        const url = 'v1/pts/statistics/report3'; // Replace with your API endpoint  
        fetchData(url)  
          .then(data => {  
            setReport(data);  
          })  
          .catch(error => {  
            if(error.response.status===401){
              const message =
          "توکن شما منقضی شده است تا لحظاتی بعد به صفحه ورود منتقل میشوید";
        toast.error(message);
        setTimeout(() => {
          route.push("/auth/login");
        }, 2000);
            }  
          });  
      }, [token]); // The dependency array ensures the effect runs only when token changes 
      const colors = [ 
        "primary",  
        "success",  
        "destructive",  
        "info",  
      ];   

      const result = report.map((item, index) => ({  
        id: index + 1,  
        name: item.name,  
        value: item.value,  
        color: colors[index],  
      }));   
      const reports= [
        {
        id: 1,
        name: "رضایت راننده",
        value: 18,
        color: "primary",
        },
        {
        id: 2,
        name: "رضایت مسافر",
        value: 80,
        color: "success",
        },
        {
        id: 3,
        name: "ضریب اشغال اتوبوس",
        value: 1.5,
        color: "destructive",
        },
        {
        id: 4,
        name: "صورت وضعیت صادر شده",
        value: 35,
        color: "info",
        },
        ];
        const ShowArray = result.length===0?reports:result
  return (
    <Fragment>
      {ShowArray.map((item , index) => (
        <Card
          key={item.id}
          className="rounded-lg p-4 xl:p-2 xl:py-6 2xl:p-6  flex flex-col items-center 2xl:min-w-[168px] animate-in-left"
        >
          <div className="mt-4 text-center flex flex-col items-center">
          <div className="text-base font-medium text-default-600">{item.name}</div>
            <CircularProgress value={item.value} color={item.id===1?'primary':item.id===2?'success':item.id===3?'destructive':'info'} showValue size="xl"/>{" "}
            <div className="flex items-center justify-center gap-1 mt-2.5">
              <span className="text-xs  xl:text-sm font-medium text-default-600 whitespace-nowrap">
                مطلوب</span>
            </div>
          </div>
        </Card>
      ))}
    </Fragment>
  );
};

export default ReportsCard;