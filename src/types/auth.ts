export interface User {
  id: string;
  _id:string,
  fullName: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  message: string;
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  token: string;
}
