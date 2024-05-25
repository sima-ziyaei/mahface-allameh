/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FC, useState } from "react";
import t from "../../locales/en/translation.json";

const Header: FC = () => {
  const [value, setValue] = useState<string>();

  return (
    <div className="flex w-full justify-between ">
      <Link href="/login"> {t.login} </Link>
      <div className="sm:relative rounded-t-3xl rounded-b-3xl border-[1.5px] border-solid border-[#7B56BD] px-4 py-2  bg-white flex">
        <img
          className="mr-4 cursor-pointer"
          src="/assets/search-normal.svg"
          alt="search"
        />

        <input
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          className="border-0 w-[calc(100%-52px)] focus:outline-none"
          type="text"
          placeholder="search"
        />
      </div>
      <div className="flex gap-4">
        <p>{t.educational_system_of_allameh_tabatabai_university}</p>
        <img src="/assets/ATU.svg.png" width={32} height={32} alt="logo" />
      </div>
    </div>
  );
};

export default Header;
