import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import { AccountServices } from "@/services/Account";

const ProfileInformation = ({ userInfo, setUserInfo }) => {
  const [editeMode, setEditeMode] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    firstname: userInfo?.firstname,
    lastName: userInfo?.lastName,
    nationalCode: userInfo?.nationalCode,
    email: userInfo?.email,
    phoneNumber: userInfo?.phoneNumber,
    gender: userInfo?.gender,
    id: userInfo?.id,
  });

  const editUser = () => {
    AccountServices.editProfile(userData).then((res)=>{
      localStorage.setItem('userInfo', JSON.stringify(userData))
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    });

  };

  useEffect(() => {
    setUserData({
      firstname: userInfo?.firstname,
      lastName: userInfo?.lastName,
      nationalCode: userInfo?.nationalCode,
      email: userInfo?.email,
      phoneNumber: userInfo?.phoneNumber,
      gender: userInfo?.gender,
      id: userInfo?.id,
    });
  }, [userInfo]);

  const handleChange = (field, value) => {
    let userTemp = { ...userData };
    userTemp[field] = value;
    setUserData(userTemp);
  };

  return (
    <div className=" w-full p-4 ">
      <Accordion expanded={true}>
        <AccordionSummary>
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-6">
              <span className="text-3xl"> {t["profile-information"]} </span>
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
              onChange={(e) => handleChange("firstname", e.target.value)}
              value={userData?.firstname || ''}
            />
            <TextField
              className="w-full"
              label={"نام‌وخانوادگی"}
              disabled={!editeMode}
              onChange={(e) => handleChange("lastName", e.target.value)}
              value={userData?.lastName || ''}
            />
            <TextField
              className="w-full"
              label={"کدملی"}
              disabled={!editeMode}
              onChange={(e) => handleChange("nationalCode", e.target.value)}
              value={userData?.nationalCode || ''}
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
              onChange={(e) => handleChange("email", e.target.value)}
              value={userData?.email || ''}
            />
            <TextField
              className="w-full"
              label={"شماره تلفن"}
              disabled={!editeMode}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              value={userData?.phoneNumber || ''}
            />
            <TextField
              className="w-full"
              label={"ادمین هستید؟"}
              disabled={!editeMode}
              value={userInfo?.isAdmin ? "بله" : "خیر"}
            />
          </Box>
        </AccordionDetails>
        <AccordionActions>
          <button
            disabled={!editeMode}
            onClick={editUser}
            className="bg-[#009CA7] ml-2 disabled:cursor-not-allowed hover:bg-[#1f848b] py-2 px-6 rounded-lg text-white self-center flex items-center justify-center"
          >
            {t["save-changes"]}
          </button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default ProfileInformation;
