import t from "../../../i18next/locales/fa/translation.json";
import AddToCartButton from "../AddToCartButton";

const CourseCard = ({ course, images }) => {

    const formattedPrice = new Intl.NumberFormat('fa-IR', {
            maximumFractionDigits: 2,
          }).format(course.cost / 10)

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
            <p className=" mt-3 text-sm text-zinc-600">{t["course-teacher"]} : {course.teacherName}</p>

            <p className=" my-6 text-sm text-slate-700 overflow-hidden text-ellipsis line-clamp-2">
                {course?.courseDescription}
            </p>
            <div className="flex gap-4 mt-auto">
                <div className="flex gap-1">
                    <img src="/assets/icons/teacher.svg" width={16} />
                    <p className="text-sm text-zinc-600"> {course?.totalView} {t['student']} </p>
                </div>

                <div className="flex gap-1">
                    <img src="/assets/icons/star.svg" width={16} />
                    <p className="text-sm text-zinc-600"> {course?.starsNumber} </p>
                </div>
            </div>

            <div className="rounded-lg mt-6 flex justify-between items-center">
                <AddToCartButton course={course} />
                <p>{formattedPrice} <span className="text-xs text-zinc-600">  {t['tooman']} </span></p>
            </div>
        </a>
    )
}

export default CourseCard;