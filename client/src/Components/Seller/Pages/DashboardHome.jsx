import { useEffect, useState } from "react";
import classes from "../../../Style/Seller/DashboardHome.module.css";
import useGetProductStatusCount from "../../../hooks/useGetProductStatusCount";

const DashboardHome = () => {
    const { productStatusCount, loading, error } = useGetProductStatusCount();
    console.log("productStatusCount", productStatusCount);
    const [pending, setPending] = useState(0);
    const [onShipment, setOnShipment] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [retention, setRetention] = useState(0);

    useEffect(() => {
        if (productStatusCount) {
            productStatusCount?.map((item) => {
                const count = parseInt(item.count);
                if (item.status === "Pending") {
                    setPending((prev) => prev + count);
                } else if (item.status === "Approved") {
                    setPending((prev) => prev + count);
                } else if (item.status === "Shipped") {
                    setOnShipment((prev) => prev + count);
                } else if (item.status === "Completed") {
                    setCompleted((prev) => prev + count);
                }
            });
        }
    }, [productStatusCount]);

    return (
        <div className={`${classes["Home"]} px-3 py-3`}>
            <div
                className={`${classes["reports"]} cards d-flex justify-content-between `}
            >
                <div
                    className={`${classes["report"]}   card px-4 py-3 bg-danger border border-danger text-white`}
                >
                    <div className={`${classes["report-title"]} card-title`}>
                        <h4 className="m-0">Pending Orders</h4>
                    </div>
                    <div className={`${classes["report-body"]} card-body`}>
                        <h1 className="m-0">{pending}</h1>
                    </div>
                </div>
                <div
                    className={`${classes["report"]}  card px-4 py-3 bg-warning border border-warning text-white`}
                >
                    <div className={`${classes["report-title"]} card-title`}>
                        <h4 className="m-0">On Shipment</h4>
                    </div>
                    <div className={`${classes["report-body"]} card-body`}>
                        <h1 className="m-0">{onShipment}</h1>
                    </div>
                </div>
                <div
                    className={`${classes["report"]}  card px-4 py-3 bg-success border border-success text-white`}
                >
                    <div className={`${classes["report-title"]} card-title`}>
                        <h4 className="m-0">Completed Order</h4>
                    </div>
                    <div className={`${classes["report-body"]} card-body`}>
                        <h1 className="m-0">{completed}</h1>
                    </div>
                </div>
                <div
                    className={`${classes["report"]}  card px-4 py-3 bg-primary border border-primary text-white`}
                >
                    <div className={`${classes["report-title"]} card-title`}>
                        <h4 className="m-0">Retention Rate</h4>
                    </div>
                    <div className={`${classes["report-body"]} card-body`}>
                        <h1 className="m-0">10</h1>
                    </div>
                </div>
            </div>

            <div
                className={`${classes["notification-table table-responsive"]} mt-5 bg-white border px-4 py-3`}
            >
                <h4 className="mb-3">Notification Table</h4>
                <table className={`table w-100`}>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Customer Name</th>
                            <th>Order Date & Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>12/12/2021</td>
                            <td>
                                <span className="badge bg-danger">
                                    Not Checked
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>12/12/2021</td>
                            <td>
                                <span className="badge bg-success">
                                    Checked
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardHome;
