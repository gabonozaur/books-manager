import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookId = req.query["bookId"] as string;
  if (req.method === "GET" && bookId) {
    await prismaClient.book
      .findFirst({
        select: {
          name: true,
          authorId: true,
          id: true,
          categories: {
            select: {
              id: true,
            },
          },
        },

        where: { id: bookId },
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err: PrismaClientKnownRequestError) => {
        res.end(err.message);
      });
  }
}
