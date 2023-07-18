import { useAuth } from "@/features/auth/useAuth";
import { accessTokenCookieKey } from "@/utils/handleCookies";
import { useState } from "react";

const useApp = (cookies: any) => {
  const authValues = useAuth(cookies[accessTokenCookieKey]);
  const [bookToUpdate, setBookToUpdate] = useState(null as string | null);

  return { authValues, bookToUpdate, setBookToUpdate };
};

export default useApp;
