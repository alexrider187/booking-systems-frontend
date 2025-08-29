export interface User {
  _id:string,
  fullName: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  message: string;
  _id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  token: string;
}
