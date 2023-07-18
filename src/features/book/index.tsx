import { AppContext } from "@/pages/_app";
import { Button, Flex, Link as CKLink, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { BookDTO } from "./models";

const Book: React.FC<BookDTO> = ({ name, id, author, categories }) => {
  const { setBookToUpdate } = useContext(AppContext);
  return (
    <Flex justify="space-between" boxShadow={"lg"} p="4px" direction={"column"}>
      <Text>Name {name}</Text>
      <Text>Author {author.name}</Text>
      <Flex>
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
      <Button
        onClick={() => {
          setBookToUpdate(id);
        }}
      >
        Edit
      </Button>
    </Flex>
  );
};

export default Book;
