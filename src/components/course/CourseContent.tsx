import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import { SectionServices } from "@/services/Section";
import { Accordion, AccordionDetails, AccordionSummary, Box, Modal, Typography } from "@mui/material";
import ReactPlayer from "react-player/file";

const CourseContent = ({ course }) => {
    const [open, setOpen] = useState<string>('');
    const [loading, setLoading] = useState<boolean>();

    const sectionLength = course.seasons.reduce((accumulator, currentValue) => {
        if (currentValue.sections?.length) {
            return accumulator + currentValue.sections?.length;
        }
        return 0;
    }, 0);

    const numberToHourMin = (number) => {
        const hour = Math.trunc(number / 60);
        return hour;
    }

    useEffect(() => {
        setLoading(true)
        SectionServices.getAllByCourse(course.id).then((res) => {
            course.seasons = course.seasons.map(season => {
                const sections = res.data.filter(item => item.seasionId === season.id);
                return { ...season, sections };
            });
            setLoading(false)
        })
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#3d3d3d',
        boxShadow: 24,
        borderRadius: 4,
        p: 4,
    };

    return (
        <div className="px-4 my-12">
            <h2 className="my-6 text-2xl"> {t['course-content']} </h2>
            <div className="flex mb-6 items-baseline">
                <p className="text-sm text-slate-600"> {course.seasons.length} {t['season']} </p>
                <img src="/assets/icons/circle.svg" />
                <p className="text-sm text-slate-600"> {sectionLength} {t['section']} </p>
                <img src="/assets/icons/circle.svg" />
                <p className="text-sm text-slate-600">{numberToHourMin(course.totalDuration)} {t['course-duration']} </p>
            </div>
            <div className="">
                {
                    !loading && course?.seasons.map((el, i) => {
                        return (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<img src="/assets/icons/arrow-down.svg" />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span" className="!text-xl">{el.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {el.sections?.map((section) => {
                                        return (
                                            <div onClick={() => { setOpen(section.id) }} className="flex gap-2 py-4 cursor-pointer border-t border-solid border-gray-200 ">
                                                <img className=" invert-[46%] sepia-[9%] saturate-[620%] hue-rotate-[182deg] brightness-[94%] contrast-[88%]" width={16} src="/assets/icons/play-circle.svg" />
                                                <p className="text-gray-500 text-sm"> {section.episodeTitle}</p>
                                                <Modal open={open === section.id} onClose={() => { setOpen(null) }} sx={{ zIndex: 100 }}>
                                                    <Box sx={style}>
                                                        <div className="flex justify-between mb-6">
                                                            <p className="text-white"> {section.episodeTitle} </p>
                                                            <img onClick={() => { setOpen(null) }} className="cursor-pointer brightness-0 invert" src="/assets/icons/close-circle.svg" />
                                                        </div>

                                                        <ReactPlayer controls={true} height={300} width={600} url={section.url} />
                                                    </Box>
                                                </Modal>
                                            </div>
                                        )
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CourseContent;