import Layout from "@/components/Layout";
import { Course } from "@/models/course.model";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CourseView = () => {
  const router = useRouter();
  const [course, setCourse] = useState<Course>();
  const id = router.query.id;
  const BASE_URL = process.env.BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/Courses/GetById?id=${id}`)
      .then((res) =>{ setCourse(res.data)
        console.log(res.data);
      });
  }, [id]);

  return (
    <Layout>
      <div className="p-4">
       <h1 className="text-cyan-700 font-bold text-center text-2xl"> {course?.title}</h1>
        <p className="text-cyan-600 text-center mt-6"> {course?.courseDescription} </p>
      </div>
    </Layout>
  );
};

export default CourseView;
