import { useAuth } from "@/features/auth/useAuth";
import { accessTokenCookieKey } from "@/utils/handleCookies";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RegisterConfirmDTO } from "./models";
import { apiClient } from "@/utils/apiClient";

const useApp = (cookies: any) => {
  const authValues = useAuth(cookies[accessTokenCookieKey]);
  const [bookToUpdate, setBookToUpdate] = useState(null as string | null);
  const { query } = useRouter();
  const { email, confirmString } = query as RegisterConfirmDTO;

  useEffect(() => {
    const confirmRequest = async () => {
      try {
        await apiClient.get(
          `/api/auth/register-confirm?email=${email}&confirmString=${confirmString}`
        );
        alert("confirm email success");
      } catch (e) {}
    };

    if (email && confirmString) {
      confirmRequest();
    }
  }, [email, confirmString]);

  return { authValues, bookToUpdate, setBookToUpdate };
};

export default useApp;
