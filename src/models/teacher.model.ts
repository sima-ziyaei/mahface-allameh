import { User } from "./user.model";

export interface Teacher {
  id: string;
  code: number;
  description?: string;
  createdUserID: string;
  createdDate: string;
  deletedUserID?: string;
  deletedDate?: string;
  isActive: boolean;
  isDeleted: boolean;
  userId: string;
  user: User
}
