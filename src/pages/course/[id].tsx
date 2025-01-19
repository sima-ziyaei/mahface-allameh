import Layout from "@/components/Layout";
import { Course } from "@/models/course.model";
import axios from "axios";
import { useEffect, useState } from "react";
import CourseContent from "@/components/course/CourseContent";
import CourseHeader from "@/components/course/CourseHeader";
import CourseSideBar from "@/components/course/CourseSideBar";
import CourseNavbar from "@/components/course/CourseNavbar";
import CourseComments from "@/components/course/CourseComments";

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

export enum NavbarState {
  Content= 'content',
  Comment = 'comment',
  About = 'about'
}

const CourseView = ({ params }) => {
  const [course, setCourse] = useState<Course>();
  const BASE_URL = process.env.BASE_URL;
  const [navbarState, setNavbarState] = useState<NavbarState>(NavbarState.Content)

console.log(course)

  useEffect(() => {
    if (params) {
      axios.get(`${BASE_URL}/GetById/${params?.id}`).then((res) => {
        setCourse(res.data);
      });
    }
  }, [params]);

  if(!course)
    return null;

  return (
    <Layout>
      <div className="flex">
        <div>
          <CourseHeader course={course} />
          <CourseNavbar setNavbarState={setNavbarState} navbarState={navbarState} />
          {navbarState === NavbarState.Content 
          ? <CourseContent course={course} />
        : navbarState === NavbarState.About
        ? <p> {course.description} </p> 
      : <CourseComments />}
         
        </div>
        <CourseSideBar course={course} />
      </div>
    </Layout>
  );
};

export default CourseView;
