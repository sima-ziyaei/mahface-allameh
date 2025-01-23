import axios from "axios";

export class CategoriesServices {
    
  static getAll() {
    return axios
      .get(process.env.BASE_URL + "/api/Categories/GetAll")
      .then((res) => {
        return res ?? null;
      });
  }

  static addCategory(body) {
    return axios
      .post(process.env.BASE_URL + "/api/Categories/AddCategory", body)
      .then((res) => {
        return res ?? null;
      });
  }

  static getById(id: number | string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Categories/GetById/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static deleteCategory(id: number | string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Categories/DeleteCategory/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static getTitles(){
    return axios
      .get(process.env.BASE_URL + "/api/Categories/GetAllTitleCategoriesAsync")
      .then((res) => {
        return res ?? null;
      });
  }
}
