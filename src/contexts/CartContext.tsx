import { Course } from '@/models/course.model';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState<Course[]>([]);

    useEffect(() => {
        const cartItemsData = JSON.parse(localStorage.getItem('cart'))
        if (cartItemsData) {
            setCartItems(cartItemsData)
        }
    }, [])

    return (
        <CartContext.Provider value={{cartItems, setCartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext);
};