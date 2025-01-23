import axios from "axios";

export class CommentServices {
  static getByCourseId(id: string) {
    return axios
      .get(`${process.env.BASE_URL}/api/Comment/course/${id}`)
      .then((res) => {
        return res ?? null;
      });
  }

  static add(body) {
    return axios
      .post(`${process.env.BASE_URL}/api/Comment`, body)
      .then((res) => {
        return res ?? null;
      });
  }

}
