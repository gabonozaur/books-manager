import { encryptPassword } from "./features/auth/encryptPassword";

export default function Home() {
  console.log(encryptPassword({ email: "gigi", password: "marcel" }));
  debugger;
  return <>Home</>;
}
