import { checkApiAuthorisation } from "@/utils/checkApiAuthorisation";
import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const name = req.body.name as string;

    checkApiAuthorisation({
      req,
      res,
      role: "ADMIN",
      callback: async () => {
        await prismaClient.author
          .create({
            data: {
              name,
            },
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
            },
          })
          .then(() => res.status(204).end())
          .catch((err: PrismaClientKnownRequestError) => {
            console.log("err", err);
            res.status(500).end("Bad Req");
          });
      },
    });
  }
}
