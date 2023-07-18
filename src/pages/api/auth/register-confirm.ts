import { RegisterConfirmDTO } from "@/app/models";

import prismaClient from "@/utils/prismaClient";
import validateBackendFields from "@/utils/validateBackendFields";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    validateBackendFields<RegisterConfirmDTO>({
      res,
      data: req.query as RegisterConfirmDTO,
      shape: {
        email: yup.string().required("missing email"),
        confirmString: yup.string().required("missing confirm string"),
      },
      callback: async () => {
        const { email, confirmString } = req.query as RegisterConfirmDTO;
        const user = await prismaClient.user.findFirst({
          where: {
            email,
          },
        });

        if (user.confirmString !== confirmString) {
          res.status(500).end("data issue");
          return;
        }

        try {
          await prismaClient.user.update({
            where: {
              email,
            },
            data: {
              confirmed: true,
            },
          });
          res.status(204).end();
          return;
        } catch (e) {
          res.status(500).end("error update");
        }
      },
    });
  }
}
