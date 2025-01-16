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
        <button onClick={handleClick} className="bg-[#B41474] py-2 px-6 rounded-lg text-white self-center"> { hasCourse() ? t['view-cart']  : t['add-to-cart']}  </button>
    )
}

export default AddToCartButton;