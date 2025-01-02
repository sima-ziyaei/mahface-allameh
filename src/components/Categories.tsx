import { Category } from "@/models/category.model";
import { Course } from "@/models/course.model";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import t from "../../i18next/locales/fa/translation.json";

const Categories = () => {
  const BASE_URL = process.env.BASE_URL;
  const [courses, setCourses] = useState<Course[]>();
  const [allCourses, setAllCourses] = useState<Course[]>();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/Categories/GetAll`).then((res) => {
      setCategories(res.data);
    });
    axios.get(`${BASE_URL}/GetAllCourses`).then((res) => {
      setAllCourses(res.data);
    });
  }, []);

  const getCourses = (id) => {
    axios.get(`${BASE_URL}/GetAllCourses`).then((res) => {
      const course = res.data.filter((el) => el.categoryId === id);
      setCourses(course);
    });
  };
console.log(allCourses)
  return (
    <>
      <div className="flex gap-6 mt-6 mx-4">
        {categories?.map((el) => {
          return (
            <p
              onMouseEnter={() => getCourses(el.id)}
              onClick={() => router.push(`/category/${el.id}`)}
              key={el.id}
              className="cursor-pointer hover:text-cyan-700"
            >
              {el.title}
            </p>
          );
        })}
      </div>

      {courses?.length ? (
        <div className="flex gap-8 mt-6 bg-cyan-700 text-white p-4 justify-center mx-4">
          {courses?.map((el) => {
            return (
              <p
                onClick={() => router.push(`/course/${el.id}`)}
                className="cursor-pointer"
                key={el.id}
              >
                {el.title}
              </p>
            );
          })}
        </div>
      ) : null}

      <div className="container border border-solid mx-4 border-gray-200 rounded-2xl grid grid-cols-4 gap-6 p-6 mt-16 ">
        {allCourses?.map((course) => {
          return (
            <a
              href={`/course/${course.id}`}
              className="  border border-solid border-gray-400 rounded-2xl p-4"
              key={course.id}
            >
              <img
                src={`data:image/png;base64,${course.imageBase64}`}
                alt="course"
                className="w-[200px] h-[200px]"
              />

              <h1 className=" text-xl"> {course?.title}</h1>
              <p className=" mt-6 text-sm text-slate-700 overflow-hidden text-ellipsis line-clamp-3">
                {course?.courseDescription}{" "}
              </p>

              <p className=" mt-4 text-sm text-zinc-600">{t["course-teacher"]} : {course.teacherName}</p>
              {/* <p className=" mt-4">
                {t["course-cost"]} : {course?.cost} تومان
              </p> */}
              <div className="bg-[#F7E7F1] p-3 rounded-md mt-3 ">
                <p>{course?.cost} <span className="text-xs text-gray-500">  تومان </span></p>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
