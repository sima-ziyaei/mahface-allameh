/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FC, useState } from "react";
import t from "../../../i18next/locales/fa/translation.json";
import { useRouter } from "next/router";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import SearchInput from "./SearchInput";
import MegaMenu from "./MegaMenu";

const Header: FC = () => {
  const [open, setOpen] = useState<boolean>();
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.clear();
    toast(t["loged-out"]);
    router.push("/login");
  };

  return (

    <div className="flex w-full justify-between items-center border-b border-solid border-gray-400 p-4  gap-3  sticky top-0 z-10 bg-white">
      
      <div
        onClick={() => router.push("/")}
        className="flex gap-4 cursor-pointer items-center"
      >
        <img src="/assets/allameh.png" height={32} width={52} alt="logo" />
        <p className="w-32 text-xl">{t["allame-kade"]}</p>
      </div>

      <MegaMenu />

      <SearchInput />

      <div className="flex items-center justify-center gap-8">
        <Button
          variant="contained"
          onClick={() => router.push("/teacher")}
          size="large"
          sx={{ fontSize: 20, px: 3, backgroundColor: "#009CA7" }}
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
          <div className="relative">
            <Image
              onClick={() => setOpen(!open)}
              src={"/assets/user.png"}
              className="cursor-pointer"
              alt="user profile"
              width={70}
              height={70}
            />

            {open && (
              <div className="absolute left-0 shadow-[] w-[150px] bg-white rounded-md">
                <a href="/profile" className="p-4 flex justify-between hover:bg-[rgba(0,156,167,0.1)]">
                  {t["profile"]}
                  <img width={20} src="/assets/icons/user.svg" />

                  </a>
                <div onClick={handleLogOut} className="p-4 flex justify-between hover:bg-[rgba(0,156,167,0.1)]">
                  {t["logout"]}
                  <img width={20} src="/assets/icons/logout.svg" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* {!["/login", "/signup"].includes(router.pathname) && (
          <div onClick={handleLogOut} className=" text-gray-500 cursor-pointer">
            <FaPowerOff />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Header;
