import { encryptPassword } from "@/features/auth/encryptPassword";
import { RegisterDTO } from "@/features/auth/models";
import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name } = req.body as RegisterDTO;

    await prismaClient.user
      .create({
        data: {
          name,
          email,
          password: encryptPassword(req.body),
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      .then(() => res.end())
      .catch((err: PrismaClientKnownRequestError) => {
        res.end(err.message);
      });
  }
}
