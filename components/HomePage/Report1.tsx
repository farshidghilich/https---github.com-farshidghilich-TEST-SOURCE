"use client"  
import { User2, BusFront, ArchiveRestore, ScreenShare } from "lucide-react";  
import { Card } from "@/components/ui/card";  
import React, { Fragment, useState, useEffect } from "react";  
import axios, { AxiosResponse } from 'axios';  
import { getUrl } from "@/hooks/utility";  
import { useAuthStore } from "@/store";  
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ReportItem {  
  id: number;  
  name: string;  
  count: string;  
  icon: React.ReactNode;  
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'destructive' | 'default' | 'dark'  
}  

interface ResponseStatictis {  
  id?: number;  
  name?: string;  
  value?: string;  
}  

const Report1 = () => {  
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
    const url = 'v1/pts/statistics/report1'; // Replace with your API endpoint  
    fetchData(url)  
      .then(data => {  
        setReport(data);  
        console.log(data);  // Log the fetched data  
      })  
      .catch(error => {  
      });  
  }, [token]); // The dependency array ensures the effect runs only when token changes  
// Map for icons and colors  
const iconMap = [ 
  <BusFront className='w-6 h-6 text-success' />,  
<User2 className='w-6 h-6 text-primary' />,  
 <ArchiveRestore className='w-6 h-6 text-destructive' />,  
 <ScreenShare className='w-6 h-6 text-info' />,  
];  

// Transforming the original array  
const reports = report.map((item, index) => ({  
  id: index + 1,  
  name: item.name,  
  value: item.value,  
  icon: iconMap[index],  
  color: item.name === "کل مسافران" ? "primary" :  
         item.name === "ایستگاه فعال" ? "success" :  
         item.name === "پایانه ها" ? "destructive" :  
         "info"  
}));  
  return (  
    <Fragment>  
      {  
        reports.map(item => (  
          <Card key={item.id} className="rounded-lg p-4 xl:p-2 xl:py-6 2xl:p-6 flex flex-col items-center 2xl:min-w-[168px] animate-in-top">  
            <div>  
              <span className={`h-14 w-14 rounded-full flex justify-center items-center bg-${item.color}/10`}>  
                {item.icon}  
              </span>  
            </div>  
            <div className="mt-4 text-center">  
              <div className="text-base font-medium text-default-700">{item.name}</div>  
              <div className={`text-4xl font-semibold text-${item.color} mt-4`}>{item.value}</div>  
            </div>  
          </Card>  
        ))  
      }  
    </Fragment>  
  );  
};  

export default Report1;