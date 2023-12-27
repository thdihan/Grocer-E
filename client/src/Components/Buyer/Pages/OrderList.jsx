import { Link } from "react-router-dom";
import classes from "../../../Style/Buyer/OrderList.module.css";
import { useGetAllOrder } from "../../../hooks/useGetAllOrder";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { formatDateAndTimeFromString } from "../../../utilities/utilities";
const OrderList = () => {
    const { user } = useAuthContext();
    const { orderList, orderLoading, orderError } = useGetAllOrder(user);

    console.log("ORDER LIST : ", orderList);
    return (
        <div className={`${classes["OrderList"]} bg-white border`}>
            <div
                className={`px-4 py-3 border-bottom d-flex justify-content-between align-items-center`}
            >
                <h5 className={`m-0`}>
                    <i className="fa-solid fa-table-list pe-2"></i> Order List
                </h5>
            </div>

            <div className={`px-4 py-3 table-responsive`}>
                <table className={`table w-100`}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Order Total</th>
                            <th>Order Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!orderLoading && orderList?.length === 0 && (
                            <tr>
                                <td colSpan="5" className={`text-center`}>
                                    No order found
                                </td>
                            </tr>
                        )}
                        {orderLoading && (
                            <tr>
                                <td colSpan="5" className={`text-center`}>
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {orderError && (
                            <tr>
                                <td colSpan="5" className={`text-center`}>
                                    {orderError}
                                </td>
                            </tr>
                        )}

                        {!orderLoading &&
                            orderList?.length > 0 &&
                            orderList?.map((order, index) => {
                                const basePrice = order?.product_list?.reduce(
                                    (acc, curr) => {
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
                                    },
                                    0
                                );
                                return (
                                    <tr key={index}>
                                        <td>#{order.order_id}</td>
                                        <td>
                                            {formatDateAndTimeFromString(
                                                order.order_date
                                            )}
                                        </td>
                                        <td>{basePrice} tk</td>
                                        <td className={`fw-semibold`}>
                                            {order.status}
                                        </td>
                                        <td>
                                            <Link
                                                state={{ order }}
                                                to={`/profile/single-order-list`}
                                                className={`btn`}
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        {/* <tr>
                            <td>#2025422</td>
                            <td>12-12-2023</td>
                            <td>120 tk</td>
                            <td className={`fw-semibold`}>Pending</td>
                            <td>
                                <Link className={`btn`}>View Details</Link>
                            </td>
                        </tr>
                        <tr>
                            <td>#2025422</td>
                            <td>12-12-2023</td>
                            <td>120 tk</td>
                            <td className={`text-warning fw-semibold`}>
                                Approved
                            </td>
                            <td>
                                <Link className={`btn`}>View Details</Link>
                            </td>
                        </tr>
                        <tr>
                            <td>#2025422</td>
                            <td>12-12-2023</td>
                            <td>120 tk</td>
                            <td className={`text-info fw-semibold`}>Shipped</td>
                            <td>
                                <Link className={`btn`}>View Details</Link>
                            </td>
                        </tr>
                        <tr>
                            <td>#2025422</td>
                            <td>12-12-2023</td>
                            <td>120 tk</td>
                            <td className={`text-success fw-semibold`}>
                                Completed
                            </td>
                            <td>
                                <Link className={`btn`}>View Details</Link>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
