import Layout from "@/components/Layout";
import { Course } from "@/models/course.model";
import axios from "axios";
import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";

export async function getStaticPaths() {
  let courses = [];
  axios
    .get(`${process.env.BASE_URL}/api/Courses/GetAllCourses`)
    .then((res) => res.data.map((el) => [courses.push(el.id)]));

  return { paths: courses, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { params } };
}

const CourseView = ({ params }) => {
  const [course, setCourse] = useState<Course>();
  const BASE_URL = process.env.BASE_URL;
  const [base64Image, setbase64Image] = useState<string>();

  useEffect(() => {
    if (params) {
      axios
        .get(`${BASE_URL}/api/Courses/GetById?id=${params?.id}`)
        .then((res) => {
          setCourse(res.data);
          console.log(res.data);
          axios
            .get(`${BASE_URL}/api/Courses/ImageBase64/${res.data.id}`)
            .then((res) =>setbase64Image(res.data.base64Image));
        });
    }
  }, [params]);

  return (
    <Layout>
      <div className="p-4 bg-[#3d3d3d]">
        <h1 className="text-white font-bold text-2xl">
          {" "}
          {course?.title}
        </h1>
        <p className="text-white mt-6">
          {" "}
          {course?.courseDescription}{" "}
        </p>

        <p className="text-white mt-4">
          {t['course-teacher']} : 
        </p>
        <p className="text-white mt-4"> 
         {t["course-cost"]} : {course?.cost} تومان
        </p>
        <img src={`data:image/png;base64,${base64Image}`} />
      </div>
    </Layout>
  );
};

export default CourseView;
