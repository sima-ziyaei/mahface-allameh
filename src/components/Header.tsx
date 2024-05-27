/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FC, useState } from "react";
import t from "../../locales/en/translation.json";
import { useRouter } from "next/router";

const Header: FC = () => {
  const [value, setValue] = useState<string>();
  const router = useRouter();

  return (
    <div className="flex w-full justify-between border-b border-solid border-gray-400 p-4 ">
      <div onClick={()=>router.push('/')} className="flex gap-4">
        <img src="/assets/logo.jpeg" height={32} width={52} alt="logo" />
        <p className="w-max">{t.educational_system_of_allameh_tabatabaei_university}</p>
      </div>
      <div style={{direction: "rtl"}} className="sm:relative rounded-t-3xl rounded-b-3xl border-[1.5px] border-solid border-gray-600 px-4 py-2  bg-white flex w-[-webkit-fill-available] mx-8 justify-between focus:[&_input]:border-cyan-700">
        <input
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          className="border-0 w-[calc(100%-52px)] focus:outline-none"
          type="text"
          placeholder={t["what-do-you-want-to-learn"]}
        />

        <img
          className="mr-4 cursor-pointer"
          src="/assets/search-normal.svg"
          alt="search"
        />

      </div>
      <div className="py-3 px-2 border border-solid border-cyan-700 rounded-2xl w-[200px] text-cyan-700 flex items-center justify-center hover:bg-cyan-700 hover:text-white">

      <Link href="/login"> {t.login} </Link>
      </div>
    </div>
  );
};

export default Header;
