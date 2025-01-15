import t from "../../../i18next/locales/fa/translation.json";

const CourseCard = ({course}) => {
 
    return (
        <a
        href={`/course/${course.id}`}
        className=""
        key={course.id}
    >
        <img
            src={`data:image/png;base64,${course.imageBase64}`}
            alt="course"
            className=" h-[200px]"
        />

        <h1 className=" text-xl mt-4"> {course?.title}</h1>
        <p className=" mt-3 text-sm text-zinc-600">{t["course-teacher"]} : {course.teacherName}</p>

        <p className=" mt-6 text-sm text-slate-700 overflow-hidden text-ellipsis line-clamp-2">
            {course?.courseDescription}
        </p>
        <div className="flex gap-4 mt-6">
            <div className="flex gap-1">
                <img src="/assets/icons/teacher.svg" width={16} />
                <p className="text-sm text-zinc-600"> {course?.totalView} {t['student']} </p>
            </div>

            <div className="flex gap-1">
                <img src="/assets/icons/star.svg" width={16} />
                <p className="text-sm text-zinc-600"> {course?.starsNumber} </p>
            </div>
        </div>

        <div className="bg-[#F7E7F1] p-3 rounded-lg mt-3 flex justify-between items-center ">
            <p>{course?.cost} <span className="text-xs text-zinc-600">  تومان </span></p>
            <button className="bg-[#B41474] py-2 px-6 rounded-lg text-white self-center"> {t['add-to-card']}  </button>
        </div>
    </a>
    )
}

export default CourseCard;