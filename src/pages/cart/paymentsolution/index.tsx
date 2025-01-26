import Layout from "@/components/layout/Layout";
import t from "../../../../i18next/locales/fa/translation.json";
import { useCartContext } from "@/contexts/CartContext";

const PaymentSolution = () => {
    const { solution } = useCartContext();
    return (<Layout>
        <div className="mt-64 mb-28 flex items-center justify-center">
            {solution ?
                <div className="w-[30%] flex flex-col "> <img width={60} src="/assets/icons/CheckCircle.svg" className="ml-6 mb-6" /><span className="text-3xl mt-2"> {t['success-pay']} </span> </div>
                :
                <div className="w-[30%] flex flex-col "> <img width={60} src="/assets/icons/XCircle.svg" className="ml-6 mb-6" /><span className="text-3xl mt-2"> {t['failed-pay']} </span></div>
            }
        </div>
    </Layout>)
}

export default PaymentSolution;