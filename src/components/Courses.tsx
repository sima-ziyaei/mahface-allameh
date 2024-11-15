import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "@/models/course.model";

const Courses = () => {
  const BASE_URL = process.env.BASE_URL;
  const [courses, setCourses] = useState<Course[]>();

    useEffect(()=>{
        axios.get(`${BASE_URL}/api/Course/GetAllCourses`).then((res) => {
            setCourses(res.data);
          });
    },[])
    return(<></>)
}

export default Courses;