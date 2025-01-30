import { axiosInstance } from "@/pages/_app";

export class SeasonServices {
  static getAll() {
    return axiosInstance
      .get(`${process.env.BASE_URL}/api/Season/getAllSeasons`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static getById(id: string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/api/Season/getById/${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static update(body) {
    return axiosInstance
      .put(`${process.env.BASE_URL}api/season/update`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static delete(id: string) {
    return axiosInstance
      .delete(`${process.env.BASE_URL}/api/Season/DeleteSeason/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAllByCourseId(courseId: string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/api/Season/getAllByCourseId/${courseId}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static add(body) {
    return axiosInstance
      .post(`${process.env.BASE_URL}/api/Season/addSeason`, body)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }
}
