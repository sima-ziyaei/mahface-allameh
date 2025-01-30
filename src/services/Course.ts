import { axiosInstance } from "@/pages/_app";

export class CourseServices {
  static getById(id: string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/GetById/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAll() {
    return axiosInstance
      .get(`${process.env.BASE_URL}/GetAllCourses`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static update(body, id) {
    return axiosInstance
      .put(`${process.env.BASE_URL}/updateCourse/${id}`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAllTeacherCourses(userId: string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/GetAllTeacherCourses/${userId}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static add(body) {
    return axiosInstance
      .post(`${process.env.BASE_URL}/AddCourse`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static delete(id: string) {
    return axiosInstance
      .delete(`${process.env.BASE_URL}/DeleteCourse/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getWithCategoryId(id: string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/GetAllCoursesWithCategoryId/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static search(query: string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/GetAllCoursesWithSearch/${query}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static getTitleWithCategoryId(id: string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/GetAllCoursesTitleWithCategoryId/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAllStudentCourses(userId: string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/GetAllStudentCourses/${userId}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static addStudentCourse(body) {
    return axiosInstance
      .post(`${process.env.BASE_URL}/api/StudentCourse/AddMultiple`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static courseExistForUser(userId, courseId) {
    return axiosInstance
      .get(
        `${process.env.BASE_URL}/api/StudentCourse/HasExistForUser?courseId=${courseId}&userId=${userId}`
      )
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static isUserFavoriteCourse(userId, courseId) {
    return axiosInstance
      .get(
        `${process.env.BASE_URL}/api/StudentFavoriteCourse/HasExistForUser?courseId=${courseId}&userId=${userId}`
      )
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static addToFavorites(body) {
    return axiosInstance
      .post(`${process.env.BASE_URL}/api/StudentFavoriteCourse/Add`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static deleteFromFavorites(userId, courseId) {
    return axiosInstance
      .delete(
        `${process.env.BASE_URL}/api/StudentFavoriteCourse/Delete/${courseId}/${userId}`
      )
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAllFavoriteCourses(userId) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/GetAllStudentFavoritsCourses/${userId}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }
}
