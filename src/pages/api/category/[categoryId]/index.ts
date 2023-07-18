import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const categoryId = req.query["categoryId"] as string;
  if (req.method === "GET" && categoryId) {
    await prismaClient.category
      .findFirst({
        select: {
          name: true,
          id: true,
          book: true,
        },

        where: { id: categoryId },
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err: PrismaClientKnownRequestError) => {
        res.end(err.message);
      });
  }
}
