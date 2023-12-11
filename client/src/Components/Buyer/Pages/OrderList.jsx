import { Link } from "react-router-dom";
import classes from "../../../Style/Buyer/OrderList.module.css";

const OrderList = () => {
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
                        <tr>
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
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
