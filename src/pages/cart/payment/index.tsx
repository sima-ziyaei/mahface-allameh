import Layout from "@/components/layout/Layout";
import t from "../../../../i18next/locales/fa/translation.json";
import { useRouter } from "next/router";
import { useCartContext } from "@/contexts/CartContext";

const Payment = () => {
    const router = useRouter();
    const { setSolution, setCartItems } = useCartContext();
    const sendOrder = () => {
        setCartItems([]);
        localStorage.removeItem('cart')
        setSolution(true);
        router.push('/cart/paymentsolution')
    }

    return (<Layout>
        <div className="flex relative flex-col justify-center items-center w-[100%] my-36">
            <img src="/assets/sepeh2.png" />

            <div className="absolute bottom-[25px] flex gap-7">
                <button
                    onClick={sendOrder}
                    className="bg-[#0EC491] border-none w-[200px] h-[50px] text-[23px] text-white rounded-xl cursor-pointer hover:scale-[0.9]"
                >
                    {t['pay']}
                </button>
                <button
                    onClick={() => {
                        setSolution(false);
                        router.push("/cart/paymentsolution");
                    }}
                    className="bg-[#FCBF55] border-none w-[200px] h-[50px] text-[23px] text-white rounded-xl cursor-pointer hover:scale-[0.9]"
                >
                    {t['cancel']}
                </button>
            </div>
        </div>
    </Layout>)
}

export default Payment;