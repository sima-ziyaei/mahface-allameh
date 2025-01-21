import { NavbarState } from "@/pages/course/[id]";
import t from "../../../i18next/locales/fa/translation.json";

const CourseNavbar = ({setNavbarState, navbarState}) => {
    return (
        <div className="my-8 flex justify-evenly bg-[#F3F6F9] p-4 rounded-2xl mx-4" >
            <p onClick={()=> setNavbarState(NavbarState.Content)} className={` cursor-pointer p-2 rounded-xl ${navbarState === NavbarState.Content ? 'text-[#009CA7] bg-[rgba(0,156,167,0.3)] font-bold' : ''} `}> {t['course-content']} </p>
            <p onClick={()=> setNavbarState(NavbarState.About)} className={` cursor-pointer p-2 rounded-xl ${navbarState === NavbarState.About ? 'text-[#009CA7] bg-[rgba(0,156,167,0.3)] font-bold' : ''} `}> {t['about-course']} </p>
            <p onClick={()=> setNavbarState(NavbarState.Comment)} className={` cursor-pointer px-4 py-2 rounded-xl ${navbarState === NavbarState.Comment ? 'text-[#009CA7] bg-[rgba(0,156,167,0.3)] font-bold' : ''} `}> {t['course-comments']} </p>
        </div>
    )
};

export default CourseNavbar;
