import { encryptPassword } from "@/features/auth/encryptPassword";
import { RegisterDTO } from "@/features/auth/models";
import getEnvVariable from "@/utils/getEnvVariable";
import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { renderToString } from "react-dom/server";
import { v4 as uuidv4 } from "uuid";
import { createTransport } from "nodemailer";
import * as yup from "yup";
import validateBackendFields from "@/utils/validateBackendFields";

const confirmString = uuidv4();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    validateBackendFields<RegisterDTO>({
      data: req.body,
      res,
      shape: {
        email: yup.string().required("missing email"),
        name: yup.string().required("missing name"),
        password: yup.string().required("missing password"),
      },
      callback: async () => {
        const { email, name } = req.body as RegisterDTO;

        const transporter = createTransport({
          host: "smtp-relay.sendinblue.com",
          port: 587,
          auth: {
            user: getEnvVariable("Brevo_user"),
            pass: getEnvVariable("Brevo_password"),
          },
        });

        await prismaClient.user
          .create({
            data: {
              name,
              email,
              password: encryptPassword(req.body),
              confirmString,
            },
            select: {
              id: true,
              confirmed: true,
              confirmString: true,
            },
          })
          .then(() => {
            const mailOptions = {
              from: "gabbisoul20@gmail.com",
              to: email,
              subject: `Register ${name}`,
              html: renderToString(
                <div style={{ flexDirection: "column", display: "flex" }}>
                  Lorem ipsum Register confirm
                  <a
                    style={{ color: "red" }}
                    href={`${getEnvVariable(
                      "NEXT_PUBLIC_BASEURL"
                    )}?email=${email}&confirmString=${confirmString}`}
                    children="Confirm"
                  />
                </div>
              ),
            };

            transporter.sendMail(mailOptions).then(console.log, console.log);
            res.end();
          })
          .catch((err: PrismaClientKnownRequestError) => {
            res.status(500).end(err.message);
          });
      },
    });
  }
}
