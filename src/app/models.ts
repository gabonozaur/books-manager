export type AppContextProps = {
  bookToUpdate: string | null;
  setBookToUpdate: (val: string | null) => void;
};

export type RegisterConfirmDTO = {
  email: string;
  confirmString: string;
};
