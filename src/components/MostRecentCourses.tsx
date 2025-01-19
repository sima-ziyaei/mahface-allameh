import { Course } from "@/models/course.model";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import t from "../../i18next/locales/fa/translation.json";
import CourseCard from "./course/CourseCard";

const MostRecentCourses = () => {
    const [allCourses, setAllCourses] = useState<Course[]>();
    const BASE_URL = process.env.BASE_URL;

    useEffect(() => {
        axios.get(`${BASE_URL}/GetAllCourses`).then((res) => {
            setAllCourses(res.data);
        });
    }, []);

   const courses = allCourses?.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate)).slice(0, 10);

    return (<Swiper
        spaceBetween={16}
        modules={[Pagination]}
        pagination
        slidesPerView={'auto'}
        className="container !flex flex-col-reverse gap-4 border border-solid mx-4 border-gray-200 rounded-2xl !p-6 mt-16 ">

            <h3 className="text-xl"> {t['most-recent']}</h3>
        {courses?.map((course) => {
            return (
                <SwiperSlide className="!w-[350px] p-4 border border-solid rounded-2xl h-fit">
                   <CourseCard course={course} />
                </SwiperSlide>
            )
        })}

    </Swiper>)
}

export default MostRecentCourses;