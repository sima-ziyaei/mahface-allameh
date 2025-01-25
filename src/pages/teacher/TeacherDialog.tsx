import { CategoriesServices } from "@/services/Categories";
import { CourseServices } from "@/services/Course";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import PreviousMap from "postcss/lib/previous-map";
import React, { useState, useId, useEffect } from "react";
import { toast } from "react-hot-toast";

function TeacherDialog({
  teacherDialogState,
  setTeacherDialogState,
  userInfo,
}) {
  const insitalCourseObj = {
    id: useId(),
    title: "",
    categoryId: "",

    courseLevelId: 1,
    cost: 0,
    imageBase64: "",
    courseDescription: "",
    description: "",
    seasons: [
      {
        id: useId(),
        title: "",
        sections: [
          {
            id: useId(),
            title: "بخش 1",
            video: "",
          },
        ],
      },
    ],
  };

  const [editeMode, setEditeMode] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: useId(),
      title: "برنامه نویسی",
      categoryId: "463044b4-343f-4101-b2a3-73012d059ac9",
      courseLevelId: 1,
      cost: 0,
      imageBase64: "",
      courseDescription: "",
      description: "",
      seasons: [
        {
          id: useId(),
          title: "html",
          sections: [
            {
              id: useId(),
              title: "بخش 1",
              video: "https://tekeye.uk/html/images/Joren_Falls_Izu_Jap.mp4",
            },
          ],
        },
      ],
    },
  ]);
  const [categories, setCategories] = useState([]);

  function handleCourseItemChange(filed, courseId, value) {
    let selectedCourse = { ...courses.find((el) => el.id === courseId) };
    selectedCourse[filed] = value;

    setCourses((prev) => [
      ...prev.filter((el) => el.id !== courseId),
      {
        ...selectedCourse,
      },
    ]);
  }

  function handleSeasonItemChange(filed, courseId, seasonId, value) {
    const selectedCourse = courses.find((el) => el.id === courseId);
    const selectedSeason = selectedCourse.seasons.find(
      (el) => el.id === seasonId
    );

    selectedSeason[filed] = value;

    setCourses((prev) => [
      ...prev.filter((el) => el.id !== courseId),
      {
        ...selectedCourse,
        seasons: [
          ...selectedCourse.seasons.filter((el) => el.id !== seasonId),
          selectedSeason,
        ],
      },
    ]);
  }

  function handleSectionItemChange(
    filed,
    courseId,
    seasonId,
    sectionId,
    value
  ) {
    const selectedCourse = courses.find((el) => el.id === courseId);
    const selectedSeason = selectedCourse.seasons.find(
      (el) => el.id === seasonId
    );
    let selectedSection = {
      ...selectedSeason.sections.find((el) => el.id === sectionId),
    };

    selectedSection[filed] = value;

    setCourses((prev) => [
      ...prev.filter((el) => el.id !== courseId),
      {
        ...selectedCourse,
        seasons: [
          ...selectedCourse.seasons.filter((el) => el.id !== seasonId),
          {
            ...selectedSeason,
            sections: [
              ...selectedSeason.sections.filter((el) => el.id !== sectionId),
              selectedSection,
            ],
          },
        ],
      },
    ]);
  }

  function deleteCourse(courseId) {
    CourseServices.delete(courseId)
      .then((res) => {
        if (res.data.isValid) {
          setCourses((prev) => prev.filter((item) => item.id !== courseId));
          toast.success("با موفقیت حذف شد.");
        } else {
          toast.error(res.data.statusMessage);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  }
  function editeCourse() {}
  function addCourse(courseId) {
    let body = {};
  }

  function deleteSeason() {}
  function editeSeason() {}
  function addSeson() {}

  function deleteSection() {}
  function editeSection() {}
  function addSection() {}

  const handleFileChange = (event, courseId) => {
    const selectedCorse = courses.find((el) => el.id === courseId);

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourses((prev) => [
          ...prev.filter((el) => el.id !== courseId),
          {
            ...selectedCorse,
            imageBase64: reader.result?.split(",")[1],
          },
        ]);
      };

      reader.readAsDataURL(file); // Read the file as a Base64 URL
    }
  };

  useEffect(() => {
    CategoriesServices.getAll()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error("مشکلی در دریافت کتگوری ها پیش آمده است");
        setTeacherDialogState({ open: false });
      });

    CourseServices.getAllTeacherCourses(userInfo?.userId).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <Dialog
      fullScreen
      open={teacherDialogState.open}
      onClose={() => setTeacherDialogState({ open: false })}
    >
      <DialogTitle
        sx={{ bgcolor: "#009CA7", color: "white", fontSize: "28px" }}
      >
        پنل استاد
      </DialogTitle>

      <DialogContent className="w-full flex flex-col gap-8 items-center mt-4">
        <div className=" w-full ">
          <Accordion expanded={true}>
            <AccordionSummary>
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-6">
                  <Avatar
                    src={
                      userInfo?.profileImageBase64
                        ? `data:image/png;base64,${userInfo?.profileImageBase64}`
                        : "/assets/user.svg"
                    }
                    sx={{ width: 60, height: 60 }}
                  />
                  <span className="text-3xl">اطلاعات کاربری</span>
                </div>
                <div className="flex items-center">
                  <p>حالت ویرایش</p>
                  <Switch
                    checked={editeMode}
                    onChange={() => setEditeMode((prev) => !prev)}
                    color="primary"
                  />
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className="w-full flex items-center gap-12">
              <Box
                sx={{
                  width: 1 / 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <TextField
                  className="w-full"
                  label={"نام"}
                  disabled={!editeMode}
                  value={userInfo?.firstname}
                />
                <TextField
                  className="w-full"
                  label={"نام‌وخانوادگی"}
                  disabled={!editeMode}
                  value={userInfo?.lastName}
                />
                <TextField
                  className="w-full"
                  label={"کدملی"}
                  disabled={!editeMode}
                  value={userInfo?.nationalCode}
                />
              </Box>
              <Box
                sx={{
                  width: 1 / 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <TextField
                  className="w-full"
                  label={"ایمیل"}
                  disabled={!editeMode}
                  value={userInfo?.email}
                />
                <TextField
                  className="w-full"
                  label={"شماره تلفن"}
                  disabled={!editeMode}
                  value={userInfo?.phoneNumber}
                />
                <Autocomplete
                  disablePortal
                  disabled={!editeMode}
                  value={userInfo?.genderTypeString}
                  options={[0, 1, 2]}
                  getOptionLabel={(option) =>
                    option === 1 ? "مرد" : option === 0 ? "انتخاب نشده" : "زن"
                  }
                  style={{ width: "100% " }}
                  renderInput={(params) => (
                    <TextField {...params} label="جنسیت" />
                  )}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className=" w-full">
          <Accordion expanded>
            <AccordionSummary className="">دوره ها</AccordionSummary>
            <Divider />
            <AccordionDetails>
              {courses.map((course) => (
                <Accordion className="my-20">
                  <AccordionSummary>
                    <div className="w-full flex flex-col items-center gap-6">
                      <div className="w-full flex items-center gap-6 course-wrapper">
                        <img
                          className="w-40 h-20"
                          src={
                            course?.imageBase64
                              ? `data:image/png;base64,${course?.imageBase64}`
                              : "https://media1.maktabkhooneh.org/courses/images/آموزش_CSS_HTML_و_JavaScript_پروژه_محور_1403-09-26-144158971.webp?expire=2049115569&token=564e8b871816b0eb043f4e063ea18e33"
                          }
                        />
                        <TextField
                          sx={{ width: 1 / 4 }}
                          value={course?.title}
                          onChange={(e) =>
                            handleCourseItemChange(
                              "title",
                              course.id,
                              e.target.value
                            )
                          }
                          variant="outlined"
                          label="نام دوره"
                        />
                        <div className="w-1/4 relative ">
                          <TextField sx={{ width: 1 }} label="تعویض عکس" />

                          <input
                            className="w-full h-full absolute left-0 top-0 "
                            type="file"
                            onChange={(e) => handleFileChange(e, course.id)}
                            accept="image/png, image/jpeg"
                          />
                        </div>
                        <Autocomplete
                          disablePortal
                          options={categories}
                          value={categories?.find(
                            (item) => item.id === course.categoryId
                          )}
                          getOptionLabel={(option) => option.title}
                          onChange={(e, newValue) =>
                            handleCourseItemChange(
                              "categoryId",
                              course.id,
                              newValue.id
                            )
                          }
                          style={{ width: "25%" }}
                          renderInput={(params) => (
                            <TextField {...params} label="دسته" />
                          )}
                        />
                        <TextField
                          label="مبلغ دوره"
                          value={course?.cost}
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={(e) =>
                            handleCourseItemChange(
                              "cost",
                              course.id,
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="w-full pr-44 flex items-center gap-6 course-wrapper">
                        <TextField
                          value={course?.courseDescription}
                          onChange={(e) =>
                            handleCourseItemChange(
                              "courseDescription",
                              course.id,
                              e.target.value
                            )
                          }
                          sx={{ width: 1 / 4 }}
                          label="توضیح مختصر دوره"
                        />
                        <TextField
                          value={course?.description}
                          sx={{ width: 1 / 3 }}
                          onChange={(e) =>
                            handleCourseItemChange(
                              "description",
                              course.id,
                              e.target.value
                            )
                          }
                          label="توضیحات تکمیلی دوره"
                        />
                        <Autocomplete
                          disablePortal
                          value={course?.courseLevelId}
                          options={[3, 1, 2]}
                          getOptionLabel={(option) =>
                            option === 1
                              ? "ابتدایی"
                              : option === 2
                              ? "متوسط"
                              : "پیشرفته"
                          }
                          onChange={(event, newValue) =>
                            handleCourseItemChange(
                              "courseLevelId",
                              course.id,
                              newValue
                            )
                          }
                          style={{ width: "25%" }}
                          renderInput={(params) => (
                            <TextField {...params} label="سطح دوره" />
                          )}
                        />
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    {course?.seasons?.map((season) => (
                      <Accordion>
                        <AccordionSummary>
                          <TextField
                            sx={{ width: 1 / 2 }}
                            value={season.title}
                            variant="outlined"
                            label="نام فصل"
                          />
                        </AccordionSummary>
                        <AccordionDetails>
                          {season?.sections.map((section) => (
                            <Accordion>
                              <AccordionSummary>
                                <TextField
                                  sx={{ width: 1 / 2 }}
                                  value={section.title}
                                  variant="outlined"
                                  label="نام بخش"
                                />
                              </AccordionSummary>
                              <AccordionDetails className="flex items-center justify-around">
                                <video
                                  src={section.video}
                                  width="250"
                                  height="250"
                                  controls
                                  muted
                                />
                                <TextField
                                  sx={{ width: 1 / 2 }}
                                  value={section?.video}
                                  variant="outlined"
                                  label="لینک ویدیو"
                                />
                              </AccordionDetails>
                              <AccordionActions>
                                <Button variant="contained" color="error">
                                  حذف بخش
                                </Button>
                                <Button variant="contained">ویرایش بخش</Button>
                              </AccordionActions>
                            </Accordion>
                          ))}
                        </AccordionDetails>
                        <AccordionActions>
                          <Button variant="contained" color="error">
                            حذف فصل
                          </Button>
                          <Button variant="contained">افزودن بخش</Button>
                        </AccordionActions>
                      </Accordion>
                    ))}
                  </AccordionDetails>
                  <AccordionActions>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={deleteCourse.bind(null, course.id)}
                    >
                      حذف دوره
                    </Button>
                    <Button variant="contained">افزودن فصل</Button>
                  </AccordionActions>
                </Accordion>
              ))}
            </AccordionDetails>
            <AccordionActions>
              <Button variant="contained" sx={{ backgroundColor: "gray" }}>
                ویرایش تغییرات
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  setCourses((prev) => [...prev, insitalCourseObj])
                }
              >
                افزودن دوره
              </Button>
            </AccordionActions>
          </Accordion>
        </div>
      </DialogContent>

      <DialogActions className="bg-blue-200">
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            setTeacherDialogState({ open: false });
          }}
        >
          بستن
        </Button>
        <Button variant="contained" color="secondary" onClick={() => {}}>
          ثبت تغییرات
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TeacherDialog;
