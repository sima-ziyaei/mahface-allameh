import Layout from "@/components/Layout";
import { Course } from "@/models/course.model";
import axios from "axios";
import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import IconEye from "../../components/Icons/IconEye";
import CourseContent from "@/components/CouseContent";

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

  const courseLevel = {
    1: "مقدماتی",
    2: "متوسط",
    3: "پیشرفته",
  };

  useEffect(() => {
    if (params) {
      axios.get(`${BASE_URL}/GetById/${params?.id}`).then((res) => {
        setCourse(res.data);
      });
    }
  }, [params]);
  console.log(course);
  return (
    <Layout>
      <div className="flex">
        <div>
          <div className="p-4 bg-[#3d3d3d] flex justify-between relative">
            <div>
              <h1 className="text-white font-bold text-2xl">{course?.title}</h1>
              <p className="text-white mt-6 w-[93%]">
                {course?.courseDescription}{" "}
              </p>

              <p className="text-white mt-4 mb-5">
                {t["course-teacher"]} : {course?.teacherName}
              </p>

              <div className="flex gap-6">
                <div className="flex gap-2">
                  <IconEye className="stroke-white" />
                  <p className="text-white"> {course?.view} </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex">
                    {Array.from(Array(course?.starsNumber)).map((x) => (
                      <img src="/assets/icons/star.svg" />
                    ))}
                    {Array.from(Array(5- course?.starsNumber)).map((x) => (
                      <img src="/assets/icons/star.svg" />
                    ))}
                  </div>
                  <p className="text-white">
                    {" "}
                    {course?.starsNumber} {t["score"]}
                  </p>
                </div>
                <div className="flex gap-2">
                  <img
                    src={`/assets/icons/chart-${course?.courseLevelId}.svg`}
                  />
                  <p className="text-white">
                    {" "}
                    {courseLevel[course?.courseLevelId]}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <CourseContent course={course} />
        </div>
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-6 items-end absolute m-4 left-4 shadow-md">
          <img
            width={600}
            src={`data:image/png;base64,${course?.imageBase64}`}
          />
          <p className=" mt-4 ">{course?.cost} تومان</p>

          <button className="bg-[#B41474] py-3 px-6 rounded-xl text-white self-center">
            {" "}
            {t["add-to-card"]}{" "}
          </button>

          <p className="self-start flex gap-2">
            {" "}
            <img src="/assets/icons/play-circle.svg" /> {t["time-of-video"]}{" "}
          </p>
          <p className="self-start flex gap-2">
            {" "}
            <img src="/assets/icons/unlimited.svg" /> {t["infinite-access"]}{" "}
          </p>
          <p className="self-start flex gap-2">
            {" "}
            <img src="/assets/icons/download.svg" />{" "}
            {t["ability-to-download-videos"]}{" "}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default CourseView;
