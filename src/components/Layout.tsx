import { Toaster, toast } from "react-hot-toast";
import Header from "./Header";
import { useEffect } from "react";
import { useRouter } from "next/router";
import t from "../../i18next/locales/fa/translation.json";

const Layout = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
  
    if (router.pathname !== "/login" && router.pathname !== "/signup") {
      if (
        [null,"",undefined].includes(localStorage.getItem("accessToken")) && [null,"",undefined].includes(localStorage.getItem("refreshToken"))
      ) {
        console.log("first")
        toast.error(t["account-expired"])
        router.push("/login");
      }
    }
  }, []);
  return (
    <>
      <Header />
      {children}
      <Toaster position="bottom-left" />
    </>
  );
};

export default Layout;
