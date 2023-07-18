import { NextApiResponse } from "next";
import * as yup from "yup";

const validateBackendFields = async <T>(props: {
  data: T;
  res: NextApiResponse;
  shape: { [key in keyof T]: yup.Schema<any> };
  callback: () => void;
}) => {
  const { data, shape, res, callback } = props;

  const validationSchema = yup.object().shape(shape);
  try {
    await validationSchema.validate(data, { strict: true });
  } catch (e) {
    res.status(500).end(e.errors[0]);
    return;
  }
  callback();
};

export default validateBackendFields;
