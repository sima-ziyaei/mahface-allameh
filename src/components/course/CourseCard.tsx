import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import AddToCartButton from "../AddToCartButton";
import SvgHeart from "../Icons/IconHeart";
import { CourseServices } from "@/services/Course";

const CourseCard = ({ course, images }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const userId = JSON.parse(localStorage.getItem('userInfo')).userId;

  const formattedPrice = new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 2,
  }).format(course.cost / 10);

  useEffect(() => {
    CourseServices.isUserFavoriteCourse(userId, course.id).then((res)=>{
      setIsLiked(res.data);
    }).catch((err) => {});
  }, []);

  const like = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(isLiked){
      CourseServices.deleteFromFavorites(userId, course.id).then((res)=>{
        console.log(res,'deleete')
        setIsLiked(false);
      }).catch((err) => {});
    } else {
      CourseServices.addToFavorites({userId: userId, courseId: course.id}).then((res)=>{
        console.log(res, 'addddd')
        setIsLiked(true)
      }).catch((err) => {});
    }
  };

  return (
    <a
      href={`/course/${course.id}`}
      className="h-full flex flex-col "
      key={course.id}
    >
      <img
        src={`data:image/png;base64,${images?.get(course.id)}`}
        alt="course"
        className=" h-[200px]"
      />

      <h1 className=" text-xl mt-4"> {course?.title}</h1>
      <p className=" mt-3 text-sm text-zinc-600">
        {t["course-teacher"]} : {course.teacherName}
      </p>

      <p className=" my-6 text-sm text-slate-700 overflow-hidden text-ellipsis line-clamp-2">
        {course?.courseDescription}
      </p>
      <div className="flex gap-4 mt-auto">
        <div className="flex gap-1">
          <img src="/assets/icons/teacher.svg" width={16} />
          <p className="text-sm text-zinc-600">
            {" "}
            {course?.totalView} {t["student"]}{" "}
          </p>
        </div>

        <div className="flex gap-1">
          <img src="/assets/icons/star.svg" width={16} />
          <p className="text-sm text-zinc-600"> {course?.starsNumber} </p>
        </div>
      </div>

      <div className="rounded-lg mt-6 flex justify-between items-center">
        <AddToCartButton course={course} />
        <p>
          {formattedPrice}{" "}
          <span className="text-xs text-zinc-600"> {t["tooman"]} </span>
        </p>
      </div>
      <SvgHeart
        onClick={(e) => {
          like(e);
        }}
        className={`stroke-gray-40 absolute w-6 h-6 transition-colors duration-300 ${
          isLiked ? "!stroke-red-600 fill-red-600" : ""
        } `}
      />
    </a>
  );
};

export default CourseCard;
