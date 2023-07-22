import { apiClient } from "@/utils/apiClient";
import { Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "..";

const LogoutAuth = () => {
  const [inpProcess, setInProcess] = useState(false);
  const { setDecodedToken } = useContext(AuthContext);

  const logout = async () => {
    setInProcess(true);
    try {
      await apiClient.delete("/api/auth/logout");
      setDecodedToken(null);
    } catch (e) {
      setInProcess(false);
    }
  };
  return (
    <Button colorScheme={"orange"} onClick={logout} isLoading={inpProcess}>
      Logout
    </Button>
  );
};

export default LogoutAuth;
