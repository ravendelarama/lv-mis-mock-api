export interface User {
  id: string;
  googleId: string;
  hasPassword: boolean;
  password?: string;
  email: string;
  role: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
