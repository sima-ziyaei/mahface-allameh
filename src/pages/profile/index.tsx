import Layout from "@/components/layout/Layout";
import {
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import ProfileInformation from "@/components/profile/ProfileInformation";
import UserCourses from "@/components/profile/UserCourses";

export enum ProfileState {
  Information = "information",
  Orders = "orders",
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState();

  const [profileState, setProfileState] = useState<ProfileState>(
    ProfileState.Information
  );

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  return (
    <Layout>
      <div className="flex ">
        <div className="px-6 py-4 min-h-[calc(100vh-102px)] bg-white w-[300px] border-l border-solid border-gray-200">
          <Avatar
            sx={{ width: "70px", height: "70px", margin: "0 auto" }}
            src={
              userInfo?.base64Profile
                ? `data:image/png;base64,${userInfo?.base64Profile}`
                : "/assets/user.svg"
            }
          />
          <div
            onClick={() => setProfileState(ProfileState.Information)}
            className="py-3 px-2 rounded-lg cursor-pointer mt-4 hover:bg-[rgba(0,156,167,0.1)]"
          >
            {t["profile-information"]}
          </div>
          <div
            onClick={() => setProfileState(ProfileState.Orders)}
            className="py-3 px-2 rounded-lg cursor-pointer mt-4 hover:bg-[rgba(0,156,167,0.1)]"
          >
            {t["my-courses"]}
          </div>
        </div>
        {profileState === ProfileState.Information ? (
          <ProfileInformation userInfo={userInfo} setUserInfo={setUserInfo} />
        ) : (
          <UserCourses />
        )}
      </div>
    </Layout>
  );
};

export default Profile;
