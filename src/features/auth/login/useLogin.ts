import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "..";
import { LoginDTO } from "../models";
import * as yup from "yup";

const validationSchema = yup
  .object()
  .shape<{ [key in keyof LoginDTO]: yup.Schema<any> }>({
    email: yup.string().required("required").email("must be email"),
    password: yup.string().required("req value").min(8, "min 8 chars long"),
  });

const useLoginAuth = () => {
  const [pendingAuth, setPendingAuth] = useState(false);

  const { setToken } = useContext(AuthContext);

  const onSubmit = async (data: LoginDTO) => {
    try {
      setPendingAuth(true);
      const res = await axios.post("/api/auth/login", data);
      setToken(res.data.token);
    } catch (e) {
      console.log("catch err", e);
    }
    setPendingAuth(false);
  };

  const { values, handleChange, errors, handleSubmit, touched, handleReset } =
    useFormik<LoginDTO>({
      initialValues: { email: "", password: "" },
      onSubmit,
      validationSchema,
    });

  return {
    pendingAuth,
    values,
    handleChange,
    errors,
    handleSubmit,
    touched,
    handleReset,
  };
};

export default useLoginAuth;
