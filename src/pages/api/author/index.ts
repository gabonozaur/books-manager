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
            try {
              await prismaClient.author.create({
                data: {
                  name,
                },
                select: {
                  id: true,
                  createdAt: true,
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
