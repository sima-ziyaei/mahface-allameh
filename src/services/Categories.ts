import axios from "axios";

export class CategoriesServices {
    
  static getAll() {
    return axios
      .get(process.env.BASE_URL + "/api/categories/getAll")
      .then((res) => {
        return res ? res : [];
      });
  }

  static addCategory(body) {
    return axios
      .post(process.env.BASE_URL + "/api/categories/addCategory", body)
      .then((res) => {
        return res ? res : [];
      });
  }

  static getById(id: number | string) {
    return axios
      .get(`${process.env.BASE_URL}/api/categories/getById/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }

  static deleteCategory(id: number | string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/categories/isDeleted/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }
}
