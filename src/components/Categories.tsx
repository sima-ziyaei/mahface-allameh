import { Category } from "@/models/category.model";
import { Course } from "@/models/course.model";
import { CategoriesServices } from "@/services/Categories";
import { CourseServices } from "@/services/Course";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'react-loading-skeleton/dist/skeleton.css'
import CourseCard from "./course/CourseCard";
import { Pagination } from "swiper/modules";
import CourseCardSkeleton from "./course/CourseCardSkeleton";
import Skeleton from "react-loading-skeleton";

const Categories = ({ allCourses }) => {
  const [categories, setCategories] = useState<Category[]>();
  const [loading, setLoading] = useState<boolean>();
  const [categoryLoading, setCategoryLoading] = useState<boolean>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [selectedCategoryCourses, setSelectedCategoryCourses] = useState<Course[]>();

  useEffect(() => {
    setCategoryLoading(true);
    CategoriesServices.getAll().then((res) => {
      setCategories(res.data);
      setSelectedCategoryId(res.data[0].id);
      setCategoryLoading(false);
    });
  }, []);
  
  const getSelectedCategory = (id) => {
    setLoading(true);
    CourseServices.getWithCategoryId(id).then((res) => {
      setSelectedCategoryCourses(res.data);
      setLoading(false);
    })
  }


  useEffect(()=>{
    if(selectedCategoryId)
      getSelectedCategory(selectedCategoryId);
  }, [selectedCategoryId]);

  console.log(allCourses)

  return (
    <>
      {/* <div className="flex gap-6 mt-6 mx-4">
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
      ) : null} */}

      <div className="container border border-solid flex flex-col mx-auto border-gray-200 rounded-2xl gap-6 p-6 mt-16 ">
        <div className="flex w-max h-fit">
          {categoryLoading
          ?  <Skeleton count={9} width={90} height={25} containerClassName="flex gap-4" className="block" />  
          : categories?.map((el) => {
            return (
              <p onClick={() => { setSelectedCategoryId(el.id); getSelectedCategory(el.id); }} className={` ${selectedCategoryId === el.id? 'border-[#009CA7]': ' border-gray-300'} cursor-pointer border-b-2 border-solid p-4`}> {el.title} </p>
            )
          })}
        </div>
        <Swiper spaceBetween={16}
          modules={[Pagination]}
          pagination
          slidesPerView={'auto'}
          className="w-full" >
          {loading || categoryLoading
            ? Array.from(Array(10)).map((el) => {
                return (
                    <SwiperSlide className="!w-[350px] p-4 border border-solid rounded-2xl !h-auto">
                        <CourseCardSkeleton />
                    </SwiperSlide>
                )
            })
            : !selectedCategoryCourses?.length && !categoryLoading  
            ? <img src="/assets/Course-not-Found.jpg" className="mx-auto h-[400px]" /> 
          : selectedCategoryCourses?.map((el) => {
            return (
              <SwiperSlide className="!w-[350px] p-4 border border-solid rounded-2xl !h-auto">
                <CourseCard course={el} />
              </SwiperSlide>
            )
          })}

        </Swiper>
      </div>
    </>
  );
};

export default Categories;
