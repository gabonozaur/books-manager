import { FormLabel } from "@chakra-ui/form-control";
import { InputGroup } from "@chakra-ui/react";
import { InputRightAddon } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "..";
import useLoginAuth from "./useLogin";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginAuth = () => {
  const { token } = useContext(AuthContext);
  const { pendingAuth, errors, handleChange, values, handleSubmit, touched } =
    useLoginAuth();
  const [seePassword, setSeePassword] = useState(false);

  return (
    <Modal isOpen={!token} onClose={null}>
      <ModalContent>
        <ModalBody border={"3px solid green"}>
          <FormLabel htmlFor="email">Email</FormLabel>

          <Input
            isInvalid={errors.email && touched.email}
            id="email"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <FormLabel htmlFor="password">Pass</FormLabel>
          <InputGroup>
            <Input
              autoComplete="off"
              isInvalid={errors.password && touched.password}
              id={"password"}
              type={seePassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
            />
            <InputRightAddon>
              <IconButton
                aria-label="see/hide password"
                as={seePassword ? AiFillEye : AiFillEyeInvisible}
                onClick={() => {
                  setSeePassword(!seePassword);
                }}
              />
            </InputRightAddon>
          </InputGroup>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <Button
            my="4px"
            isLoading={pendingAuth}
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginAuth;
