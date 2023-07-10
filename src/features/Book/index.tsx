import { Box, Text } from "@chakra-ui/react";
import { BookDTO } from "./models";

const Book: React.FC<BookDTO> = ({ name, id, author }) => {
  return (
    <Box boxShadow={"lg"} p="4px">
      <Text>Name {name}</Text>
      <Text>Author {author.name}</Text>
    </Box>
  );
};

export default Book;
