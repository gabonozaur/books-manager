export type GetEnvVariableProps =
  | "DB_Server"
  | "DB_Name"
  | "DB_Username"
  | "DB_Password"
  | "DB_Port_Number";
const getEnvVariable = (props: GetEnvVariableProps) => {
  const value = process.env[props];

  if (!value) {
    console.log("no value set for key", props);
  }

  return value;
};

export default getEnvVariable;
