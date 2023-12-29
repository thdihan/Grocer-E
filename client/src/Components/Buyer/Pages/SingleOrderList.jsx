import { useLocation } from "react-router-dom";
import classes from "../../../Style/Buyer/SingleOrderList.module.css";
import { formatDateAndTimeFromString } from "../../../utilities/utilities";

const SingleOrderList = () => {
    console.log(window.screen.width);
    const location = useLocation();
    console.log("location : ", location.state);
    const { order } = location.state;
    console.log("order : ", order);
    const {
        order_id,
        buyer_username,
        order_date,
        status,
        product_list,
        customer_details,
    } = order;
    return (
        <div className={`${classes["SingleOrderList"]} bg-white border`}>
            <div
                className={`px-4 py-3 border-bottom d-flex justify-content-between align-items-center`}
            >
                <h5 className={`m-0`}>
                    <i className="fa-solid fa-table-list pe-2"></i> Order Id: #
                    {order_id}
                </h5>
            </div>

            {/* Order information  */}
            <div className={`px-4 py-3 table-responsive`}>
                <h5>Order Information</h5>
                <table className={`table w-100`}>
                    <tbody>
                        <tr>
                            <th>Customer Name</th>
                            <td>{customer_details.full_name}</td>
                        </tr>

                        <tr>
                            <th>Customer Phone</th>
                            <td>{customer_details?.contact}</td>
                        </tr>
                        <tr>
                            <th>Customer Address</th>
                            <td>{customer_details.address}</td>
                        </tr>

                        <tr>
                            <th>Order Date</th>
                            <td>{formatDateAndTimeFromString(order_date)}</td>
                        </tr>
                        <tr>
                            <th>Order Total</th>
                            <td>
                                {product_list
                                    ?.reduce((acc, curr) => {
                                        console.log(
                                            "NUMBER: ",
                                            parseFloat(curr.discount)
                                        );
                                        const basePrice =
                                            parseFloat(curr.base_price) -
                                            (parseFloat(curr.base_price) *
                                                parseFloat(curr.discount)) /
                                                100.0;
                                        return acc + basePrice * curr.quantity;
                                    }, 0)
                                    .toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <th>Order Status</th>
                            <td>{status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={`px-4 py-3 table-responsive`}>
                <h5>Product Information</h5>
                <table className={`table w-100`}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Quantity</th>
                            <th>Product Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product_list?.map((product, index) => {
                            const basePrice =
                                parseFloat(product.base_price) -
                                (parseFloat(product.base_price) *
                                    parseFloat(product.discount)) /
                                    100.0;
                            return (
                                <tr key={index}>
                                    <td>{product.product_name}</td>
                                    <td>{basePrice.toFixed(2)}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        {(basePrice * product.quantity).toFixed(
                                            2
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SingleOrderList;
