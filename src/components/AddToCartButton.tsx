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
        <button onClick={handleClick} className="bg-[#0E7490] hover:bg-[#1b667a] justify-between w-[200px] py-2 px-5 rounded-lg text-white self-center flex gap-3">{ hasCourse() ? t['view-cart']  : t['add-to-cart']}  <img className="brightness-0 invert" src="/assets/icons/shopping-cart.svg" /> </button>
    )
}

export default AddToCartButton;