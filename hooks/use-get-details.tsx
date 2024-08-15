import { useAuthStore } from "@/store";
import axios from "axios";
import React, { useState } from "react";
import { getUrl } from "./utility";

const getDetail = <T,>(url: string) => {
  const [details, setDetails] = useState<T>({} as T);
  const { token } = useAuthStore();

  const showDetails = async (id: number) => {
    try {
      await axios
        .get<T>(getUrl(`${url}/${id}`), { headers: { Authorization: token } })
        .then((res) => {
          setDetails(res.data);
        })
        .catch((error) => {
          if (error.response.status == 401) {
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    showDetails,
    details,
  };
};

export default getDetail;
