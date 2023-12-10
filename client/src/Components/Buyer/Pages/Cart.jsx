import { Link } from "react-router-dom";
import classes from "../../../Style/Buyer/Cart.module.css";
import { useState } from "react";
import img from "../../../assets/rice.webp";
import SingleCartItem from "../SingleCartItem";
import { useCartContext } from "../../../hooks/useCartContext";
export default function Cart() {
    const [items, setItems] = useState(true);
    const { productList, priceTotal, discountTotal, productCount } =
        useCartContext();
    return (
        <section className={`${classes["cart-section"]} py-4`}>
            <div className={`container`}>
                <div className={`row gx-5`}>
                    <div
                        className={`${classes["cart-list"]} col col-12 col-md-9`}
                    >
                        {productCount === 0 && (
                            <div
                                className={`px-3 py-4 bg-white mb-3 border rounded-3`}
                            >
                                <h5 className={``}>
                                    No Items are added in Cart
                                </h5>
                            </div>
                        )}
                        {productCount > 0 &&
                            productList?.map((product, index) => (
                                <SingleCartItem key={index} product={product} />
                            ))}
                        {/* <SingleCartItem />
                        <SingleCartItem />
                        <SingleCartItem /> */}
                    </div>
                    <div className={`col col-12 col-md-3`}>
                        <div className={`py-3 px-4 bg-white border rounded`}>
                            <h6 className={`mb-3 text-green fw-bold`}>
                                Cart Summary
                            </h6>
                            <table className={`w-100`}>
                                <tr>
                                    <td>Total: </td>
                                    <td className={`text-end py-2`}>
                                        {priceTotal} tk
                                    </td>
                                </tr>
                                <tr>
                                    <td>Discount: </td>
                                    <td className={`text-end py-2`}>
                                        {discountTotal} tk
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sub-total: </td>
                                    <td className={`text-end py-2`}>
                                        {priceTotal - discountTotal} tk
                                    </td>
                                </tr>
                            </table>
                            <div className={`text-end`}>
                                {productCount > 0 && (
                                    <button className={`btn fw-semibold`}>
                                        Checkout{" "}
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
