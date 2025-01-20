import { Category } from "@/models/category.model";
import { Course } from "@/models/course.model";
import { CategoriesServices } from "@/services/Categories";
import { CourseServices } from "@/services/Course";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Swiper } from "swiper/react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Categories = ({allCourses}) => {
  const [courses, setCourses] = useState<Course[]>();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>();
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    setLoading(true);
    CategoriesServices.getAll().then((res) => {
      setCategories(res.data);
      setLoading(false)
    });
  }, []);

  const getCourses = (id) => {
    CourseServices.getAll().then((res) => {
      const course = res.data.filter((el) => el.categoryId === id);
      setCourses(course);
    });
  };
  console.log(allCourses)
  
  return (
    <>
      <div className="flex gap-6 mt-6 mx-4">
        {loading ? <Skeleton count={9} width={90} height={25} containerClassName="flex gap-4" className="block" />  : categories?.map((el) => {
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

      <div className="container border border-solid mx-auto border-gray-200 rounded-2xl grid grid-cols-4 gap-6 p-6 mt-16 ">

        <Swiper >
          
        </Swiper>
        {/* {allCourses?.map((course) => {
          return (
            <a
              href={`/course/${course.id}`}
              className="  border border-solid rounded-2xl p-4"
              key={course.id}
            >
              <img
                src={`data:image/png;base64,${course.imageBase64}`}
                alt="course"
                className=" h-[200px]"
              />

              <h1 className=" text-xl mt-4"> {course?.title}</h1>
              <p className=" mt-3 text-sm text-zinc-600">{t["course-teacher"]} : {course.teacherName}</p>

              <p className=" mt-6 text-sm text-slate-700 overflow-hidden text-ellipsis line-clamp-2">
                {course?.courseDescription}
              </p>
              <div className="flex gap-4 mt-6">
                <div className="flex gap-1">
                  <img src="/assets/icons/teacher.svg" width={16} />
                  <p className="text-sm text-zinc-600"> {course?.totalView} {t['student']} </p>
                </div>

                <div className="flex gap-1">
                  <img src="/assets/icons/star.svg" width={16} />
                  <p className="text-sm text-zinc-600"> {course?.starsNumber} </p>
                </div>
              </div>

              <div className="bg-[#F7E7F1] p-3 rounded-lg mt-3 flex justify-between items-center ">
                <p>{course?.cost} <span className="text-xs text-zinc-600">  تومان </span></p>
                <AddToCartButton course={course} />
              </div>
            </a>
          );
        })} */}
      </div>
    </>
  );
};

export default Categories;
