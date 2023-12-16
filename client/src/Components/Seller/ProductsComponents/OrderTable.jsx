import { Link } from "react-router-dom";

const OrderTable = () => {
    return (
        <div className={`OrderTable`}>
            <div className={`table-responsive `}>
                <table className="w-100 table">
                    <thead>
                        <tr className="">
                            <th className="px-3 py-3">Order Id</th>
                            <th className="w-50 px-3 py-3">Customer Name</th>
                            <th className="px-3 py-3">Total Price</th>
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
                        <tr className="fw-semibold">
                            <td className="px-3 py-3 align-middle">#1234</td>
                            <td className="px-3 py-3 align-middle">
                                Shajeed Hossain
                            </td>
                            <td className="px-3 py-3 align-middle">1200 tk</td>
                            <td className="px-3 py-3 align-middle">
                                Pending...
                            </td>
                            <td className="px-3 py-3 text-center">
                                <Link
                                    to={`/admin/orders/singleOrder`}
                                    className={`btn`}
                                >
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;
