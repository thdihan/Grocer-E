import { Link } from "react-router-dom";

const OrderTable = ({ orderList }) => {
    console.log("orderList", orderList);

    return (
        <div className={`OrderTable`}>
            <div className={`table-responsive `}>
                <table className="w-100 table">
                    <thead>
                        <tr className="">
                            <th className="px-3 py-3">Order Id</th>
                            <th className="w-50 px-3 py-3">Customer Name</th>
                            <th className="px-3 py-3">Status</th>
                            <th className="px-3 py-3">
                                <input
                                    type="text"
                                    name="search"
                                    id=""
                                    className="w-100"
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList?.map((order, index) => (
                            <tr key={index} className="fw-semibold">
                                <td className="px-3 py-3 align-middle">
                                    #{order.order_id}
                                </td>
                                <td className="px-3 py-3 align-middle">
                                    {order.fullname}
                                </td>
                                <td className="px-3 py-3 align-middle">
                                    {order.status}
                                </td>
                                <td className="px-3 py-3 text-center">
                                    <Link
                                        to={`/admin/orders/singleOrder/${order.order_id}`}
                                        state={{ order }}
                                        className={`btn text-black fw-semibold`}
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;
