import axios from "axios";

export class TeacherServices {
  static getAll() {
    return axios.get(process.env.BASE_URL + "/api/Users/getAll").then((res) => {
      return res ? res : [];
    });
  }

  static getById(id: number | string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Users/getById/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }

  static getLastStatusForUser(id: number | string) {
    return axios
      .get(
        `${process.env.BASE_URL}/api/TeacherRequest/GetLastStatusForUser/${id}`
      )
      .then((res) => {
        return res.data;
      });
  }

  static getLastStatusForusers(id: number | string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Users/getById/${id}`)
      .then((res) => {
        return res?.data;
      });
  }

  static getByUserId(id: number | string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Users/getByUserId/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }

  static requestForTeaching(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/TeacherRequest/CreateRequest`, body)
      .then((res) => {
        return res.data;
      });
  }

  static deleteUsers(id: number | string) {
    return axios
      .delete(`${process.env.BASE_URL}/api/Users/delete/${id}`)
      .then((res) => {
        return res ? res : [];
      });
  }

  static createRequest(body: { userId: string; userDescription: string }) {
    return axios
      .delete(`${process.env.BASE_URL}/api/TeacherRequest/CreateRequest`)
      .then((res) => {
        return res ? res : [];
      });
  }

  static approveRequest(requestId: string, adminId: srting) {
    return axios
      .post(
        `${process.env.BASE_URL}/api/TeacherRequest/ApproveRequest/${requestId}?adminId=${adminId}`
      )
      .then((res) => {
        return res ? res : [];
      });
  }

  static getAllRequests() {
    return axios
      .get(`${process.env.BASE_URL}/api/TeacherRequest/GetAllRequests`)
      .then((res) => {
        return res ? res : [];
      });
  }

  static rejectRequest(requestId: number | string) {
    return axios
      .delete(
        `${process.env.BASE_URL}/api/TeacherRequest/RejectRequest/${requestId}`
      )
      .then((res) => {
        return res ? res : [];
      });
  }
}
