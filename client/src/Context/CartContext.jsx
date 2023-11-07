import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider(props) {
    const [productList, setProductList] = useState([]);
    const [priceTotal, setPriceTotal] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);
    const [productCount, setProductCount] = useState(0);

    function addProductToCart(product) {
        setProductList((prev) => [...prev, product]);
        setPriceTotal((prev) => prev + product.price);
        setDiscountTotal((prev) => prev + product.discount);
        setProductCount((prev) => prev + 1);
    }

    const value = {
        productList,
        priceTotal,
        discountTotal,
        addProductToCart,
        productCount,
    };

    return (
        <CartContext.Provider value={value}>
            {props.children}
        </CartContext.Provider>
    );
}
