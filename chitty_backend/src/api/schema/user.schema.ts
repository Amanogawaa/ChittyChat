export interface CreateUser {
  email: string;
  password: string;
  name: string;
  gender: string;
}

export interface Login {
  email: string;
  password: string;
}
