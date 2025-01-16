import Layout from "@/components/Layout";
import t from '../../i18next/locales/fa/translation.json';
import { useCartContext } from "@/contexts/CartContext";

const cart = () => {
    const { cartItems, setCartItems } = useCartContext();
    const costs = 
    console.log(cartItems)
    return (
        <Layout>
            <div className="container mx-auto mb-64 flex justify-between">
                <div className="w-[-webkit-fill-available]">
                    <h1 className="p-4"> {t['cart']} ({cartItems.length}) {t['course']} </h1>
                    <div className="flex flex-col gap-4 p-4">
                        {cartItems?.map((course) => {
                            return (<div key={course.id} className="p-4 gap-4 flex border border-solid border-slate-700 rounded-xl">
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
                                    }} src="/assets/icons/close-circle.svg" />
                                    <p className="text-[#B41474]"> {course.cost} {t['tooman']}</p>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
                <div className="bg-white shadow-lg p-4 rounded-2xl flex flex-col gap-6">
                        <div>
                            <p></p>
                            <p></p>
                        </div>
                </div>

            </div>


        </Layout>
    )
};

export default cart;