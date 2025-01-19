import t from "../../../i18next/locales/fa/translation.json";

const CourseContent = ({course}) => {
    const sectionLength = course.seasons.reduce((accumulator, currentValue)=>{
        return accumulator + currentValue.sections?.length
    }, 0);

    const numberToHourMin = (number) => {
        const hour = Math.trunc(number/60);
        return hour
    }

    return  (
        <div className="px-4 my-12">
            <h2 className="my-6 text-2xl"> {t['course-content']} </h2>
            <div className="flex mb-6 items-baseline">
                <p className="text-sm text-slate-600"> {course.seasons.length} {t['season']} </p>
                <img src="/assets/icons/circle.svg" />
                <p className="text-sm text-slate-600"> {sectionLength} {t['section']} </p>
                <img src="/assets/icons/circle.svg" />
                <p className="text-sm text-slate-600">{ numberToHourMin(course.totalDuration)} {t['course-duration']} </p>
            </div>
            <div className="">
                {
                    course?.seasons.map((el, i) => {
                        return (
                            <div key={i} className="border-x border-b p-4 border-solid border-zinc-300 last:rounded-b-3xl first:rounded-t-3xl first:border-t flex justify-between">
                                 {el.title} 
                                <img src="/assets/icons/arrow-down.svg" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CourseContent;