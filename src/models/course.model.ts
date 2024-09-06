import { Category } from "./category.model";
import { Season } from "./season.model";
import { Student } from "./student.model";
import { Teacher } from "./teacher.model";

export interface Course {
  id: string;
  code: number;
  courseDescription?: string;
  createdUserID: string;
  createdDate: string;
  deletedUserID?: string;
  deletedDate?: string;
  isActive: boolean;
  isDeleted: boolean;
  title: string;
  courseLevelId: number;
  teacherId: string;
  categoryId: string;
  courseDesription: string;
  students: Student[],
  teacher: Teacher,
  seasons: Season[],
  category: Category,
  cost: number,
  imageBase64: string
}
