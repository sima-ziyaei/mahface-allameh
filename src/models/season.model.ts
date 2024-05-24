import { Course } from "./course.model";

export interface Season {
  id: string;
  code: number;
  description?: string;
  createdUserID: string;
  createdDate: string;
  deletedUserID?: string;
  deletedDate?: string;
  isActive: boolean;
  isDeleted: boolean;
  courseId: string;
  course: Course
}
