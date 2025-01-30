import { axiosInstance, BASE_URL } from "@/pages/_app";

export class TeacherServices {
  static getAll() {
    return axiosInstance
      .get(BASE_URL + "/api/Users/getAll")
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static getById(id: number | string) {
    return axiosInstance
      .get(`${BASE_URL}/api/Users/getById/${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static getLastStatusForUser(id: number | string) {
    return axiosInstance
      .get(
        `${BASE_URL}/api/TeacherRequest/GetLastStatusForUser/${id}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  static getLastStatusForusers(id: number | string) {
    return axiosInstance
      .get(`${BASE_URL}/api/Users/getById/${id}`)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => console.error(err));
  }

  static getByUserId(id: number | string) {
    return axiosInstance
      .get(`${BASE_URL}/api/Users/getByUserId/${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static requestForTeaching(body) {
    return axiosInstance
      .post(`${BASE_URL}/api/TeacherRequest/CreateRequest`, body)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  static deleteUsers(id: number | string) {
    return axiosInstance
      .delete(`${BASE_URL}/api/Users/delete/${id}`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static createRequest(body: { userId: string; userDescription: string }) {
    return axiosInstance
      .delete(`${BASE_URL}/api/TeacherRequest/CreateRequest`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static approveRequest(requestId: string, adminId: string) {
    return axiosInstance
      .post(
        `${BASE_URL}/api/TeacherRequest/ApproveRequest/${requestId}?adminId=${adminId}`
      )
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static getAllRequests() {
    return axiosInstance
      .get(`${BASE_URL}/api/TeacherRequest/GetAllRequests`)
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }

  static rejectRequest(requestId: number | string) {
    return axiosInstance
      .delete(
        `${BASE_URL}/api/TeacherRequest/RejectRequest/${requestId}`
      )
      .then((res) => {
        return res ? res : [];
      })
      .catch((err) => console.error(err));
  }
}
