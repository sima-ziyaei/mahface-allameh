import Layout from "@/components/Layout";
import t from '../../i18next/locales/fa/translation.json';
import { useCartContext } from "@/contexts/CartContext";

const cart = () => {
    const { cartItems, setCartItems } = useCartContext();
    const costs = cartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cost
    }, 0);

    console.log(costs)
    return (
        <Layout>
            <div className="container mx-auto mb-64 flex gap-6 justify-between">
                <div className="w-[-webkit-fill-available]">
                    <h1 className="my-6 text-2xl"> {t['cart']} ({cartItems.length}) {t['course']} </h1>
                    <div className="flex flex-col gap-4">
                        {cartItems?.map((course) => {
                            return (<div key={course.id} className="p-4 bg-white gap-4 flex border border-solid border-slate-300 rounded-xl">
                                <img
                                    src={`data:image/png;base64,${course.imageBase64}`}
                                    alt="course"
                                    className=" h-[100px] rounded-lg"
                                />
                                <div className=" flex flex-col justify-between  my-1">
                                    <h2 className="text-xl"> {course.title} </h2>
                                    <p className="text-slate-500"> {t['course-teacher']}:  {course.teacherName} </p>
                                </div>
                                <div className="mr-auto flex flex-col items-end justify-between">
                                    <img onClick={() => {
                                        setCartItems((prev) => prev.filter((el) => el.id !== course.id));
                                        localStorage.setItem('cart', JSON.stringify(cartItems.filter((el) => el.id !== course.id)))
                                    }} src="/assets/icons/close-circle.svg" className="cursor-pointer" />
                                    <p className="text-[#B41474]"> {course.cost} {t['tooman']}</p>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
                <div className="bg-white min-w-[400px] max-h-[245px] mt-20 p-4 rounded-2xl flex flex-col gap-6">
                    <div className="flex justify-between">
                        <p> {t['courses-cost']} </p>
                        <p> {costs} </p>
                    </div>
                    <div className="flex justify-between">
                        <p> {t['amount-payable']} </p>
                        <p> {costs} </p>
                    </div>
                    <button className="p-4 mt-auto w-full rounded-md bg-[#B41474] text-white text-xl">
                        {t['pay']}
                    </button>
                </div>

            </div>


        </Layout>
    )
};

export default cart;