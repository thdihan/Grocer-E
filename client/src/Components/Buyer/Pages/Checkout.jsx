import classes from "../../../Style/Buyer/Checkout.module.css";
import BuyerApi from "../../../apis/BuyerApi";
import { useCartContext } from "../../../hooks/useCartContext";
import TextInput from "../../Common/FormComponents/TextInput";
import { useAuthContext } from "../../../hooks/useAuthContext";
const Checkout = () => {
    const {
        productList,
        priceTotal,
        discountTotal,
        productCount,
        cart_id,
        clearContext,
    } = useCartContext();
    const { user } = useAuthContext();

    // [Todo] : Input must be cleared after order is placed
    const placeOrder = async (e) => {
        e.preventDefault();
        console.log(e.target);
        const customer_details = {
            full_name: e.target["full-name"].value,
            address: e.target["address"].value,
            contact: e.target["contact"].value,
        };
        try {
            /** CONFIRM ORDER */
            const response = await BuyerApi.post(
                "/confirm-order",
                { cart_id, customer_details },
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("CONFIRM ORDER RESPONSE : ", response);
            clearContext();
        } catch (error) {
            console.log("CONFIRM ORDER ERROR : ", error);
        }
    };
    return (
        <div className={classes.Checkout}>
            <div className={`container py-5`}>
                <div className={`row gx-5 gy-3`}>
                    <div className={`col col-12 col-md-9`}>
                        <div className={`bg-white border`}>
                            <div
                                className={`px-4 py-3 border-bottom d-flex justify-content-between align-items-center`}
                            >
                                <h5 className={`m-0`}>
                                    <i className="fa-regular fa-credit-card pe-2"></i>
                                    Checkout
                                </h5>
                            </div>
                            <form
                                className={`${classes["checkout-form"]} px-4 py-3`}
                                onSubmit={placeOrder}
                            >
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

                                <div className={` py-2 my-2`}>
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
                                <table className={`w-100 `}>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
