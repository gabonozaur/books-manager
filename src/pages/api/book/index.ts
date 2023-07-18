import { AddEditBookDTO } from "@/features/book/edit/models";
import { checkApiAuthorisation } from "@/utils/checkApiAuthorisation";
import prismaClient from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

const validationSchema = yup
  .object()
  .shape<{ [key in keyof AddEditBookDTO]: yup.Schema<any> }>({
    authorId: yup.string().required("param issue"),
    categories: yup.array().min(1, "param issue"),
    name: yup.string().required("param issue"),
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, categories, authorId } = req.body as AddEditBookDTO;

    checkApiAuthorisation({
      req,
      res,
      callback: async () => {
        try {
          await validationSchema.validate(req.body, { strict: true });
        } catch (e) {
          res.status(500).end;
          return;
        }

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
                connect: categories.map((categ) => ({ id: categ + "  33" })),
              },
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
