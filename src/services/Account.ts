import { axiosInstance } from "@/pages/_app";

export class AccountServices {
  static register(body) {
    return axiosInstance
      .post(process.env.BASE_URL + "/api/Account/Register", body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static editProfile(body) {
    return axiosInstance
      .post(process.env.BASE_URL + "/api/Account/EditProfile", body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static getEditProfile(id) {
    return axiosInstance
      .get(`${process.env.BASE_URL}/api/Account/EditProfile?userId=${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static login(body) {
    return axiosInstance
      .post(process.env.BASE_URL + "/api/Account/Login", body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static generateOtp(body) {
    return axiosInstance
      .post(process.env.BASE_URL + "/api/Account/GenerateOtp", body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static checkOtp(userId, otp) {
    return axiosInstance
      .post(
        `${process.env.BASE_URL}/api/Account/checkOtp?userId=${userId}&otp=${otp}`,
        {}
      )
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }
}
