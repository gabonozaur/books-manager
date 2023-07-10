import getEnvVariable from "@/pages/utils/getEnvVariable";
import jsSHA from "jssha";
import { LoginDTO } from "./models";

export const encryptPassword = (props: LoginDTO) => {
  const shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.update(props.password);
  const passEnvVariable = getEnvVariable("Pass_Encrypt_Secret");
  shaObj.update(props.email);

  if (passEnvVariable) {
    shaObj.update(passEnvVariable);
  }

  debugger;
  return shaObj.getHash("HEX");
};
