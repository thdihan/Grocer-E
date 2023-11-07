import { Link } from "react-router-dom";
import classes from "../../../Style/Buyer/Cart.module.css";
export default function Cart() {
    return (
        <section
            className={`${classes["cart-section"]} py-4`}
            style={{ background: "#dddddd8d" }}
        >
            <div className={`container border p-0 bg-white`}>
                <div
                    className={`${classes["cart-area-header"]} py-2 px-3  border-bottom`}
                >
                    <h3 className={`p-0 m-0`}>Cart</h3>
                </div>

                <div
                    className={`${classes["cart-area-table"]} px-3 py-2 table-responsive`}
                >
                    <table className={`w-100 border table my-5`}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Link to={`/product/:1`}>Basmoti Rice</Link>
                                </td>
                                <td>20 kg</td>
                                <td>120 tk</td>
                                <td>2400 tk</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className={`text-end `}>
                                    Sub Total
                                </td>
                                <td>2400 tk</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className={`text-end `}>
                                    Discount
                                </td>
                                <td>200 tk</td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={3}
                                    className={`text-end fw-semibold`}
                                >
                                    Total
                                </td>
                                <td className={`fw-semibold`}>2000 tk</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={`${classes["cart-area-btn"]} text-end pb-4`}>
                    <Link
                        className={`${classes["continue-shopping-btn"]} me-3`}
                    >
                        Continue Shopping
                    </Link>
                    <Link className={`${classes["checkout-btn"]} me-3`}>
                        Checkout
                    </Link>
                </div>
            </div>
        </section>
    );
}
