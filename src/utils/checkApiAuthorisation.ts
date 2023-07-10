import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import getEnvVariable from "./getEnvVariable";
import prismaClient from "./prismaClient";
export const checkApiAuthorisation = async (props: {
  req: NextApiRequest;
  res: NextApiResponse;
  role?: "ADMIN" | "USER";
  callback?: () => void;
}) => {
  const { req, res, role, callback } = props;
  const token = req.headers.authorization?.split("Bearer ")?.[1];

  if (!token || !jwt.decode(token)) {
    res.status(403).end();
  }
  const decoded = jwt.verify(token, getEnvVariable("JWT_Key")) as JwtPayload;
  const userId = decoded.userId;
  if (!role) {
    callback?.();
  } else {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });
    if (user.role === role) {
      callback?.();
    } else {
      res.status(401).end();
    }
  }
};
