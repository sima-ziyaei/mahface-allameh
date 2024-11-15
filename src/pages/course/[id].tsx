import Layout from "@/components/Layout";
import { Course } from "@/models/course.model";
import axios from "axios";
import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import IconEye from "../../components/Icons/IconEye"

export async function getStaticPaths() {
  let courses = [];
  axios
    .get(`${process.env.BASE_URL}/api/Course/GetAllCourses`)
    .then((res) => res.data.map((el) => [courses.push(el.id)]));

  return { paths: courses, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { params } };
}

const CourseView = ({ params }) => {
  const [course, setCourse] = useState<Course>();
  const BASE_URL = process.env.BASE_URL;

  // const courseLevel = {
  //   1: 
  // }

  useEffect(() => {
    if (params) {
      axios
        .get(`${BASE_URL}/api/Course/GetById?id=${params?.id}`)
        .then((res) => {
          setCourse(res.data);
        });
    }
  }, [params]);
console.log(course)
  return (
    <Layout>
      <div className="p-4 bg-[#3d3d3d] flex justify-between relative">
        <div>
          <h1 className="text-white font-bold text-2xl">{course?.title}</h1>
          <p className="text-white mt-6">{course?.courseDescription} </p>

          <p className="text-white mt-4">{t["course-teacher"]} :</p>

          <div className="flex gap-6">
            <div className="flex gap-1">
               <IconEye className="stroke-white" />
            <p className="text-white"> {course?.view} </p>
            </div>
            <div className="felx gap-1">
              <img src={`/assets/chart-${course?.courseLevelId}.svg`} />
              <p></p>
            </div>
           
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-6 items-end absolute left-4 shadow-md">
          <img
            width={600}
            src={`data:image/png;base64,${course?.imageBase64}`}
          />
          <p className=" mt-4 ">{course?.cost} تومان</p>

          <button className="bg-[#B41474] py-3 px-6 rounded-xl text-white self-center">
            {" "}
            {t["add-to-card"]}{" "}
          </button>

          <p className="self-start"> {t["time-of-video"]} </p>
          <p className="self-start"> {t["infinite-access"]} </p>

        </div>
      </div>
    </Layout>
  );
};

export default CourseView;
