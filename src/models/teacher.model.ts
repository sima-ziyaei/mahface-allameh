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
  user: User;
}

type Email = string;
type Links = string;
type Fields = "AI" | "Front" | "React";
export interface CreateTecherBody {
  teacherUserName: string;
  teachingFields: Fields[];
  experiences: string;
  certifications?: Links[];
  professionalEmail?: Email;
  requestDate:Date;
}

export type CreateTeacher = (body: CreateTecherBody) => void;
