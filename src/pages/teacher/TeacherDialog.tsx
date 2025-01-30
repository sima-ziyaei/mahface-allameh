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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PreviousMap from "postcss/lib/previous-map";
import React, {
  useState,
  useId,
  useEffect,
  useLayoutEffect,
  memo,
} from "react";
import { toast } from "react-hot-toast";
import { AccountServices } from "@/services/Account";
import { SectionServices } from "@/services/Section";
import { SeasonServices } from "@/services/Season";
import CourseComponent from "./CourseComponent";

export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function TeacherDialog({
  teacherDialogState,
  setTeacherDialogState,
  userInfo,
}) {
  // ######## STATES ##############//

  const [editeMode, setEditeMode] = useState(false);

  const [editeUserInfo, setEditeUserInfo] = useState(userInfo);

  function handleEditeUserInfoChange(field, value) {
    let temp = { ...userInfo };
    temp[field] = value;
    setEditeUserInfo(temp);
  }

  function submitUserInfoChange() {
    if (
      Object.values(editeUserInfo).includes("") ||
      Object.values(editeUserInfo).includes(null) ||
      Object.values(editeUserInfo).includes(undefined)
    ) {
      toast.error("پرکردن درست تمامی فیلدها ضروری است!");
      return "";
    }

    AccountServices.getEditProfile(userInfo.userId)
      .then((res) => {
        AccountServices.editProfile({
          id: editeUserInfo?.userId,
          firstname: editeUserInfo?.firstname,
          lastName: editeUserInfo?.lastName,
          birthDate: res?.data?.birthDate || new Date(),
          nationalCode: editeUserInfo?.nationalCode,
          phoneNumber: editeUserInfo?.phonNumber,
          base64Profile: editeUserInfo?.profileImageBase64,
          isTeacher: res.data.isTeacher,
        })
          .then((res) => {
            toast.success("اطلاعات کاربری با موفقیت تغییر یافت.");
            localStorage.set("userInfo", editeUserInfo);
            setEditeMode(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.title);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const handleUserPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setEditeUserInfo((prev) => ({
          ...prev,
          profileImageBase64: reader.result?.split(",")[1],
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      fullScreen
      open={teacherDialogState?.open}
      onClose={() => {
        setEditeMode(false);
        setTeacherDialogState({ open: false });
      }}
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
                <div className="flex gap-6 relative course-wrapper ">
                  <input
                    className="w-full h-full absolute left-0 top-0 z-100"
                    type="file"
                    disabled={!editeMode}
                    onChange={(e) => handleUserPhotoChange(e)}
                    accept="image/png, image/jpeg"
                  />

                  <Avatar
                    src={
                      editeUserInfo?.profileImageBase64
                        ? `data:image/png;base64,${editeUserInfo?.profileImageBase64}`
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
                  value={editeUserInfo?.firstname}
                  onChange={(e) => {
                    handleEditeUserInfoChange("firstname", e.target.value);
                  }}
                />
                <TextField
                  className="w-full"
                  label={"نام‌وخانوادگی"}
                  disabled={!editeMode}
                  value={editeUserInfo?.lastName}
                  onChange={(e) => {
                    handleEditeUserInfoChange("lastName", e.target.value);
                  }}
                />
                <TextField
                  className="w-full"
                  label={"کدملی"}
                  disabled={!editeMode}
                  value={editeUserInfo?.nationalCode}
                  onChange={(e) => {
                    handleEditeUserInfoChange("nationalCode", e.target.value);
                  }}
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
                  value={editeUserInfo?.email}
                  onChange={(e) => {
                    handleEditeUserInfoChange("email", e.target.value);
                  }}
                />
                <TextField
                  className="w-full"
                  label={"شماره تلفن"}
                  disabled={!editeMode}
                  value={editeUserInfo?.phoneNumber}
                  onChange={(e) => {
                    handleEditeUserInfoChange("phoneNumber", e.target.value);
                  }}
                />
                <Autocomplete
                  disablePortal
                  disabled={!editeMode}
                  value={editeUserInfo?.genderTypeString}
                  options={[0, 1, 2]}
                  getOptionLabel={(option) =>
                    option === 1 ? "مرد" : option === 0 ? "انتخاب نشده" : "زن"
                  }
                  style={{ width: "100% " }}
                  renderInput={(params) => (
                    <TextField {...params} label="جنسیت" />
                  )}
                  onChange={(e, newValue) => {
                    handleEditeUserInfoChange("genderTypeString", newValue);
                  }}
                />
              </Box>
            </AccordionDetails>
            <AccordionActions>
              <Button
                color="secondary"
                disabled={!editeMode}
                variant="contained"
                onClick={() => submitUserInfoChange()}
              >
                ثبت تغییرات پروفایل استاد
              </Button>
            </AccordionActions>
          </Accordion>
        </div>
        <CourseComponent />
      </DialogContent>

      <DialogActions className="bg-blue-200">
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            setEditeMode(false);
            setTeacherDialogState({ open: false });
          }}
        >
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TeacherDialog;
