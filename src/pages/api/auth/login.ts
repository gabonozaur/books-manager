import { encryptPassword } from "@/pages/features/auth/encryptPassword";
import { LoginDTO } from "@/pages/features/auth/models";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import getEnvVariable from "@/pages/utils/getEnvVariable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body as LoginDTO;
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && user.password === encryptPassword(req.body)) {
      let jwtSecretKey = getEnvVariable("JWT_Key");
      let data = {
        userId: user.id,
        email: user.email,
      };

      const token = jwt.sign(data, jwtSecretKey);

      res.end(JSON.stringify({ token }));
    }
    res.end("error");
  }
}
