import { AddEditBookDTO } from "@/features/book/edit/models";
import { checkApiAuthorisation } from "@/utils/checkApiAuthorisation";
import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

import * as yup from "yup";

type UpdateBookDTOWithBookId = AddEditBookDTO & {
  bookId: string;
};

const validationSchema = yup
  .object()
  .shape<{ [key in keyof UpdateBookDTOWithBookId]: yup.Schema<any> }>({
    bookId: yup.string().required("param issue"),
    authorId: yup.string().required("param issue"),
    categories: yup.array().min(1, "param issue"),
    name: yup.string().required("param issue"),
  });

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

  if (req.method === "PUT") {
    const { categories, name, authorId } = req.body as AddEditBookDTO;
    const bookId = req.query["bookId"] as string;

    checkApiAuthorisation({
      req,
      res,
      callback: async () => {
        try {
          await validationSchema.validate(
            { ...req.body, bookId },
            { strict: true }
          );
        } catch (e) {
          res.status(500).end();
          return;
        }
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

          .then(() => res.status(204).end())
          .catch((err: PrismaClientKnownRequestError) => {
            console.log("err", err);
            res.status(500).end("Bad Req");
          });
      },
    });
  }
}
