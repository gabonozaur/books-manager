import { Link } from "@chakra-ui/next-js";
import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../auth";
import LoginAuth from "../auth/login";
import { RegisterAuth } from "../auth/register";

const Navbar = () => {
  const { token } = useContext(AuthContext);
  return (
    <Flex align="center" minH="32px" justify="space-between">
      <Flex gap="32px">
        <Link href={"/"}>Home</Link>
      </Flex>
      {token ? null : (
        <Flex gap="16px">
          <LoginAuth />
          <RegisterAuth />
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
