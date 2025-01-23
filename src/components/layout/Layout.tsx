import { Toaster, toast } from "react-hot-toast";
import Header from "./Header";
import { useEffect } from "react";
import { useRouter } from "next/router";
import t from "../../../i18next/locales/fa/translation.json";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/login" && router.pathname !== "/signup") {
      if ([undefined, "",null].includes(localStorage.getItem("userInfo"))) {
        toast.error("حساب کاربری شما منقضی شده است.");
        router.push("/login");
      }
    }
  }, []);

  return (
    <div className="relative">
      <Header />

      {children}
      <Toaster position="bottom-left" />
      <Footer />
    </div>
  );
};

export default Layout;
