import t from "../../i18next/locales/fa/translation.json";

const CourseContent = ({course}) => {
    return  (
        <div className="px-4 w-[93%] my-16">
            <h2 className="my-6 text-2xl"> {t['course-content']} </h2>
            <div className="">
                {
                    course?.seasons.map((el) => {
                        return (
                            <div className="border-x border-b p-4 border-solid border-zinc-300 last:rounded-b-3xl first:rounded-t-3xl first:border-t flex justify-between"> {el.title} 
                            
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CourseContent;