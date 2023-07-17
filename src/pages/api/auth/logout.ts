import { accessTokenCookieKey } from "@/utils/handleCookies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const token = req.cookies[accessTokenCookieKey];

    res.setHeader(
      "Set-Cookie",
      `${accessTokenCookieKey}=${token}; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"`
    );
    res.end("error");
  }
}
