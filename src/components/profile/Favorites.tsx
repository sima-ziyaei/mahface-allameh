import { Course } from "@/models/course.model";
import { CourseServices } from "@/services/Course";
import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import CourseCard from "../course/CourseCard";
import { ImageServices } from "@/services/Image";

const Favorites = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [images, setImages] = useState(new Map());

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userInfo")).userId;
    CourseServices.getAllFavoriteCourses(userId).then((res) => {
      if (res.data.length) {
        const imageRequests = res.data.map((el) => {
          if (el.imageId) {
            return ImageServices.getImageByImageId(el.imageId)
              .then((result) => ({ courseId: el.id, image: result.data.base64File }))
              .catch(() => null);
          }
          return null;
        });

        Promise.all(imageRequests).then((imageResults) => {
          const newImages = new Map();
          imageResults.forEach((item) => {
            if (item) {
              newImages.set(item.courseId, item.image);
            }
          });

          setImages(newImages);
        });
        setCourses(res.data);
      }
    });
  }, []);
  
  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl mb-6"> {t["my-favorites"]} </h2>
      <div className=" grid grid-cols-3 gap-4">
        {courses?.map((course) => {
          return <CourseCard course={course} images={images} />;
        })}
      </div>
    </div>
  );
};

export default Favorites;
