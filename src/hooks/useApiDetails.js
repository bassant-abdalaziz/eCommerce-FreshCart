import axios from "axios";
import { useQuery } from "react-query";

export default function useApiDetails(key, endPoint, id) {
  function getDetails() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/${endPoint}/${id}`
    );
  }

  return useQuery(key, getDetails);
}
