import axios from "axios";

export class CourseServices {
  static getById(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Course/getById/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }

  static getAll() {
    return axios
      .get(`${process.env.BASE_URL}/api/Course/getAllCourses`)
      .then((res) => {
        return res ? res : [];
      });
  }

  static add(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/Course/addCourse`, body)
      .then((res) => {
        return res ? res : [];
      });
  }

  static delete(id:string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Course/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }
}
