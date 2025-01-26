import Layout from "@/components/layout/Layout";
import {
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import ProfileInformation from "@/components/profile/ProfileInformation";
import UserCourses from "@/components/profile/UserCourses";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Favorites from "@/components/profile/Favorites";

export enum ProfileState {
  Information = "information",
  Orders = "orders",
  Favorites = 'favorites'
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();
  const [profileState, setProfileState] = useState<ProfileState>(
    ProfileState.Information
  );

  const handleLogOut = () => {
    localStorage.clear();
    toast(t["loged-out"]);
    router.push("/login");
  };

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
            className="py-3 px-2 rounded-lg flex gap-2 cursor-pointer mt-4 hover:bg-[rgba(0,156,167,0.1)]"
          >
            <img src="/assets/icons/user.svg" />
            {t["profile-information"]}
          </div>
          <div
            onClick={() => setProfileState(ProfileState.Orders)}
            className="py-3 px-2 rounded-lg flex gap-2 cursor-pointer mt-4 hover:bg-[rgba(0,156,167,0.1)]"
          >
            <img src="/assets/icons/courses.svg" />
            {t["my-courses"]}
          </div>
          <div
            onClick={() => setProfileState(ProfileState.Favorites)}
            className="py-3 px-2 rounded-lg flex gap-2 cursor-pointer mt-4 hover:bg-[rgba(0,156,167,0.1)]"
          >
            <img src="/assets/icons/lovely.svg" />
            {t["my-favorites"]}
          </div>
          <div
            onClick={handleLogOut}
            className="py-3 px-2 rounded-lg flex gap-2 cursor-pointer mt-4 hover:bg-[rgba(0,156,167,0.1)]"
          >
            <img src="/assets/icons/logout.svg" />
            {t["logout"]}
          </div>
        </div>
        {profileState === ProfileState.Information ? (
          <ProfileInformation userInfo={userInfo} setUserInfo={setUserInfo} />
        ) : profileState === ProfileState.Orders?  (
          <UserCourses />
        ) : <Favorites  />}
      </div>
    </Layout>
  );
};

export default Profile;
