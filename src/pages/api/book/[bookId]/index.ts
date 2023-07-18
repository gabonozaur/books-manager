import { AddEditBookDTO } from "@/features/book/edit/models";
import { checkApiAuthorisation } from "@/utils/checkApiAuthorisation";
import prismaClient from "@/utils/prismaClient";
import validateBackendFields from "@/utils/validateBackendFields";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

import * as yup from "yup";

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
    validateBackendFields<AddEditBookDTO & { bookId: string }>({
      data: { ...req.body, bookId },
      res,
      shape: {
        name: yup.string().required("missing name"),
        authorId: yup.string().required("missing authorId"),
        categories: yup.array().required("missing categories"),
        bookId: yup.string().required("missing book id"),
      },
      callback: async () => {
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
            try {
              await prismaClient.book.update({
                where: {
                  id: bookId,
                },
                data: {
                  name,
                  updatedAt: new Date(),
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
              });
              res.status(204).end();
              return;
            } catch (e) {
              res.status(500).end("Bad Req");
              return;
            }
          },
        });
      },
    });
  }
}
