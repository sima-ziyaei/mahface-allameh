import { axiosInstance } from "@/pages/_app";
import axios from "axios";

export class CategoriesServices {
  static getAll() {
    return axiosInstance
      .get(process.env.BASE_URL + "/api/Categories/GetAll")
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static addCategory(body) {
    return axiosInstance
      .post(process.env.BASE_URL + "/api/Categories/AddCategory", body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getById(id: number | string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/api/Categories/GetById/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static deleteCategory(id: number | string) {
    return axiosInstance
      .delete(`${process.env.BASE_URL}/api/Categories/DeleteCategory/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getTitles() {
    return axiosInstance
      .get(process.env.BASE_URL + "/api/Categories/GetAllTitleCategoriesAsync")
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }
}
