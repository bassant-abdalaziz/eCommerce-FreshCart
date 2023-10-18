import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

export default function useJWT() {
  const [decodedToken, setDecodedToken] = useState({}); // Initialize with an empty object

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, []);

  return decodedToken;
}
