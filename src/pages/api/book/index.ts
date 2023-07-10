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
    const authorId = req.body.authorId as string;
    checkApiAuthorisation({
      req,
      res,
      callback: async () => {
        await prismaClient.book
          .create({
            data: {
              name,
              authorId,
            },
            select: {
              id: true,
            },
          })
          .then((data) => res.status(204).json(data))
          .catch((err: PrismaClientKnownRequestError) => {
            console.log("err", err);
            res.status(500).end("Bad Req");
          });
      },
    });
  }
}
