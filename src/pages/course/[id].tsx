import Layout from "@/components/layout/Layout";
import { Course } from "@/models/course.model";
import { useEffect, useState } from "react";
import CourseContent from "@/components/course/CourseContent";
import CourseHeader from "@/components/course/CourseHeader";
import CourseSideBar from "@/components/course/CourseSideBar";
import CourseNavbar from "@/components/course/CourseNavbar";
import CourseComments from "@/components/course/CourseComments";
import { CourseServices } from "@/services/Course";

export async function getStaticPaths() {
  try {
    const res = await CourseServices.getAll();
    const courses = res.data.map((el) => ({ params: { id: el.id.toString() } }));

    return { paths: courses, fallback: false };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  return { props: { params } };
}


export enum NavbarState {
  Content = "content",
  Comment = "comment",
  About = "about",
}

const CourseView = ({ params }) => {
  const [course, setCourse] = useState<Course>();
  const [navbarState, setNavbarState] = useState<NavbarState>(
    NavbarState.Content
  );

  console.log(course);

  useEffect(() => {
    if (params) {
      CourseServices.getById(params.id)
        .then((res) => {
          setCourse(res.data);
        })
        .catch((err) => { });
    }
  }, [params]);

  if (!course) return null;

  return (
    <Layout>
      <div className="flex mb-16">
        <div className="w-[-webkit-fill-available]">
          <CourseHeader course={course} />
          <CourseNavbar
            setNavbarState={setNavbarState}
            navbarState={navbarState}
          />
          {navbarState === NavbarState.Content ? (
            <CourseContent course={course} />
          ) : navbarState === NavbarState.About ? (
            <p className="leading-loose"> {course.description} </p>
          ) : (
            <CourseComments courseId={course.id} />
          )}
        </div>
        <CourseSideBar course={course} />
      </div>
    </Layout>
  );
};

export default CourseView;
