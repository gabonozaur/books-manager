import { AddEditBookDTO } from "@/features/book/edit/models";
import { checkApiAuthorisation } from "@/utils/checkApiAuthorisation";
import prismaClient from "@/utils/prismaClient";
import validateBackendFields from "@/utils/validateBackendFields";
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
            try {
              const data = await prismaClient.book.create({
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
              });
              res.status(204).json(data);
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
