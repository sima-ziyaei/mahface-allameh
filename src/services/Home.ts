import { axiosInstance } from "@/pages/_app";

export class HomeServices {
  static getUrls() {
    return axiosInstance
      .get(process.env.BASE_URL + "/api/Home/getUrls")
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static getUserInfo(id: string) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/api/Home/getUserInfo?id=${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }
}
