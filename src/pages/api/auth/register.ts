import { encryptPassword } from "@/pages/features/auth/encryptPassword";
import { RegisterDTO } from "@/pages/features/auth/models";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name } = req.body as RegisterDTO;
    const prisma = new PrismaClient();

    await prisma.user
      .create({
        data: {
          name,
          email,
          password: encryptPassword(req.body),
        },
      })
      .then(() => res.end())
      .catch((err: PrismaClientKnownRequestError) => {
        res.end(err.message);
      });
  }
}
