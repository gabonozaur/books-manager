import { NameWithId } from "@/utils/models";
import { Flex, IconButton, Link as CkLink } from "@chakra-ui/react";
import Link from "next/link";
import { FC, useContext } from "react";
import { BiSolidCog } from "react-icons/bi";
import { AuthContext } from "../auth";

const CardCategory: FC<
  NameWithId & { onOpenEdit: (props: NameWithId) => void }
> = ({ name, id, onOpenEdit }) => {
  const { decodedToken } = useContext(AuthContext);

  return (
    <Flex align="center" m="8px" p="4px" boxShadow={"lg"} borderWidth="2px">
      <CkLink as={Link} href={`/category/${id}`}>
        {name}
      </CkLink>
      {decodedToken?.role === "ADMIN" ? (
        <IconButton
          color="orange"
          onClick={() => {
            onOpenEdit({ name, id });
          }}
          ml="4px"
          aria-label="author-edit"
          size="16px"
          icon={<BiSolidCog />}
        />
      ) : null}
    </Flex>
  );
};

export default CardCategory;
