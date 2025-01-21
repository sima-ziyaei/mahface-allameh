import Layout from "@/components/layout/Layout";
import { Course } from "@/models/course.model";
import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import { Category } from "@/models/category.model";
import { CourseServices } from "@/services/Course";
import { CategoriesServices } from "@/services/Categories";

export async function getStaticPaths() {
  let catgegories = [];
  CategoriesServices.getAll()
    .then((res) => res.data.map((el) => [catgegories.push(el.id)]));

  return { paths: catgegories, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { params } };
}

const CourseView = ({ params }) => {
  const [catgegory, setCategory] = useState<Category>();
  // const [base64Image, setbase64Image] = useState<string>();
  const [courses, setCourses] = useState<Course[]>();

  useEffect(() => {
    if (params) {
        CategoriesServices.getById(params?.id)
        .then((res) => {
          setCategory(res.data);
          console.log(res.data);
        });

        CourseServices.getAll().then((res) => {
            const course = res.data.filter((el) => el.categoryId === params?.id);
            setCourses(course);
            // axios
            //       .get(`${BASE_URL}/api/Courses/ImageBase64/${res.data.id}`)
            //       .then((res) =>setbase64Image(res.data.base64Image));
          });
    }
  }, [params]);

  return (
    <Layout>
      <div className="p-4">
        <img />
      {courses?.map((course) => {
          return (
            <a  href={`/course/${course.id}`}
              className=" border border-solid border-gray-400 flex gap-4 rounded-2xl p-4 mb-4"
              key={course.id}
            >
              <img
                src={`data:image/png;base64,${course?.imageBase64}`}
                alt="course"
                className="w-[200px] h-[200px]"
              />
<div>
    <h1 className=" font-bold text-2xl"> {course?.title}</h1>
              <p className=" mt-6"> {course?.courseDescription} </p>

              <p className=" mt-4">{t["course-teacher"]} :</p>
              <p className=" mt-4">
                {t["course-cost"]} : {course?.cost} تومان
              </p>
</div>
              
            </a>
          );
        })}
      </div>
    </Layout>
  );
};

export default CourseView;
