import { axiosInstance } from "@/pages/_app";

export class UsersServices {
  static getAll() {
    return axiosInstance
      .get(process.env.BASE_URL + "/api/Users/getAll")
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static getById(id: number | string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/api/Users/getById/${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static deleteUsers(id: number | string) {
    return axiosInstance
      .delete(`${process.env.BASE_URL}/api/Users/delete/${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }
}
