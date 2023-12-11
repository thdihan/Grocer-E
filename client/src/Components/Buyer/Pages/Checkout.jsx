import classes from "../../../Style/Buyer/Checkout.module.css";
import { useCartContext } from "../../../hooks/useCartContext";
import TextInput from "../../Common/FormComponents/TextInput";

const Checkout = () => {
    const { productList, priceTotal, discountTotal, productCount } =
        useCartContext();
    return (
        <div className={classes.Checkout}>
            <div className={`container py-5`}>
                <div className={`row gx-5 gy-3`}>
                    <div className={`col col-12 col-md-9`}>
                        <div className={`bg-white px-4 py-3 border`}>
                            <h6 className={`text-green fw-bold`}>Checkout </h6>
                            <form className={`${classes["checkout-form"]}`}>
                                <TextInput
                                    type="text"
                                    className="Full Name"
                                    labelText="Full Name"
                                    id="full-name"
                                    name="full-name"
                                />
                                <TextInput
                                    type="text"
                                    className="address"
                                    labelText="Address (House No, Road No, Area)"
                                    id="address"
                                    name="address"
                                />
                                <TextInput
                                    type="text"
                                    className="contact"
                                    labelText="Contact No."
                                    id="contact"
                                    name="contact"
                                />

                                <div
                                    className={`border-top border-3 py-2 my-2`}
                                >
                                    <h6>Payment Method</h6>
                                    <label htmlFor="cod">
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            id="cod"
                                            value={`cod`}
                                        />
                                        Cash on Delivery
                                    </label>
                                    <label htmlFor="cod">
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            id="cod"
                                            value={`cod`}
                                        />
                                        Bkash
                                    </label>
                                </div>
                                <div className={`text-end`}>
                                    <button
                                        type="submit"
                                        className={`btn btn-green`}
                                    >
                                        Place Order{" "}
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
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
        </div>
    );
};

export default Checkout;
