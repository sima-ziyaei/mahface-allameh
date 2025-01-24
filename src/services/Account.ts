import axios from "axios";

export class AccountServices {
  static register(body) {
    return axios
      .post(process.env.BASE_URL + "/api/Account/Register", body)
      .then((res) => {
        return res ?? null;
      });
  }

  static editProfile(body) {
    return axios
      .post(process.env.BASE_URL + "/api/Account/EditProfile", body)
      .then((res) => {
        return res ?? null;
      });
  }

  static login(body) {
    return axios
      .post(process.env.BASE_URL + "/api/Account/Login", body)
      .then((res) => {
        return res ?? null;
      });
  }

  static generateOtp(body) {
    return axios
      .post(process.env.BASE_URL + "/api/Account/GenerateOtp", body)
      .then((res) => {
        return res ?? null;
      });
  }

  static checkOtp(userId, otp) {
    return axios
      .post(
        `${process.env.BASE_URL}/api/Account/checkOtp?userId=${userId}&otp=${otp}`,{}
      )
      .then((res) => {
        return res ?? null;
      });
  }
}
