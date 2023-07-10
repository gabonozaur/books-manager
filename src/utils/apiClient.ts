import axios from "axios";
import getEnvVariable from "./getEnvVariable";

export const apiClient = axios.create({
  baseURL: `${getEnvVariable("NEXT_PUBLIC_BASEURL")}`,
  timeout: 1000,
});
