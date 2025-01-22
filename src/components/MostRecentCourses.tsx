import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import t from "../../i18next/locales/fa/translation.json";
import CourseCard from "./course/CourseCard";
import CourseCardSkeleton from "./course/CourseCardSkeleton";

const MostRecentCourses = ({ allCourses, loading }) => {

    const courses = allCourses?.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate)).slice(0, 10);

    return (<Swiper
        spaceBetween={16}
        modules={[Pagination]}
        pagination
        slidesPerView={'auto'}
        className="container !flex flex-col-reverse gap-4 border bg-white !pb-10 border-solid mx-4 border-gray-200 rounded-2xl !p-6 mt-16 ">

        <h3 className="text-xl"> {t['most-recent']}</h3>
        {loading
            ? Array.from(Array(10)).map((el, i) => {
                return (
                    <SwiperSlide key={i} className="!w-[350px] p-4 border border-solid rounded-2xl !h-auto">
                        <CourseCardSkeleton />
                    </SwiperSlide>
                )
            })
            : courses?.map((course) => {
                return (
                    <SwiperSlide key={course.id} className="!w-[350px] p-4 border border-solid rounded-2xl !h-auto">
                        <CourseCard course={course} />
                    </SwiperSlide>
                )
            })}

    </Swiper>)
}

export default MostRecentCourses;