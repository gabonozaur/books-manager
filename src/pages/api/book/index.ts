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
  if (req.method === "POST") {
    const { name, categories, authorId } = req.body as AddEditBookDTO;

    validateBackendFields<AddEditBookDTO>({
      data: req.body,
      res,
      shape: {
        name: yup.string().required("missing name"),
        authorId: yup.string().required("missing authorId"),
        categories: yup.array().required("missing categories"),
      },
      callback: async () => {
        checkApiAuthorisation({
          req,
          res,
          callback: async () => {
            await prismaClient.book
              .create({
                data: {
                  name,
                  author: {
                    connect: {
                      id: authorId,
                    },
                  },
                  categories: {
                    connect: categories.map((categ) => ({ id: categ })),
                  },
                },
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                },
              })
              .then((data) => res.status(204).json(data))
              .catch((err: PrismaClientKnownRequestError) => {
                console.log("err", err);
                res.status(500).end("Bad Req");
              });
          },
        });
      },
    });
  }
}
