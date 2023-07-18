import { encryptPassword } from "@/features/auth/encryptPassword";
import { JWTDTO, LoginDTO } from "@/features/auth/models";
import getEnvVariable from "@/utils/getEnvVariable";
import { accessTokenCookieKey } from "@/utils/handleCookies";
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
    if (user && user.password === encryptPassword(req.body) && user.confirmed) {
      let jwtSecretKey = getEnvVariable("JWT_Key");
      let data = {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      } as JWTDTO;

      const token = jwt.sign(data, jwtSecretKey);

      res.setHeader(
        "Set-Cookie",
        `${accessTokenCookieKey}=${token}; Path=/; HttpOnly`
      );

      res.json(data);
      return;
    }
    res.status(500).end("error");
    return;
  }
}
