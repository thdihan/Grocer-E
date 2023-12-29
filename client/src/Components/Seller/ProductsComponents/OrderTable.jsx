import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderTable = ({ orderList }) => {
    console.log("orderList", orderList);

    const badgeColor = {
        Pending: "bg-danger",
        Approved: "bg-warning",
        Completed: "bg-success",
        Shipped: "bg-primary",
    };

    const [reverseOrderList, setReverseOrderList] = useState([]);
    useEffect(() => {
        // Reverse Order List
        const temp = orderList.reverse();
        setReverseOrderList(temp);
    }, [orderList]);

    const [search, setSearch] = useState("");
    const [filteredOrderList, setFilteredOrderList] = useState([]);
    useEffect(() => {
        if (reverseOrderList) {
            const filtered = reverseOrderList?.filter((order) =>
                order.order_id.includes(search)
            );
            setFilteredOrderList(filtered);
        }
    }, [search, reverseOrderList]);
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
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrderList?.map((order, index) => (
                            <tr key={index} className="fw-semibold">
                                <td className="px-3 py-3 align-middle">
                                    #{order.order_id}
                                </td>
                                <td className="px-3 py-3 align-middle">
                                    {order.customer_details.full_name}
                                </td>
                                <td className="px-3 py-3 align-middle">
                                    <span
                                        className={`badge ${
                                            badgeColor[order.status]
                                        }`}
                                    >
                                        {order.status}
                                    </span>
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
