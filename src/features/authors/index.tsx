import { NameWithId } from "@/utils/models";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../auth";
import CardAuthors from "./Card";
import EditAuthors from "./Edit";
import useAuthors from "./useAuthors";

const AllAuthors: React.FC<{ authors: NameWithId[] }> = ({ authors }) => {
  const { onOpenEdit, ...rest } = useAuthors();
  const { decodedToken } = useContext(AuthContext);

  return (
    <>
      <Flex align="center" my="8px">
        <Text>Authors</Text>
        {decodedToken?.role === "ADMIN" ? (
          <Button
            onClick={() => {
              onOpenEdit({ name: "", id: "" });
            }}
            ml="4px"
          >
            Add
          </Button>
        ) : null}
      </Flex>
      {authors ? (
        <Flex>
          {authors.map((author) => (
            <CardAuthors {...author} key={author.id} onOpenEdit={onOpenEdit} />
          ))}
        </Flex>
      ) : (
        <Text>No Authors</Text>
      )}
      <EditAuthors {...rest} />
    </>
  );
};

export default AllAuthors;
