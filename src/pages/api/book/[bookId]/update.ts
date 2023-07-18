import { checkApiAuthorisation } from "@/utils/checkApiAuthorisation";
import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { where } from "sequelize";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const name = req.body.name as string;
    const authorId = req.body.authorId as string;
    const categories = req.body.categories as string[];
    const bookId = req.query["bookId"] as string;

    checkApiAuthorisation({
      req,
      res,
      callback: async () => {
        const restOfcategories = await prismaClient.category.findMany({
          where: {
            book: {
              some: {
                id: bookId,
              },
            },
            id: {
              notIn: categories,
            },
          },
          select: {
            id: true,
          },
        });

        await prismaClient.book
          .update({
            where: {
              id: bookId,
            },
            data: {
              name,
              author: {
                connect: {
                  id: authorId,
                },
              },
              categories: {
                connect: categories.map((categ) => ({ id: categ })),
                disconnect: restOfcategories,
              },
            },
          })

          .then((data) => res.status(204).end())
          .catch((err: PrismaClientKnownRequestError) => {
            console.log("err", err);
            res.status(500).end("Bad Req");
          });
      },
    });
  }
}
