import { Course } from "./course.model";

export interface Category {
  id: string;
  code: number;
  createdUserID: string;
  createdDate: string;
  deletedUserI?: string;
  deletedDate?: string;
  isActive: boolean;
  isDeleted: boolean;
  title?: string;
  description?: string;
  parentCategoryId?: string;
  orderNo?: number;
  courses: Course[]
}
