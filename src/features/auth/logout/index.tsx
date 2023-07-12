import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "..";

const LogoutAuth = () => {
  const { setToken } = useContext(AuthContext);
  return (
    <Button
      onClick={() => {
        setToken("");
      }}
    >
      logout
    </Button>
  );
};

export default LogoutAuth;
