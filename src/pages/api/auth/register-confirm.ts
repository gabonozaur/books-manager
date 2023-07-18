import { RegisterConfirmDTO } from "@/app/models";
import { encryptPassword } from "@/features/auth/encryptPassword";
import { RegisterDTO } from "@/features/auth/models";
import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { email, confirmString } = req.query as RegisterConfirmDTO;
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (user.confirmString !== confirmString) {
      res.status(500).end();
      return;
    }

    await prismaClient.user
      .update({
        where: {
          email,
        },
        data: {
          confirmed: true,
        },
      })
      .then(() => {
        res.end();
      })
      .catch((err: PrismaClientKnownRequestError) => {
        res.end(err.message);
      });
  }
}
