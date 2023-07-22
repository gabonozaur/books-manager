import AllAuthors from "@/features/authors";
import Book from "@/features/book";
import { BookDTO } from "@/features/book/models";
import { apiClient } from "@/utils/apiClient";
import { NameWithId } from "@/utils/models";
import { Grid, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

export default function Home(props: {
  books: BookDTO[];
  authors: NameWithId[];
}) {
  return (
    <>
      {props.books.length ? (
        <Grid templateColumns={"1fr 1fr 1fr"} gap="8px">
          {props.books.map((book) => (
            <Book {...book} key={book.id} />
          ))}
        </Grid>
      ) : (
        <Text>No books</Text>
      )}
      <AllAuthors authors={props?.authors} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [books, authors] = await Promise.all([
    apiClient
      .get("/api/book/all")
      .then((res) => res.data)
      .catch(null),
    apiClient
      .get("/api/author/all")
      .then((res) => res.data)
      .catch(null),
  ]);

  return { props: { books, authors } };
};
