import { NameWithId } from "@/utils/models";

export type BookDTO = NameWithId & {
  author: NameWithId;
  categories: NameWithId[];
};
