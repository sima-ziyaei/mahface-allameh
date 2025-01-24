import { Course } from "@/models/course.model";
import { CourseServices } from "@/services/Course";
import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import { ImageServices } from "@/services/Image";
import { useRouter } from "next/router";

const UserCourses = () => {
  const userId = JSON.parse(localStorage.getItem("userInfo")).userId;
  const [userCourses, setUserCourses] = useState<Course[]>();
  const [images, setImages] = useState(new Map());
  const router = useRouter()

  useEffect(() => {
    CourseServices.getAllStudentCourses(userId).then((res) => {
      res.data.forEach((el) => {
        ImageServices.getImageByImageId(el.imageId).then((result) => {
          setImages((prev) => prev.set(el.id, result.data.base64File));
          setUserCourses(res.data);
        });
      });
    });
  }, []);

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl mb-6"> {t["my-courses"]} </h2>
      {userCourses?.map((course) => {
        return (
          <div
            className=" border border-solid border-gray-200 bg-white flex gap-4 rounded-2xl p-4 mb-4"
            key={course.id}
          >
            <img
              src={`data:image/png;base64,${images.get(course.id)}`}
              alt="course"
              className="w-[200px]"
            />

            <div>
              <h1 className=" font-bold text-2xl"> {course?.title}</h1>
              <p className=" mt-6"> {course?.courseDescription} </p>

              <p className=" mt-4">
                {t["course-teacher"]} : {course.teacherName}{" "}
              </p>
              <p className=" mt-4">
                {t["course-cost"]} : {course?.cost} تومان
              </p>
            </div>
            <div className="mr-auto mt-auto">
        <button onClick={() => router.push(`/course/${course.id}`)} className="bg-[#009CA7] hover:bg-[#1f848b] justify-between w-[210px] py-2 px-5 rounded-lg text-white self-center flex gap-2"> {t['continue']}  <img className="brightness-0 invert" src="/assets/icons/arrow-left copy.svg" /> </button>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCourses;
