import axios from "axios";
import { useQuery } from "react-query";

export default function useApi(key, endPoint) {
  function getData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`);
  }

  return useQuery(key, getData);
}
