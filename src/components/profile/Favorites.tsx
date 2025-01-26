import { Course } from "@/models/course.model";
import { CourseServices } from "@/services/Course";
import { useEffect, useState } from "react";
import t from '../../../i18next/locales/fa/translation.json';
import CourseCard from "../course/CourseCard";
import { ImageServices } from "@/services/Image";

const Favorites = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [images, setImages] = useState(new Map());

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userInfo")).userId;
    CourseServices.getAllFavoriteCourses(userId).then((res) => {
        console.log(res)
        if(res.data.length){
            res.data.forEach((el)=>{
                if(el.imageId){
                    ImageServices.getImageByImageId(el.imageId).then((result)=>{
              setImages((prev)=> prev.set(el.id, result.data.base64File))
              setCourses(res.data);;
            }) 
                }
           
          })
          }
    });
  }, []);
  return <div className="p-6 w-full">
  <h2 className="text-3xl mb-6"> {t["my-favorites"]} </h2>
  <div className=" grid grid-cols-3 gap-4">
    {courses?.map((course) => {
    return (
     <CourseCard course={course} images={images} />
    );
  })}
  </div>
  
</div>;
};

export default Favorites;
