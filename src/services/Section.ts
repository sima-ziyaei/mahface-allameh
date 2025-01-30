import { axiosInstance, BASE_URL } from "@/pages/_app";

export class SectionServices {
  static getAllByCourse(courseId) {
    return axiosInstance
      .get(
        `${BASE_URL}/api/Section/GetAllCourseSection/${courseId}`
      )
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getAllBySeason(seasonId) {
    return axiosInstance
      .get(
        `${BASE_URL}/api/Section/GetAllSeasonSection/${seasonId}`
      )
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static add(body) {
    return axiosInstance
      .post(`${BASE_URL}/api/Section/CreateSection`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static update(body, id) {
    return axiosInstance
      .put(`${BASE_URL}/api/Section/UpdateSection/${id}`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getById(id: string) {
    return axiosInstance
      .get(`${BASE_URL}/api/Section/GetSectionDetails/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static delete(id: string) {
    return axiosInstance
      .delete(`${BASE_URL}/api/Section/DeleteSection/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }
}
