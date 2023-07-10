import {
  Button,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useRegisterAuth from "./useRegister";

export const RegisterAuth = () => {
  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    touched,
    handleReset,
    seePassword,
    setSeePassword,
    pending,
    isOpen,
    setIsOpen,
  } = useRegisterAuth();

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Register
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleReset(null);
        }}
      >
        <ModalContent>
          <ModalBody>
            <FormLabel htmlFor="name">Name</FormLabel>

            <Input
              isInvalid={errors.name && touched.name}
              id="name"
              onChange={handleChange}
              value={values.name}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
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
            <Button my="4px" isLoading={pending} onClick={() => handleSubmit()}>
              Register
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
