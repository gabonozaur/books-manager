export type GetEnvVariableProps = "Pass_Encrypt_Secret" | "JWT_Key";
const getEnvVariable = (props: GetEnvVariableProps) => {
  const value = process.env[props];

  if (!value) {
    console.log("no value set for key", props);
    return "no";
  }

  return value;
};

export default getEnvVariable;
