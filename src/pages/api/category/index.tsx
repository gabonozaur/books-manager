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
    const name = req.body.name as string;

    validateBackendFields<{ name: string }>({
      data: req.body,
      res,
      shape: {
        name: yup.string().required("missing name"),
      },
      callback: async () => {
        checkApiAuthorisation({
          req,
          res,
          role: "ADMIN",
          callback: async () => {
            await prismaClient.category
              .create({
                data: {
                  name,
                },
                select: {
                  id: true,
                },
              })
              .then(() => res.status(204).end())
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
