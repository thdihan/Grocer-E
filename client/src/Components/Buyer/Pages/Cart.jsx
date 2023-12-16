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
        <section className={`${classes["cart-section"]}`}>
            <div className={`container py-5`}>
                <div className={`row gx-5`}>
                    <div
                        className={`${classes["cart-list"]} col col-12 col-md-9`}
                    >
                        <div
                            className={`px-4 py-3 border-bottom d-flex justify-content-between align-items-center bg-white border mb-3`}
                        >
                            <h5 className={`m-0`}>
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Cart
                            </h5>
                        </div>
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
                        <div className={` bg-white border rounded`}>
                            <div
                                className={`px-4 py-3 border-bottom d-flex justify-content-between align-items-center`}
                            >
                                <h5 className={`m-0`}>
                                    <i className="fa-solid fa-money-check-dollar pe-2"></i>
                                    Cart Summary
                                </h5>
                            </div>
                            <div className={`py-3 px-4`}>
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
                            </div>
                            <div className={`text-end pb-3 px-4`}>
                                {productCount > 0 && (
                                    <Link
                                        to={`/checkout`}
                                        className={`btn fw-semibold`}
                                    >
                                        Checkout{" "}
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
