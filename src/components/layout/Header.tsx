/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FC, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import { useRouter } from "next/router";
import Image from "next/image";
import userImage from "../../../public/assets/user.svg";
import toast from "react-hot-toast";
import { FaPowerOff } from "react-icons/fa6";
import { Button } from "@mui/material";

const Header: FC = () => {
  const [value, setValue] = useState<string>();
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.clear();
    toast(t["loged-out"]);
    router.push("/login");
  };

  const handleSearch = () => {
    
  }

  return (

    <div className="flex w-full justify-between items-center border-b border-solid border-gray-400 p-4  gap-4">
      
      <div
        onClick={() => router.push("/")}
        className="flex gap-4 cursor-pointer items-center"
      >
        <img src="/assets/allameh.png" height={32} width={52} alt="logo" />
        <p className="w-32 text-xl">{t["allame-kade"]}</p>
      </div>

      <div
        style={{ direction: "rtl" }}
        className="sm:relative rounded-t-3xl rounded-b-3xl border-[1.5px] border-solid border-gray-600 px-4 py-2  bg-white flex w-[50%] mx-8 justify-between focus:[&_input]:border-cyan-700"
      >
        <input
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          className="border-0 w-[calc(100%-52px)] focus:outline-none"
          type="text"
          placeholder={t["what-do-you-want-to-learn"]}
        />

        <img
        onClick={()=> handleSearch()}
          className="mr-4 cursor-pointer"
          src="/assets/search-normal.svg"
          alt="search"
        />
      </div>

      <div className="flex items-center justify-center gap-8">

        <Button
          variant="contained"
          onClick={() => router.push("/teacher")}
          size="large"
          sx={{ fontSize: 20, px: 4, backgroundColor: "#009CA7" }}
        >
          {t["teach"]}
        </Button>

        <a href="/cart">
          <img
            src="/assets/icons/shopping-cart.svg"
            width={36}
            className="ml-4"
          />
        </a>

        {router.pathname === "/signup" && (
          <Link href="/login">
            <div className="py-3 w-[120px] cursor-pointer border border-solid border-cyan-700 rounded-2xl  text-cyan-700 flex items-center justify-center hover:bg-cyan-700 hover:text-white">
              {t.login}
            </div>
          </Link>
        )}

        {router.pathname === "/login" && (
          <Link href="/signup">
            <div className="py-3 w-[120px] cursor-pointer border border-solid border-cyan-700 rounded-2xl  text-cyan-700 flex items-center justify-center hover:bg-cyan-700 hover:text-white">
              {t.signup}
            </div>
          </Link>
        )}

        {!["/login", "/signup"].includes(router.pathname) && (
          <Image src={userImage} alt="user profile" width={50} height={50} />
        )}

        {!["/login", "/signup"].includes(router.pathname) && (
          <div onClick={handleLogOut} className=" text-gray-500 cursor-pointer">
            <FaPowerOff />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
