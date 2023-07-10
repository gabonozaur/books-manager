import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "..";

import useLoginAuth from "./useLogin";

const LoginAuth = () => {
  const { token } = useContext(AuthContext);
  const { data, handleInputChange, loginRequest, pendingAuth } = useLoginAuth();
  return (
    <Modal isOpen={!token} onClose={null}>
      <ModalContent>
        <ModalBody border={"3px solid green"}>
          marcel
          <Input
            defaultValue={data.email}
            onChange={(e) => {
              handleInputChange({ email: e.target.value });
            }}
          />
          alin
          <Input
            defaultValue={data.password}
            onChange={(e) => {
              handleInputChange({ password: e.target.value });
            }}
          />
          <Button isLoading={pendingAuth} onClick={loginRequest}>
            Login
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginAuth;
