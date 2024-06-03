import { Toaster } from "react-hot-toast";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Toaster position="bottom-left" />
    </>
  );
};

export default Layout;
