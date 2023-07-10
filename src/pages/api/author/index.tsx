import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const name = req.body.name as string;
    const prisma = new PrismaClient();

    await prisma.author
      .create({
        data: {
          name,
        },
        select: {
          id: true,
        },
      })
      .then(() => res.end())
      .catch((err: PrismaClientKnownRequestError) => {
        res.end(err.message);
      });
  }
}
