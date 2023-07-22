import Book from "@/features/book";
import { BookDTO } from "@/features/book/models";
import { apiClient } from "@/utils/apiClient";
import { Grid, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

export default function AuthorPage(props: { books: BookDTO[] }) {
  return props.books.length ? (
    <Grid templateColumns={"1fr 1fr 1fr"} gap="8px">
      {props.books.map((book) => (
        <Book {...book} key={book.id} />
      ))}
    </Grid>
  ) : (
    <Text>No books</Text>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const books = await apiClient
    .get(`/api/book/author/${ctx.query["authorId"]}`)
    .then((res) => res.data)
    .catch(null);

  return { props: { books } };
};
