import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function TeacherDialog({
  teacherDialogState,
  setTeacherDialogState,
  userInfo,
}) {
  const [editeMode, setEditeMode] = useState(false);
  const [courses, setCourses] = useState([
    {
      title: "برنامه نویسی",
      image: "",
      seasons: [
        {
          title: "",
          sections: [
            {
              title: "قسمت 1",
              video: "https://tekeye.uk/html/images/Joren_Falls_Izu_Jap.mp4",
            },
          ],
        },
      ],
    },
  ]);

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
                      userInfo?.base64Profile
                        ? `data:image/png;base64,${userInfo?.base64Profile}`
                        : "/assets/user.svg"
                    }
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
                <TextField
                  className="w-full"
                  label={"ادمین هستید؟"}
                  disabled={!editeMode}
                  value={userInfo?.isAdmin ? "بله" : "خیر"}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className=" w-full">
          <Accordion>
            <AccordionSummary className="">دوره ها</AccordionSummary>
            <Divider />
            <AccordionDetails>
              {courses.map((course) => (
                <Accordion>
                  <AccordionSummary>
                    <div>
                      <p>{course?.title}</p>
                      <img
                        src={
                          course?.image
                            ? `data:image/png;base64,${course?.image}`
                            : "https://faradars.org/_next/image?url=https%3A%2F%2…04%2F17%2F661fb59e9f446-fvpht9904.svg&w=1080&q=75"
                        }
                      />
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    {course?.seasons?.map((season) => (
                      <Accordion>
                        <AccordionSummary></AccordionSummary>
                        <AccordionDetails>
                          {season?.sections.map((section) => (
                            <Accordion>
                              <AccordionSummary>
                                {section.title}
                              </AccordionSummary>
                              <AccordionDetails>
                                <video
                                  src={section.video}
                                  width="200"
                                  height="200"
                                  controls
                                  muted
                                />
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
            <AccordionActions>
              <Button variant="contained">افزودن دوره</Button>
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
