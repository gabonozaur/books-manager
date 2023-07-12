import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await prismaClient.book
      .findMany({
        select: {
          name: true,
          author: true,
          id: true,
          categories: true,
        },
      })
      .then((data) => res.status(200).json(data))
      .catch((err: PrismaClientKnownRequestError) => {
        res.end(err.message);
      });
  }
}
