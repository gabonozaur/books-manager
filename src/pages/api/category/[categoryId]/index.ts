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

    return;
  }

  if (req.method === "PUT") {
    const name = req.body.name as string;
    const categoryId = req.query["categoryId"] as string;

    validateBackendFields<{ name: string; categoryId: string }>({
      data: { name, categoryId },
      res,
      shape: {
        name: yup.string().required("missing name"),
        categoryId: yup.string().required("missing category id"),
      },
      callback: async () => {
        checkApiAuthorisation({
          req,
          res,
          role: "ADMIN",
          callback: async () => {
            try {
              await prismaClient.category.update({
                where: {
                  id: categoryId,
                },
                data: {
                  name,
                },
                select: {
                  updatedAt: true,
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
