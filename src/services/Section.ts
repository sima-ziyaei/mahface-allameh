import axios from "axios";

export class SectionServices {
  static getAll() {
    return axios.get(`${process.env.BASE_URL}/api/Sectio`).then((res) => {
      return res ? res : [];
    });
  }

  static add(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/Section`, body)
      .then((res) => {
        return res ? res : [];
      });
  }

  static update(body) {
    return axios
      .put(`${process.env.BASE_URL}/api/Section`, body)
      .then((res) => {
        return res ? res : [];
      });
  }

  static getById(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Section/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }

  static delete(id: string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Section/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }
}
