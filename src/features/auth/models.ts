export type RegisterDTO = LoginDTO & {
  name: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};
