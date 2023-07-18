export type GetSSREnvVariable =
  | "Pass_Encrypt_Secret"
  | "JWT_Key"
  | "NEXT_PUBLIC_BASEURL"
  | "NEXT_PUBLIC_ANALYTICS_ID"
  | "Brevo_user"
  | "Brevo_password";

const getEnvVariable = (props: GetSSREnvVariable) => {
  const value = process.env[props];

  if (!value) {
    console.log("no value set for key", props);
    return "no";
  }

  return value;
};

export default getEnvVariable;
