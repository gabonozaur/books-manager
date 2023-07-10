import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const authorId = req.body.authorId as string;
    const name = req.body.name as string;

    await prisma.book
      .create({
        data: {
          authorId,
          name,
        },
        select: {
          id: true,
        },
      })
      .then(() => res.end())
      .catch((err: PrismaClientKnownRequestError) => {
        res.end(err.message);
      });
  }
  if (req.method === "GET") {
    const bookId = req.query.bookId as string;
    console.log("book id is", bookId);
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        author: true,
      },
    });

    if (book) {
      res.end(JSON.stringify(book));
    } else {
      res.end("broken");
    }
  }
}
