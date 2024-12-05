import axios from "axios";

export class HomeServices {

  static getUrls() {
    return axios.get(process.env.BASE_URL + "/api/Home/getUrls").then((res) => {
      return res ? res : [];
    });
  }

  static getUserInfo(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Home/getUserInfo?id=${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }
  
}
