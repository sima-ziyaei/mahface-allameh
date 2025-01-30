import { CourseServices } from "@/services/Course";
import { SectionServices } from "@/services/Section";
import { toast } from "react-hot-toast";
import { uuid } from "./TeacherDialog";
import { SeasonServices } from "@/services/Season";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { CategoriesServices } from "@/services/Categories";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function CourseCompotent({ userInfo }) {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([
    // {
    //   id: uuid(),
    //   title: "برنامه نویسی",
    //   categoryId: "463044b4-343f-4101-b2a3-73012d059ac9",
    //   courseLevelId: 1,
    //   cost: 0,
    //   imageBase64: "",
    //   courseDescription: "",
    //   description: "",
    //   new: true,
    //   seasons: [
    //     {
    //       id: uuid(),
    //       title: "html",
    //       seasonsDescription: "",
    //       sections: [
    //         {
    //           id: uuid(),
    //           title: "بخش 1",
    //           url: "https://tekeye.uk/html/images/Joren_Falls_Izu_Jap.mp4",
    //         },
    //       ],
    //     },
    //   ],
    // }
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

  //######### Course ##########//

  function deleteCourse(courseId) {
    const selectedCourse = courses.find((el) => el.id === courseId);

    if (selectedCourse?.new) {
      setCourses((prev) => prev.filter((item) => item.id !== courseId));
    } else {
      CourseServices.delete(courseId)
        .then((res) => {
          if (res.data.isValid) {
            setCourses((prev) => prev.filter((item) => item.id !== courseId));
            toast.success("با موفقیت حذف شد.");
          } else {
            toast.error(res?.data?.statusMessage);
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  }

  function editeCourse(courseId) {
    const selectedCourse = courses.find((el) => el.id === courseId);

    // console.table([
    //   {
    //     categoryId: selectedCourse.categoryId,
    //     createdUserID: userInfo?.userId,
    //     imageBase64: selectedCourse.imageBase64,
    //     title: selectedCourse.title,
    //     courseDescription: selectedCourse.courseDescription,
    //     cost: selectedCourse.cost,
    //     courseLevelId: selectedCourse.courseLevelId,
    //   },
    // ]);

    if (
      !selectedCourse.categoryId ||
      !selectedCourse.imageBase64 ||
      !selectedCourse.title ||
      !selectedCourse.courseDescription ||
      !selectedCourse.cost ||
      !selectedCourse.courseLevelId
    ) {
      toast.error("پرکردن تمامی فیلد های دوره الزامی است");
      return;
    }

    if (selectedCourse.new) {
      CourseServices.add({
        categoryId: selectedCourse.categoryId,
        createdUserID: userInfo?.userId,
        imageBase64: selectedCourse.imageBase64,
        title: selectedCourse.title,
        courseDescription: selectedCourse.courseDescription,
        cost: selectedCourse.cost,
        courseLevelId: selectedCourse.courseLevelId,
      }).then((res) => {
        if (res.data.isValid) {
          toast.success("یک دوره با موفقیت اضافه شد.");
          setCourses((prev) => [
            ...prev.filter((item) => item.id !== courseId),
            { ...selectedCourse, new: false },
          ]);
        } else {
          toast.error(res?.data?.statusMessage);
        }
      });
    } else {
      CourseServices.update(
        {
          title: selectedCourse.title,
          courseLevelId: selectedCourse.courseLevelId,
          categoryId: selectedCourse.categoryId,
          createdUserID: userInfo?.userId,
          courseDescription: selectedCourse.courseDescription,
          cost: selectedCourse.cost,
          imageBase64: selectedCourse.imageBase64,
        },
        courseId
      )
        .then((res) => {
          if (res.data.isValid) {
            toast.success("با موفقیت آپدیت شد.");
          } else {
            toast.error(res?.data?.statusMessage);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function addCourse() {
    setCourses((prev) => [
      ...prev,
      {
        id: uuid(),
        title: "",
        categoryId: "",
        courseLevelId: 1,
        cost: 0,
        imageBase64: "",
        courseDescription: "",
        description: "",
        new: true,
        seasons: [
          {
            id: uuid(),
            title: "",
            new: true,
            seasonsDescription: "",
            sections: [
              {
                new: true,
                id: uuid(),
                title: "",
                url: "",
              },
            ],
          },
        ],
      },
    ]);
  }

  //####### Season #########//

  function deleteSeason(courseId, seasonId) {
    const selectedCourse = courses.find((el) => el.id === courseId);
    const selectedSeason = selectedCourse.seasons.find(
      (item) => item.id === seasonId
    );

    if (selectedSeason?.new) {
      setCourses((prev) => [
        ...prev.filter((el) => el.id !== courseId),
        {
          ...selectedCourse,
          seasons: [
            ...selectedCourse.seasons.filter((item) => item.id !== seasonId),
          ],
        },
      ]);
    } else {
      SeasonServices.delete(seasonId)
        .then((res) => {
          if (res.data.isValid) {
            toast.success("با موفقیت حذف شد.");

            setCourses((prev) => [
              ...prev.filter((el) => el.id !== courseId),
              {
                ...selectedCourse,
                seasons: [
                  ...selectedCourse.seasons.filter(
                    (item) => item.id !== seasonId
                  ),
                ],
              },
            ]);
          } else {
            toast.error(res.data.statusMessage);
            return;
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }

  function editeSeason(courseId, seasonId) {
    const selectedCourse = courses.find((el) => el.id === courseId);
    const selectedSeason = selectedCourse.seasons.find(
      (el) => el.id === seasonId
    );

    if (
      selectedSeason.title.trim() === "" ||
      selectedSeason.seasonsDescription.trim() === ""
    ) {
      toast.error("ابتدا تمامی مشخصات فصل را درست پر کنید.");
      return;
    }

    if (selectedSeason.new) {
      SeasonServices.add({
        createdUserId: userInfo?.userId,
        title: selectedSeason.title,
        courseId: selectedCourse.id,
        seasonsDescription: selectedSeason.seasonsDescription,
      })
        .then((res) => {
          if (res.data.isValid) {
            toast.success("فصل با موفقیت اضافه شد.");
            setCourses((prev) => [
              ...prev.filter((c) => c.id !== courseId),
              {
                ...selectedCourse,
                seasons: [
                  ...selectedCourse.seasons.filter(
                    (item) => item.id !== seasonId
                  ),
                  {
                    ...selectedSeason,
                    new: false,
                  },
                ],
              },
            ]);
          } else {
            toast.error(res?.data?.statusMessage);
            return;
          }
        })
        .catch((err) => {});
    } else {
      SeasonServices.update({
        id: selectedSeason.id,
        title: selectedSeason.title,
        courseId: selectedCourse.id,
        seasonsDescription: selectedSeason?.seasonsDescription,
      })
        .then((res) => {
          if (res.data.isValid) {
            toast.success("فصل با موفقیت آپدیت شد.");
          } else {
            toast.error(res?.data?.statusMessage);
            return;
          }
        })
        .catch((err) => {});
    }
  }

  function addSeason(courseId) {
    const selectedCourse = courses.find((el) => el.id === courseId);
    setCourses((prev) => [
      ...prev.filter((item) => item.id !== courseId),
      {
        ...selectedCourse,
        seasons: [
          ...selectedCourse.seasons,
          {
            id: uuid(),
            title: "",
            new: true,
            seasonsDescription: "",
            sections: [
              {
                new: true,
                id: uuid(),
                title: "",
                url: "",
              },
            ],
          },
        ],
      },
    ]);
  }

  //####### Section #########//

  function deleteSection(courseId, seasonId, sectionId) {
    const selectedCourse = courses.find((el) => el.id === courseId);
    const selectedSeason = selectedCourse.seasons.find(
      (el) => el.id === seasonId
    );
    if (
      selectedSeason.sections.find((section) => section.id === sectionId)?.new
    ) {
      setCourses((prev) => [
        ...prev.filter((el) => el.id !== courseId),
        {
          ...selectedCourse,
          seasons: [
            ...selectedCourse.seasons.filter((item) => item.id !== seasonId),
            {
              ...selectedSeason,
              sections: [
                ...selectedSeason.sections.filter(
                  (section) => section.id !== sectionId
                ),
              ],
            },
          ],
        },
      ]);
    } else {
      SectionServices.delete(sectionId)
        .then((res) => {
          if (res?.data?.isValid) {
            toast.success("با موفقیت حذف شد.");
            setCourses((prev) => [
              ...prev.filter((el) => el.id !== courseId),
              {
                ...selectedCourse,
                seasons: [
                  ...selectedCourse.seasons.filter(
                    (item) => item.id !== seasonId
                  ),
                  {
                    ...selectedSeason,
                    sections: [
                      ...selectedSeason.sections.filter(
                        (item) => item.id !== sectionId
                      ),
                    ],
                  },
                ],
              },
            ]);
          } else {
            toast.error(res?.data?.statusMessage);
            return;
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  }

  function editeSection(courseId, seasonId, sectionId) {
    const selectedCourse = courses.find((el) => el.id === courseId);
    const selectedSeason = selectedCourse.seasons.find(
      (el) => el.id === seasonId
    );
    const selectedSection = selectedSeason.sections.find(
      (el) => el.id === sectionId
    );

    if (
      selectedSection.url.trim() === "" ||
      selectedSection.title.trim() === ""
    ) {
      toast.error("ابتدا نیاز است تمام اطلاعات بخش را کامل وارد کنید");
      return;
    }

    if (selectedSection.new) {
      SectionServices.add({
        url: selectedSection.url,
        seasonId: selectedSeason.id,
        createdUserId: userInfo?.userId,
        title: selectedSection.title,
      })
        .then((res) => {
          if (res.data.isValid) {
            toast.success("این بخش باموفقیت اضافه شد.");
            setCourses((prev) => [
              ...prev.filter((el) => el.id !== courseId),
              {
                ...selectedCourse,
                seasons: [
                  ...selectedCourse.seasons.filter(
                    (item) => item.id !== seasonId
                  ),
                  {
                    ...selectedSeason,
                    sections: [
                      ...selectedSeason.sections,
                      {
                        new: true,
                        id: uuid(),
                        title: "",
                        url: "",
                      },
                    ],
                  },
                ],
              },
            ]);
          } else {
            toast.error(res?.data?.statusMessage);
            return;
          }
        })
        .catch();
    } else {
      SectionServices.update(
        {
          title: selectedSection.title,
          url: selectedSection.url,
          seasonId: seasonId,
        },
        selectedSection.id
      )
        .then((res) => {
          if (res.data.isValid) {
            toast.success("این بخش باموفقیت آپدیت شد.");
          } else {
            toast.error(res?.data?.statusMessage);
            return;
          }
        })
        .catch(() => {});
    }
  }

  function addSection(courseId, seasonId) {
    const selectedCourse = courses.find((el) => el.id === courseId);
    const selectedSeason = selectedCourse.seasons.find(
      (el) => el.id === seasonId
    );

    setCourses((prev) => [
      ...prev.filter((el) => el.id !== courseId),
      {
        ...selectedCourse,
        seasons: [
          ...selectedCourse.seasons.filter((item) => item.id !== seasonId),
          {
            ...selectedSeason,
            sections: [
              ...selectedSeason.sections,
              {
                new: true,
                id: uuid(),
                title: "",
                url: "",
              },
            ],
          },
        ],
      },
    ]);
  }

  //######################//
  //######################//
  //######################//

  const handleCoursePhotoChange = (event, courseId) => {
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

  function takeCoursesInfo() {
    setLoading(true);
    CourseServices.getAllTeacherCourses(userInfo?.userId)
      .then(async (res) => {
        if (res?.data?.length > 0) {
          const coursesPromises = res.data.map((item) =>
            CourseServices.getById(item.id)
              .then((response) => ({
                ...response?.data,
                new: false,
                seasons: response?.data?.seasons
                  ? response?.data?.seasons.map((season) => ({
                      ...season,
                      new: false,
                      sections: season?.sections ? season.sections : [],
                    }))
                  : [],
              }))
              .catch((err) => {
                toast.error(err.message);
                return null; // برای جلوگیری از کرش در صورت وجود خطا
              })
          );

          const temp = (await Promise.all(coursesPromises)).filter(
            (course) => course !== null // حذف مواردی که خطا داشته‌اند
          );
          setCourses(temp);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function takeCategories() {
    CategoriesServices.getAll()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error("مشکلی در دریافت کتگوری ها پیش آمده است");
      });
  }

  async function fetchData() {
    await Promise.all([takeCoursesInfo(), takeCategories()]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" w-full">
      <Accordion expanded>
        <AccordionSummary className="">دوره ها</AccordionSummary>
        <Divider />
        <AccordionDetails>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                width: 1,
                height: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={80} color="primary" />
            </Box>
          ) : (
            courses?.map((course) => (
              <Accordion className="my-20" key={course.id}>
                <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                  <div className="w-full flex flex-col items-center gap-6">
                    <div className="w-full flex items-center gap-6 course-wrapper">
                      <img
                        className="w-40 h-20"
                        src={
                          course?.imageBase64
                            ? `data:image/png;base64,${course?.imageBase64}`
                            : "https://archive.org/download/placeholder-image/placeholder-image.jpg"
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
                        <TextField
                          sx={{ width: 1 }}
                          label="تعویض عکس"
                          disabled={true}
                        />

                        <input
                          className="w-full h-full absolute left-0 top-0 "
                          type="file"
                          onChange={(e) =>
                            handleCoursePhotoChange(e, course.id)
                          }
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
                            Number(e.target.value)
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
                    <Accordion key={season.id} className="my-6">
                      <AccordionSummary
                        expandIcon={
                          <KeyboardArrowDownIcon
                            fontSize="large"
                            color="success"
                          />
                        }
                      >
                        <div className="w-full flex gap-10">
                          <TextField
                            onChange={(e) => {
                              handleSeasonItemChange(
                                "title",
                                course.id,
                                season.id,
                                e.target.value
                              );
                            }}
                            sx={{ width: 1 / 2 }}
                            value={season?.title}
                            variant="outlined"
                            label="نام فصل"
                          />
                          <TextField
                            sx={{ width: 1 / 2 }}
                            value={season?.seasonsDescription}
                            onChange={(e) => {
                              handleSeasonItemChange(
                                "seasonsDescription",
                                course.id,
                                season.id,
                                e.target.value
                              );
                            }}
                            variant="outlined"
                            label="توضیحات فصل"
                          />
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        {season?.sections.map((section) => (
                          <Accordion key={section.id}>
                            <AccordionSummary
                              expandIcon={
                                <KeyboardArrowDownIcon
                                  fontSize="large"
                                  color="success"
                                />
                              }
                            >
                              <TextField
                                sx={{ width: 1 / 2 }}
                                value={section?.title}
                                variant="outlined"
                                label="نام بخش"
                                onChange={(e) => {
                                  handleSectionItemChange(
                                    "title",
                                    course.id,
                                    season.id,
                                    section.id,
                                    e.target.value
                                  );
                                }}
                              />
                            </AccordionSummary>
                            <AccordionDetails className="flex items-center justify-around">
                              <video
                                src={section?.url}
                                width="400"
                                height="300"
                                controls
                                muted
                              />
                              <TextField
                                sx={{ width: 1 / 2 }}
                                value={section?.url}
                                onChange={(e) => {
                                  handleSectionItemChange(
                                    "url",
                                    course.id,
                                    season.id,
                                    section.id,
                                    e.target.value
                                  );
                                }}
                                variant="outlined"
                                label="لینک ویدیو"
                              />
                            </AccordionDetails>
                            <AccordionActions>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                  deleteSection(
                                    course.id,
                                    season.id,
                                    section.id
                                  );
                                }}
                              >
                                حذف بخش
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                  editeSection(
                                    course.id,
                                    season.id,
                                    section.id
                                  );
                                }}
                              >
                                ثبت تغییرات بخش
                              </Button>
                            </AccordionActions>
                          </Accordion>
                        ))}
                      </AccordionDetails>
                      <AccordionActions>
                        <Button
                          variant="contained"
                          onClick={() => {
                            addSection(course.id, season.id);
                          }}
                        >
                          افزودن بخش
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            deleteSeason(course.id, season.id);
                          }}
                        >
                          حذف فصل
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            editeSeason(course.id, season.id);
                          }}
                        >
                          ثبت تغییرات فصل
                        </Button>
                      </AccordionActions>
                    </Accordion>
                  ))}
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    variant="contained"
                    onClick={() => {
                      addSeason(course.id);
                    }}
                  >
                    افزودن فصل
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={deleteCourse.bind(null, course.id)}
                  >
                    حذف دوره
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      editeCourse(course.id);
                    }}
                  >
                    ثبت تغییرات دوره
                  </Button>
                </AccordionActions>
              </Accordion>
            ))
          )}
        </AccordionDetails>
        <AccordionActions>
          <Button
            variant="contained"
            onClick={() => {
              addCourse();
            }}
          >
            افزودن دوره
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

export default memo(CourseCompotent);
