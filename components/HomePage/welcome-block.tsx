"use client";
import Image from "next/image";
import admin from "@/public/images/all-img/admin.png"; 
import React, { Fragment, useState, useEffect } from "react";  
import axios, { AxiosResponse } from 'axios';  
import { getUrl } from "@/hooks/utility";  
import { useAuthStore } from "@/store";  
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface ResponseStatictis {  
  id?: number;  
  name?: string;  
  value?: string;  
}  

const WelcomeBlock = () => {
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
    const url = 'v1/pts/statistics/report2'; // Replace with your API endpoint  
    fetchData(url)  
      .then(data => {  
        setReport(data);  
      })  
      .catch(error => {   
      });  
  }, [token]); // The dependency array ensures the effect runs only when token changes  
  return (
    <div className="w-full h-full bg-primary rounded-md  flex p-6 relative ">
      <div className="flex-1 ">
        <div className="text-lg md:text-2xl font-semibold text-primary-foreground mb-6">
          تعداد ناوگان <br />
          ثبت شده
        </div>

        <div className=" flex flex-col gap-4 sm:flex-row ">
          {report.map((item, index) => (
            <div
              key={`welcome-text-${index}`}
              className="flex items-center w-full max-w-[130px] p-3 rounded bg-primary-foreground/10 shadow backdrop-blur-sm"
            >
              <div className="flex-1">
                <div className="text-xs font-semibold text-primary-foreground/80">{item.name}</div>
                <div className="text-lg font-semibold text-primary-foreground">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 ltr:right-4 rtl:left-4 ltr:md:right-[30%] rtl:md:left-[30%] ltr:md:bottom-5 ltr:2xl:right-10 rtl:2xl:left-10 w-[100px] ">
        <Image src={admin} alt="user" className="w-full h-full object-cover" priority={true} />
      </div>
    </div>
  );
};

export default WelcomeBlock;
