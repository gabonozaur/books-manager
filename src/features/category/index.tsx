import { NameWithId } from "@/utils/models";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../auth";
import CardAuthors from "./Card";
import EditAuthors from "./Edit";
import useCategory from "./useCategory";

const AllCategories: React.FC<{ categories: NameWithId[] }> = ({
  categories,
}) => {
  const { onOpenEdit, ...rest } = useCategory();
  const { decodedToken } = useContext(AuthContext);

  return (
    <>
      <Flex align="center" my="8px">
        <Text>Categories</Text>
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
      {categories ? (
        <Flex>
          {categories.map((author) => (
            <CardAuthors {...author} key={author.id} onOpenEdit={onOpenEdit} />
          ))}
        </Flex>
      ) : (
        <Text>No Categories</Text>
      )}
      <EditAuthors {...rest} />
    </>
  );
};

export default AllCategories;
