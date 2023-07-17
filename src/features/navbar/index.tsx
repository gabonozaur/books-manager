import { Link } from "@chakra-ui/next-js";
import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../auth";
import LoginAuth from "../auth/login";
import LogoutAuth from "../auth/logout";
import { RegisterAuth } from "../auth/register";
import AddAuthor from "../author/add";
import AddBook from "../book/add";
import AddCategory from "../category/add";

const Navbar = () => {
  const { decodedToken } = useContext(AuthContext);
  return (
    <Flex align="center" minH="32px" justify="space-between">
      <Flex gap="32px">
        <Link href={"/"}>Home</Link>
        <Link href={"/ee"}>Didi</Link>
      </Flex>
      <Flex gap="16px">
        <AddAuthor />
        <AddBook />
        <AddCategory />

        {decodedToken ? (
          <>
            <LogoutAuth />
          </>
        ) : (
          <>
            <LoginAuth />
            <RegisterAuth />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
