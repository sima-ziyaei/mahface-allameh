import { useEffect, useState } from "react";
import { Course } from "@/models/course.model";
import { CourseServices } from "@/services/Course";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>();

    useEffect(()=>{
        CourseServices.getAll().then((res) => {
            setCourses(res.data);
          }).catch((err) => {});;
    },[])
    return(<></>)
}

export default Courses;