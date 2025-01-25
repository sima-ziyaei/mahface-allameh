import { Category } from "@/models/category.model";
import { Course } from "@/models/course.model";
import { CategoriesServices } from "@/services/Categories";
import { CourseServices } from "@/services/Course";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "./course/CourseCard";
import { Pagination } from "swiper/modules";
import CourseCardSkeleton from "./course/CourseCardSkeleton";
import Skeleton from "react-loading-skeleton";
import { ImageServices } from "@/services/Image";
import "react-loading-skeleton/dist/skeleton.css";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [loading, setLoading] = useState<boolean>();
  const [categoryLoading, setCategoryLoading] = useState<boolean>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [selectedCategoryCourses, setSelectedCategoryCourses] = useState<Course[]>();
  const [images, setImages] = useState(new Map());

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
      if(res.data.length){
        res.data.forEach((el)=>{
        ImageServices.getImageByImageId(el.imageId).then((result)=>{
          setImages((prev)=> prev.set(el.id, result.data.base64File))
          setSelectedCategoryCourses(res.data);
          setLoading(false);
        })
      })
      } else{
        setSelectedCategoryCourses(res.data);
          setLoading(false);
      }
      
    })
  }

  useEffect(()=>{
    if(selectedCategoryId)
      getSelectedCategory(selectedCategoryId);
  }, [selectedCategoryId]);


  return (
    <>
      <div className="container border border-solid flex flex-col mx-auto border-gray-200 bg-white rounded-2xl gap-6 p-6 mt-16 ">
        <div className="flex w-max h-fit">
          {categoryLoading
          ?  <Skeleton count={9} width={90} height={25} containerClassName="flex gap-4" className="block" />  
          : categories?.map((el) => {
            return (
              <p key={el.id} onClick={() => { setSelectedCategoryId(el.id); getSelectedCategory(el.id); }} className={` ${selectedCategoryId === el.id? 'border-[#009CA7]': ' border-gray-300'} cursor-pointer border-b-2 border-solid p-4`}> {el.title} </p>
            )
          })}
        </div>
        <Swiper spaceBetween={16}
          modules={[Pagination]}
          pagination
          slidesPerView={'auto'}
          className="w-full !pb-10" >
          {loading || categoryLoading
            ? Array.from(Array(10)).map((el, i) => {
                return (
                    <SwiperSlide key={i} className="!w-[350px] p-4 border border-solid rounded-2xl !h-auto">
                        <CourseCardSkeleton />
                    </SwiperSlide>
                )
            })
            : !selectedCategoryCourses?.length && !categoryLoading  
            ? <img src="/assets/Course-not-Found.jpg" className="mx-auto h-[400px]" /> 
          : selectedCategoryCourses?.map((el) => {
            return (
              <SwiperSlide key={el.id} className="!w-[350px] p-4 border border-solid rounded-2xl !h-auto">
                <CourseCard course={el} images={images} />
              </SwiperSlide>
            )
          })}

        </Swiper>
      </div>
    </>
  );
};

export default Categories;
