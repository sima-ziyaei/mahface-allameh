import axios from "axios";

export class CourseServices {
  static getById(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/GetById/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAll() {
    return axios
      .get(`${process.env.BASE_URL}/GetAllCourses`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAllTeacherCourses(userId: string) {
    return axios
      .get(`${process.env.BASE_URL}/GetAllTeacherCourses/${userId}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static add(body) {
    return axios
      .post(`${process.env.BASE_URL}/AddCourse`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static delete(id: string) {
    return axios
      .delete(`${process.env.BASE_URL}/DeleteCourse/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getWithCategoryId(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/GetAllCoursesWithCategoryId/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static search(query: string) {
    return axios
      .get(`${process.env.BASE_URL}/GetAllCoursesWithSearch/${query}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static getTitleWithCategoryId(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/GetAllCoursesTitleWithCategoryId/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAllStudentCourses(userId: string) {
    return axios
      .get(`${process.env.BASE_URL}/GetAllStudentCourses/${userId}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static addStudentCourse(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/StudentCourse/AddMultiple`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static courseExistForUser(userId, courseId) {
    return axios
      .get(
        `${process.env.BASE_URL}/api/StudentCourse/HasExistForUser?courseId=${courseId}&userId=${userId}`
      )
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static isUserFavoriteCourse(userId, courseId) {
    return axios
      .get(
        `${process.env.BASE_URL}/api/StudentFavoriteCourse/HasExistForUser?courseId=${courseId}&userId=${userId}`
      )
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static addToFavorites(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/StudentFavoriteCourse/Add`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static deleteFromFavorites(userId, courseId) {
    return axios
      .delete(
        `${process.env.BASE_URL}/api/StudentFavoriteCourse/Delete/${courseId}/${userId}`
      )
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAllFavoriteCourses(userId) {
    return axios
      .get(`${process.env.BASE_URL}/GetAllStudentFavoritsCourses/${userId}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }
}
