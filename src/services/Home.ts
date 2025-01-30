import { axiosInstance, BASE_URL } from "@/pages/_app";

export class HomeServices {
  static getUrls() {
    return axiosInstance
      .get(BASE_URL + "/api/Home/getUrls")
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static getUserInfo(id: string) {
    return axiosInstance
      .get(`${BASE_URL}/api/Home/getUserInfo?id=${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }
}
