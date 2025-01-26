import IconEye from "../Icons/IconEye";
import t from "../../../i18next/locales/fa/translation.json";

const CourseHeader = ({ course }) => {

    const courseLevel = {
        1: "مقدماتی",
        2: "متوسط",
        3: "پیشرفته",
    };

    return (
        <div className="p-4 bg-[#3d3d3d] flex justify-between relative">
            <div>
                <h1 className="text-white font-bold text-2xl">{course?.title}</h1>
                <p className="text-white mt-6 w-[93%]">
                    {course?.courseDescription}
                </p>

                <p className="text-white mt-4 mb-5">
                    {t["course-teacher"]} : {course?.teacherName}
                </p>

                <div className="flex gap-8">
                    <div className="flex gap-2">
                        <IconEye className="stroke-white" />
                        <p className=" text-white"> {course?.totalView} {t['student']} </p> 
                    </div>
                    <div className="flex gap-8">
                        <div className="flex gap-1">

                            {Array.from(Array(course?.starsNumber)).map((x, i) => (
                                <img key={i} src="/assets/icons/star.svg" />
                            ))}
                            {course?.starsNumber < 5
                                && Array.from(Array(5 - course?.starsNumber)).map((x, i) => (
                                    <img key={i} src="/assets/icons/star.svg" />
                                ))}
                        </div>
                        <p className="text-white">
                            {course?.starsNumber} {t["score"]}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <img
                            src={`/assets/icons/chart-${course?.courseLevelId}.svg`}
                        />
                        <p className="text-white">

                            {courseLevel[course?.courseLevelId]}{" "}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseHeader;