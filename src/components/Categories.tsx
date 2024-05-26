import { Category } from "@/models/category.model";
import { Course } from "@/models/course.model";
import axios from "axios";
import { useEffect, useState } from "react";

const Categories = () => {
  const BASE_URL = process.env.BASE_URL;
  const [courses, setCourses] = useState<Course[]>();

  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/Categories/GetAll`).then((res) => {
      setCategories(res.data);
    });
  }, []);
  const getCourses = (id) => {
    axios.get(`${BASE_URL}/api/Courses/GetAllCourses`).then((res) => {
      const course = res.data.filter((el) => el.categoryId === id);
      console.log(course, res.data);
      setCourses(course);
    });
  };

  return (
    <>
      <div className="flex gap-6 mt-6">
        {categories?.map((el) => {
          return (
            <p onClick={() => getCourses(el.id)} key={el.id}>
              {el.title}
            </p>
          );
        })}
      </div>

      {courses.length ? (
        <div className="flex gap-8 mt-6 bg-cyan-700 text-white p-4 justify-center">
          {" "}
          {courses?.map((el) => {
            return <p key={el.id}>{el.title}</p>;
          })}
        </div>
      ) : null}
    </>
  );
};

export default Categories;
