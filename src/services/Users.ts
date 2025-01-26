import axios from "axios";

export class UsersServices {
  static getAll() {
    return axios
      .get(process.env.BASE_URL + "/api/Users/getAll")
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static getById(id: number | string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Users/getById/${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static deleteUsers(id: number | string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Users/delete?id=${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }
}
