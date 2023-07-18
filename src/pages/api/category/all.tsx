import { checkApiAuthorisation } from "@/utils/checkApiAuthorisation";
import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    checkApiAuthorisation({
      req,
      res,
      callback: async () => {
        await prismaClient.category
          .findMany()
          .then((data) => res.status(200).json(data))
          .catch((err: PrismaClientKnownRequestError) => {
            res.end(err.message);
          });
      },
    });
  }
}
