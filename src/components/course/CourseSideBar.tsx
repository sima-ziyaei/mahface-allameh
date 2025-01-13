import t from "../../../i18next/locales/fa/translation.json";

const CourseSideBar = ({course}) => {
    return (
        <div className="bg-white rounded-2xl h-fit p-4 flex flex-col gap-6 items-end  m-4 shadow-md">
        <img
          width={600}
          src={`data:image/png;base64,${course?.imageBase64}`}
        />
        <p className=" mt-4 ">{course?.cost} تومان</p>

        <button className="bg-[#B41474] py-3 px-6 rounded-xl text-white self-center">
          {t["add-to-card"]}{" "}
        </button>

        <p className="self-start flex gap-2">
          <img src="/assets/icons/play-circle.svg" /> {t["time-of-video"]}{" "}
        </p>
        <p className="self-start flex gap-2">
          <img src="/assets/icons/unlimited.svg" /> {t["infinite-access"]}{" "}
        </p>
        <p className="self-start flex gap-2">
          <img src="/assets/icons/download.svg" />{" "}
          {t["ability-to-download-videos"]}{" "}
        </p>
      </div>
    )
};

export default CourseSideBar;