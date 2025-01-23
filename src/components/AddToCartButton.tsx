import { useCartContext } from "@/contexts/CartContext";
import t from "../../i18next/locales/fa/translation.json";
import { useRouter } from "next/router";

const AddToCartButton = ({ course }) => {
    const {setCartItems, cartItems } = useCartContext();
    const router = useRouter();

    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if(hasCourse()){
            router.push('/cart')
        } else {
            setCartItems((prev) => [...prev, course]);
            localStorage.setItem('cart', JSON.stringify([...cartItems, course]))
        }
    }

    const hasCourse = () => {
        return cartItems.some(e => e.id === course.id);
    }

    return (
        <button onClick={handleClick} className="bg-[#009CA7] hover:bg-[#1f848b] justify-between w-[210px] py-2 px-5 rounded-lg text-white self-center flex gap-2">{ hasCourse() ? t['view-cart']  : t['add-to-cart']}  <img className="brightness-0 invert" src="/assets/icons/shopping-cart.svg" /> </button>
    )
}

export default AddToCartButton;