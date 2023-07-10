import { encryptPassword } from "@/pages/features/auth/encryptPassword";
import { LoginDTO } from "@/pages/features/auth/models";
import getEnvVariable from "@/utils/getEnvVariable";
import prismaClient from "@/utils/prismaClient";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body as LoginDTO;

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (user && user.password === encryptPassword(req.body)) {
      let jwtSecretKey = getEnvVariable("JWT_Key");
      let data = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(data, jwtSecretKey);

      res.end(JSON.stringify({ token }));
    }
    res.end("error");
  }
}
