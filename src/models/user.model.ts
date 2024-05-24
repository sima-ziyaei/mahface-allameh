import { Course } from "./course.model";

export interface User {
  id: string;
  userName?: string;
  normalizedUserName?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed: boolean;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  isSystemAccount: boolean;
  isSystemAdmin: boolean;
  isStudent: boolean;
  isTeacher: boolean;
  courses: Course[]
}
