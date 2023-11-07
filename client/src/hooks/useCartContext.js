import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw Error("CartContext must be used inside CartContextProvider");
    }
    return context;
};
