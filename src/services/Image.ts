import axios, { AxiosRequestConfig } from "axios";

export class ImageServices {
  static addImage(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/Image/AddImage`, body)
      .then((res) => {
        return res ?? null;
      });
  }

  static getImageByImageId(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Image/getByImageId/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static deleteImage(id:string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Image/DeleteImage/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static uploadByChoosingFile(formData, id) {
    return axios({
      method: "post",
      url: `${process.env.BASE_URL}/api/Image/DeleteImage/{id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      return res ?? null;
    });
  }
}
