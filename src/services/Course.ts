import axios from "axios";

export class CourseServices {
  static getById(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/GetById/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static getAll() {
    return axios
      .get(`${process.env.BASE_URL}/GetAllCourses`)
      .then((res) => {
        return res ?? null;
      });
  }

  static add(body) {
    return axios
      .post(`${process.env.BASE_URL}/AddCourse`, body)
      .then((res) => {
        return res ?? null;
      });
  }

  static delete(id:string) {
    return axios
      .delete(`${process.env.BASE_URL}/DeleteCourse/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static getWithCategoryId(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/GetAllCoursesWithCategoryId/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static search(query: string) {
    return axios.get(`${process.env.BASE_URL}/GetAllCoursesWithSearch/${query}`)
    .then((res)=>{
      return res ?? null;
    })
  }

  static getTitleWithCategoryId(id: string){
    return axios
      .get(`${process.env.BASE_URL}/GetAllCoursesTitleWithCategoryId/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static getAllStudentCourses(userId: string){
    return axios
    .get(`${process.env.BASE_URL}/GetAllStudentCourses/${userId}`)
    .then((res) => {
      return res ?? null;
    });
  }
}
