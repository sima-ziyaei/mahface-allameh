import Layout from "@/components/layout/Layout";
import t from "../../../../i18next/locales/fa/translation.json";
import { useRouter } from "next/router";
import { useCartContext } from "@/contexts/CartContext";
import { CourseServices } from "@/services/Course";

const Payment = () => {
  const router = useRouter();
  const { setSolution, setCartItems, cartItems } = useCartContext();
  const sendOrder = () => {
    const userId = JSON.parse(localStorage.getItem("userInfo")).userId;
    const courseIds = cartItems.map((el) => {
      return el.id;
    });
    CourseServices.addStudentCourse({ userId: userId, requestIds: courseIds })
      .then(() => {
        setCartItems([]);
        localStorage.removeItem("cart");
        setSolution(true);
        router.push("/cart/paymentsolution");
      })
      .catch((err) => {});
  };

  return (
    <Layout>
      <div className="flex relative flex-col justify-center items-center w-[100%] my-36">
        <img src="/assets/sepeh2.png" />

        <div className="absolute bottom-[25px] flex gap-7">
          <button
            onClick={sendOrder}
            className="bg-[#0EC491] border-none w-[200px] h-[50px] text-[23px] text-white rounded-xl cursor-pointer hover:scale-[0.9]"
          >
            {t["pay"]}
          </button>
          <button
            onClick={() => {
              setSolution(false);
              router.push("/cart/paymentsolution");
            }}
            className="bg-[#FCBF55] border-none w-[200px] h-[50px] text-[23px] text-white rounded-xl cursor-pointer hover:scale-[0.9]"
          >
            {t["cancel"]}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
