import { useLocation } from "react-router-dom";
import classes from "../../../Style/Buyer/SingleOrderList.module.css";

const SingleOrderList = () => {
    const location = useLocation();
    console.log("location : ", location.state);
    const { order } = location.state;
    console.log("order : ", order);
    const {
        order_id,
        buyer_username,
        order_date,
        order_total,
        order_status,
        product_list,
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
                            <td>{buyer_username}</td>
                        </tr>
                        <tr>
                            <th>Customer Email</th>
                            <td>Customer Email</td>
                        </tr>
                        <tr>
                            <th>Customer Phone</th>
                            <td>Customer Phone</td>
                        </tr>
                        <tr>
                            <th>Customer Address</th>
                            <td>Customer Address</td>
                        </tr>

                        <tr>
                            <th>Order Date</th>
                            <td>12/12/2021</td>
                        </tr>
                        <tr>
                            <th>Order Total</th>
                            <td>5000</td>
                        </tr>
                        <tr>
                            <th>Order Status</th>
                            <td>Delivered</td>
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
                        <tr>
                            <td>Product Name</td>
                            <td>Product Price</td>
                            <td>Product Quantity</td>
                            <td>Product Total</td>
                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>Product Price</td>
                            <td>Product Quantity</td>
                            <td>Product Total</td>
                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>Product Price</td>
                            <td>Product Quantity</td>
                            <td>Product Total</td>
                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>Product Price</td>
                            <td>Product Quantity</td>
                            <td>Product Total</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SingleOrderList;
