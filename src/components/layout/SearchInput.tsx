import { Course } from "@/models/course.model";
import { CourseServices } from "@/services/Course";
import t from "../../../i18next/locales/fa/translation.json";
import { useState } from "react";

const SearchInput = () => {
    const [value, setValue] = useState<string>();
    const [searchedCourses, setSearchedCourses] = useState<Course[]>();
    const [showError, setShowError] = useState<boolean>();

    const handleSearch = () => {
        if (value.length < 3) {
            setShowError(true);
            setSearchedCourses(null);
        } else {
            setShowError(false);
            CourseServices.search(value).then((res) => {
                setSearchedCourses(res.data);
            })
        }
    }
    return (
        <div
            style={{ direction: "rtl" }}
            className="sm:relative rounded-t-3xl rounded-b-3xl border-[1.5px] border-solid border-gray-600 px-4 py-2  bg-white flex w-[50%] mx-8 justify-between focus:[&_input]:border-cyan-700"
        >
            <input
                value={value ?? ""}
                onChange={(e) => setValue(e.target.value)}
                className="border-0 w-[calc(100%-52px)] focus:outline-none"
                type="text"
                placeholder={t["what-do-you-want-to-learn"]}
            />

            <img
                onClick={() => handleSearch()}
                className="mr-4 cursor-pointer"
                src="/assets/search-normal.svg"
                alt="search"
            />
            {showError
                ? <p className="absolute right-0 top-[42px] text-red-700"> {t['search-field-error']} </p>
                : null}
            {searchedCourses?.length
                ? <div className="absolute z-50 bg-white w-full rounded-2xl left-0 top-[42px] p-4 border border-solid border-gray-300">
                    {searchedCourses.map((el) => {
                        return (<a key={el.id} href={`/course/${el.id}`} className="p-4 flex gap-4 hover:bg-gray-100 cursor-pointer">
                            <img src={`data:image/png;base64,${el.imageBase64}`} className="w-[60px]" />
                            <p> {el.title} </p>
                        </a>)
                    })}

                </div> : null}
        </div>
    )
}

export default SearchInput;