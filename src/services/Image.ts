import axios, { AxiosRequestConfig } from "axios";

export class ImageServices {
  static addImage(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/Image/AddImage`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getImageByImageId(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Image/getByImageId?id=${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static deleteImage(id: string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Image/DeleteImage?id=${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static uploadByChoosingFile(formData, id) {
    return axios({
      method: "post",
      url: `${process.env.BASE_URL}/api/Image/DeleteImage?id=${id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }
}
