import { AppContext } from "@/pages/_app";
import { Box, Button, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { BookDTO } from "./models";

const Book: React.FC<BookDTO> = ({ name, id, author }) => {
  const { setBookToUpdate } = useContext(AppContext);
  return (
    <Box boxShadow={"lg"} p="4px">
      <Text>Name {name}</Text>
      <Text>Author {author.name}</Text>
      <Button
        onClick={() => {
          setBookToUpdate(id);
        }}
      >
        Edit
      </Button>
    </Box>
  );
};

export default Book;
