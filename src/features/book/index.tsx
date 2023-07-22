import { AppContext } from "@/pages/_app";
import { Button, Flex, Grid, Link as CKLink, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../auth";
import { BookDTO } from "./models";

const Book: React.FC<BookDTO> = ({ name, id, author, categories }) => {
  const { setBookToUpdate } = useContext(AppContext);
  const { decodedToken } = useContext(AuthContext);
  return (
    <Flex
      justify="space-between"
      boxShadow={"lg"}
      p="8px"
      direction={"column"}
      borderWidth="2px"
    >
      <Grid templateColumns={"94px 1fr"}>
        <Text fontWeight={"bold"}>Name:</Text>
        <Text>{name}</Text>
        <Text fontWeight={"bold"}>Author:</Text>
        <Text>{author.name}</Text>
        <Text fontWeight={"bold"}>Categories:</Text>

        <Flex align="center" m="-4px" flexWrap={"wrap"}>
          {categories?.map((categ) => (
            <CKLink
              as={Link}
              href={`/category/${categ.id}`}
              key={categ.id}
              m="4px"
            >
              {categ.name}
            </CKLink>
          ))}
        </Flex>
      </Grid>
      {decodedToken?.role === "ADMIN" ? (
        <Button
          colorScheme={"yellow"}
          onClick={() => {
            setBookToUpdate(id);
          }}
        >
          Edit
        </Button>
      ) : null}
    </Flex>
  );
};

export default Book;
