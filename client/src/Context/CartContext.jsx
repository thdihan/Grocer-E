import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider(props) {
    const [productList, setProductList] = useState([]);
    const [priceTotal, setPriceTotal] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);
    const [productCount, setProductCount] = useState(0);

    function addProductToCart(product) {
        const tempProduct = [...productList];
        const index = tempProduct.findIndex(
            (item) => item.product_id === product.product_id
        );
        console.log("INDEX: ", index);
        if (index === -1) {
            setProductList((prev) => [...prev, product]);
            setPriceTotal((prev) => prev + product.base_price);
            setDiscountTotal((prev) => prev + product.discountTotal);
            setProductCount((prev) => prev + 1);
        }
    }

    function updatePriceAndDiscount(product, quantity) {
        const tempProduct = [...productList];
        const index = tempProduct.findIndex(
            (item) => item.product_id === product.product_id
        );
        tempProduct[index].quantity = quantity;
        const price = tempProduct.reduce((acc, pr) => {
            return acc + pr.base_price * pr.quantity;
        }, 0);
        const discount = tempProduct.reduce((acc, pr) => {
            return acc + pr.discountTotal * pr.quantity;
        }, 0);
        if (quantity === 0) {
            tempProduct.splice(index, 1);
            setProductCount((prev) => prev - 1);
        }
        setPriceTotal(parseFloat(price.toFixed(2)));
        setDiscountTotal(parseFloat(discount.toFixed(2)));
        setProductList(tempProduct);
    }

    const deleteProductFromCart = (product) => {
        const tempProduct = [...productList];
        const index = tempProduct.findIndex(
            (item) => item.product_id === product.product_id
        );
        tempProduct.splice(index, 1);
        setProductList(tempProduct);
        setProductCount((prev) => prev - 1);
    };
    const value = {
        productList,
        priceTotal,
        discountTotal,
        addProductToCart,
        productCount,
        updatePriceAndDiscount,
        deleteProductFromCart,
    };

    return (
        <CartContext.Provider value={value}>
            {props.children}
        </CartContext.Provider>
    );
}
