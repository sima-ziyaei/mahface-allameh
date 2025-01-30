import { axiosInstance, BASE_URL } from "@/pages/_app";

export class CommentServices {
  static getByCourseId(id: string) {
    return axiosInstance
      .get(`${BASE_URL}/api/Comment/course/${id}`)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }

  static add(body) {
    return axiosInstance
      .post(`${BASE_URL}/api/Comment`, body)
      .then((res) => {
        return res ?? null;
      })
      .catch((err) => console.error(err));
  }
}
