import axios from "axios";

export class SeasonServices {
  static getAll() {
    return axios
      .get(`${process.env.BASE_URL}/api/Season/getAllSeasons`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static getById(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Season/getById/${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static delete(id: string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Season/DeleteSeason/${id}`)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => console.error(err));
  }

  static getAllByCourseId(courseId: string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Season/getAllByCourseId/${courseId}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static add(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/Season/addSeason`, body)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static update(body) {
    return axios
      .put(`${process.env.BASE_URL}/api/Season/update`, body)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }
}
