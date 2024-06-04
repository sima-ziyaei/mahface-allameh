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
  const [base64Image, setbase64Image] = useState<string>();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/Categories/GetAll`).then((res) => {
      setCategories(res.data);
    });
    axios.get(`${BASE_URL}/api/Courses/GetAllCourses`).then((res) => {
      setAllCourses(res.data);
    });
  }, []);

  const getCourses = (id) => {
    axios.get(`${BASE_URL}/api/Courses/GetAllCourses`).then((res) => {
      const course = res.data.filter((el) => el.categoryId === id);
      setCourses(course);
      // axios
      //       .get(`${BASE_URL}/api/Courses/ImageBase64/${res.data.id}`)
      //       .then((res) =>setbase64Image(res.data.base64Image));
    });
  };

  return (
    <>
      <div className="flex gap-6 mt-6">
        {categories?.map((el) => {
          return (
            <p
              onClick={() => getCourses(el.id)}
              key={el.id}
              className="cursor-pointer hover:text-cyan-700"
            >
              {el.title}
            </p>
          );
        })}
      </div>

      {courses?.length ? (
        <div className="flex gap-8 mt-6 bg-cyan-700 text-white p-4 justify-center">
          {" "}
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

      <div className="container border border-solid border-gray-500 rounded-2xl grid grid-cols-4 gap-6 p-6 mt-6 ">
        {allCourses?.map((course) => {
          return (
            <div
              className="  border border-solid border-gray-400 rounded-2xl p-4"
              key={course.id}
            >
              <img
                src={`data:image/png;base64,${base64Image}`}
                alt="course"
                className="w-[200px] h-[200px]"
              />

              <h1 className=" font-bold text-2xl"> {course?.title}</h1>
              <p className=" mt-6"> {course?.courseDescription} </p>

              <p className=" mt-4">{t["course-teacher"]} :</p>
              <p className=" mt-4">
                {t["course-cost"]} : {course?.cost} تومان
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
