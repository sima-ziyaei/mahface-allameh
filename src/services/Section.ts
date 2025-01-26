import axios from "axios";

export class SectionServices {
  static getAllByCourse(courseId) {
    return axios.get(`${process.env.BASE_URL}/api/Section/GetAllCourseSection/${courseId}`).then((res) => {
      return res ?? null;
    });
  }

  static getAllBySeason(seasonId) {
    return axios.get(`${process.env.BASE_URL}/api/Section/GetAllSeasonSection/${seasonId}`).then((res) => {
      return res ?? null;
    });
  }

  static add(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/Section/CreateSection`, body)
      .then((res) => {
        return res ?? null;
      });
  }

  static update(body, id) {
    return axios
      .put(`${process.env.BASE_URL}/api/Section/UpdateSection/${id}`, body)
      .then((res) => {
        return res ?? null;
      });
  }

  static getById(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Section/GetSectionDetails/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static delete(id: string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Section/DeleteSection/${id}`)
      .then((res) => {
        return res?.data;
      });
  }
}
