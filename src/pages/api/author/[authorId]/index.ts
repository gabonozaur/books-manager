import { checkApiAuthorisation } from "@/utils/checkApiAuthorisation";
import prismaClient from "@/utils/prismaClient";
import validateBackendFields from "@/utils/validateBackendFields";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const name = req.body.name as string;
    const authorId = req.query["authorId"] as string;

    validateBackendFields<{ name: string; authorId: string }>({
      data: { name, authorId },
      res,
      shape: {
        name: yup.string().required("missing name"),
        authorId: yup.string().required("missing author id"),
      },
      callback: async () => {
        checkApiAuthorisation({
          req,
          res,
          role: "ADMIN",
          callback: async () => {
            try {
              await prismaClient.author.update({
                where: {
                  id: authorId,
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
