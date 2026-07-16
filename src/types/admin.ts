export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  banned?: boolean;
  createdAt: string;
}
