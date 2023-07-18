import { FormLabel } from "@chakra-ui/form-control";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useLoginAuth from "./useLogin";

const LoginAuth = () => {
  const {
    pendingAuth,
    errors,
    handleChange,
    values,
    handleSubmit,
    touched,
    handleReset,
  } = useLoginAuth();
  const [seePassword, setSeePassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Login
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleReset(null);
        }}
      >
        <ModalContent>
          <ModalBody border={"3px solid green"}>
            <form
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
            >
              <FormLabel htmlFor="email">Email</FormLabel>

              <Input
                isInvalid={!!errors.email && !!touched.email}
                id="email"
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <FormLabel htmlFor="password">Pass</FormLabel>
              <InputGroup>
                <Input
                  autoComplete="off"
                  isInvalid={!!errors.password && !!touched.password}
                  id={"password"}
                  type={seePassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                />
                <InputRightAddon>
                  <IconButton
                    aria-label="see/hide password"
                    size="16px"
                    icon={
                      seePassword ? (
                        <AiFillEye size="24px" />
                      ) : (
                        <AiFillEyeInvisible size="24px" />
                      )
                    }
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
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginAuth;
