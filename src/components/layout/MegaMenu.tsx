import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import { CategoriesServices } from "@/services/Categories";
import { Category } from '../../models/category.model';
import { CourseServices } from "@/services/Course";

const MegaMenu = () => {
    const [show, setShow] = useState<boolean>();
    const [categories, setCategories] = useState<Category[]>();
    const [CourseMap, setCourseMap] = useState({});
    const [hoveredCategory, setHoveredCategory] = useState<string>();

    useEffect(() => {
        CategoriesServices.getTitles().then((res) => {
            setCategories(res.data);
            res.data.forEach((el) => {
                CourseServices.getTitleWithCategoryId(el.id).then((result) => {
                    CourseMap[el.title] = result.data;
                }).catch((err) => {});
            })
        })
        setCourseMap(CourseMap)
    }, [])

    return (
        <div
            onMouseMove={() => { setShow(true) }}
            className="flex gap-3 items-center cursor-pointer">
            <img src="/assets/icons/menu.svg" />
            <p> {t['categories']} </p>

            {show
                ? <div onMouseLeave={() => setShow(false)} className="absolute bg-white top-[92px] z-50 border flex border-solid border-gray-100">
                    <div className="min-w-[280px]">
                        {categories?.map((el) => {
                            return (
                                <a href={`/category/${el.id}`} onMouseMove={() => { setHoveredCategory(el.title) }} className="p-4 flex justify-between gap-6 hover:bg-[rgba(0,156,167,0.1)] hover:text-[#009CA7] border-l border-solid border-gray-100" key={el.id}> <p> {el.title} </p> <img src="/assets/icons/arrow-left.svg" /> </a>
                            )
                        })}
                    </div>
                    {hoveredCategory
                        ? <div className="flex flex-col min-w-[280px]">
                            {CourseMap[hoveredCategory]?.map((el) => {
                                return (
                                    <a key={el.id} href={`/course/${el.id}`} className="p-4 hover:bg-[rgba(0,156,167,0.1)] hover:text-[#009CA7]"> {el.title} </a>
                                )
                            })}
                        </div>
                        : null}

                </div>
                : null}
        </div>
    )
}

export default MegaMenu;