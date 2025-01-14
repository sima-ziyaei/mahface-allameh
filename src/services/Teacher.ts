import axios from "axios";

export class TeacherServices {
  static getAll() {
    return axios.get(process.env.BASE_URL + "/api/Users/getAll").then((res) => {
      return res ? res : [];
    });
  }

  static getById(id: number | string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Users/getById/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }
  
  static deleteUsers(id: number | string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Users/delete/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }


}
