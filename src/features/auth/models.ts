export type RegisterDTO = LoginDTO & {
  name: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type JWTDTO = {
  role: RoleDTO;
  email: string;
  name: string;
};

export type RoleDTO = "USER" | "ADMIN";

export type UseAuth = {
  decodedToken: JWTDTO;
  setDecodedToken: (value: JWTDTO) => void;
};
