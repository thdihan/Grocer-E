import { createContext, useEffect, useState } from "react";
import BuyerApi from "../apis/BuyerApi";

export const CartContext = createContext();

export function CartContextProvider(props) {
  const [productList, setProductList] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [cart_id, setCart_id] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [cartProductLoading, setCartProductLoading] = useState(false);
  const [cartProductError, setCartProductError] = useState(null);
  useEffect(() => {
    async function getCart() {
      try {
        setCartProductLoading(true);
        /** GET CURRENT CART */
        const response = await BuyerApi.get("/get-cart", {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        });
        console.log("GET CURRENT CART RESPONSE : ", response);
        setProductList(response.data.cart.product_list);
        setPriceTotal(parseFloat(response.data.cart.total_price));
        setDiscountTotal(parseFloat(response.data.cart.discount_total));
        setProductCount(parseInt(response.data.cart.product_count));
        setCart_id(response.data.cart.cart_id);
        setCartProductLoading(false);
      } catch (error) {
        console.log("GET CURRENT CART ERROR : ", error);
        setCartProductError(error);
        setCartProductLoading(false);
      }
    }

    getCart();
  }, [user]);

  async function addProductToCart(product) {
    const tempProduct = [...productList];
    const index = tempProduct.findIndex(
      (item) => item.product_id === product.product_id
    );
    // console.log("INDEX: ", index);
    if (index === -1) {
      setProductList((prev) => [...prev, product]);
      setPriceTotal((prev) => prev + parseFloat(product.base_price));
      setDiscountTotal((prev) => prev + parseFloat(product.discountTotal));
      setProductCount((prev) => prev + 1);

      try {
        /** ADD TO CART */
        console.log("cart_id checker : ", cart_id);
        const response = await BuyerApi.post(
          "/add-to-cart",
          {
            productList: [...productList, product],
            priceTotal: priceTotal + parseFloat(product.base_price),
            discountTotal: discountTotal + parseFloat(product.discountTotal),
            productCount: productCount + 1,
            cart_id: cart_id,
          },
          {
            headers: {
              Authorization: `Bearer ${user}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCart_id(response.data.cart.cart_id);
        console.log("ADD TO CART RESPONSE : ", response);
      } catch (error) {
        // console.log("ADD TO CART ERROR : ", error);
      }
    }
  }

  async function updatePriceAndDiscount(product, quantity) {
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

    try {
      /** UPDATE CART */
      const response = await BuyerApi.put(
        "/update-cart",
        { product_id: product.product_id, cart_id, quantity },
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("UPDATE CART ERROR : ", error);
    }
  }

  const clearContext = () => {
    setProductList([]);
    setPriceTotal(0);
    setDiscountTotal(0);
    setProductCount(0);
    setCart_id(null);
  };
  const value = {
    productList,
    priceTotal,
    discountTotal,
    addProductToCart,
    productCount,
    updatePriceAndDiscount,
    clearContext,
    cart_id,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
}
