import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { RegisterDTO } from "../models";

const useRegisterAuth = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const registerRequest = async (data: RegisterDTO) => {
    try {
      setPending(true);
      await axios.post("/api/auth/register", data);
      setIsOpen(false);
      alert("acc created, you can login");
    } catch (e) {
      console.log("catch err", e);
    }
    setPending(false);
  };

  const { values, handleChange, errors, handleSubmit, touched, handleReset } =
    useFormik<RegisterDTO>({
      initialValues: { email: "", password: "", name: "" },
      onSubmit: registerRequest,
      validationSchema: yup.object().shape({
        email: yup.string().required("required").email("must be email"),
        password: yup.string().required("req value").min(8, "min 8 chars long"),
      }),
    });

  return {
    values,
    handleChange,
    errors,
    handleSubmit,
    touched,
    handleReset,
    setSeePassword,
    seePassword,
    pending,
    isOpen,
    setIsOpen,
  };
};

export default useRegisterAuth;
