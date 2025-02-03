import { axiosInstance, BASE_URL } from "@/pages/_app";

export class ImageServices {
  static addImage(body) {
    return axiosInstance
      .post(`${BASE_URL}/api/Image/AddImage`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getImageByImageId(id: string) {
    return axiosInstance
      .get(`${BASE_URL}/api/Image/getByImageId?id=${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static deleteImage(id: string) {
    return axiosInstance
      .delete(`${BASE_URL}/api/Image/DeleteImage/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static uploadByChoosingFile(formData, id) {
    return axiosInstance({
      method: "post",
      url: `${BASE_URL}/api/Image/DeleteImage/{id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }
}
