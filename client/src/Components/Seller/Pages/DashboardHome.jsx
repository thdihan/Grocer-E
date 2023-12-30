import { useEffect, useState } from "react";
import classes from "../../../Style/Seller/DashboardHome.module.css";
import SellerApi from "../../../apis/SellerApi";
import UserApi from "../../../apis/UserApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useGetProductStatusCount from "../../../hooks/useGetProductStatusCount";
import { formatDateAndTimeFromString } from "../../../utilities/utilities";

const DashboardHome = () => {
    const { productStatusCount, loading, error } = useGetProductStatusCount();
    console.log("productStatusCount", productStatusCount);
    const [pending, setPending] = useState(0);
    const [onShipment, setOnShipment] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [retention, setRetention] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuthContext();
    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await SellerApi.get("/get-notifications", {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                });
                setNotifications(response.data.notifications);
                console.log("NOTIFICATIONS : ", response.data);
            } catch (error) {
                console.log("NOTIFICATION FETCH ERROR: ", error.response.data);
            }
        }
        fetchNotifications();
    }, [user]);

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

    useEffect(() => {
        async function fetchRetention() {
            try {
                const response = await UserApi.get("get-retention-details");
                console.log("RETENTION : ", response?.data);
                const {
                    current_month_customer_count,
                    last_month_customer_count,
                    retained_customer_count,
                    retention_rate,
                } = response?.data;

                setRetention(retention_rate);
            } catch (error) {
                console.log("RETENTION ERROR: ", error?.response?.data);
            }
        }
        fetchRetention();
    }, []);
    const iconList = {
        Checked: "fa-solid fa-trash text-danger",
        "Not Checked": "fa-solid fa-circle-check text-success",
    };

    const handleCheck = async (order_id) => {
        try {
            const response = await SellerApi.put(
                "/check-notifications",
                { order_id },
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("CHECK NOTIFICATIONS: ", response.data.notifications);

            const tempNotifications = [...notifications];
            const index = tempNotifications.findIndex(
                (notification) => notification.order_id === order_id
            );
            tempNotifications[index].status = "checked";
            setNotifications(tempNotifications);
        } catch (error) {
            console.log("CHECK NOTIFICATION ERROR: ", error.response.data);
        }
    };

    const handleDelete = async (order_id) => {
        try {
            const response = await SellerApi.delete(
                `/delete-notifications?order_id=${order_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("DELETE NOTIFICATIONS: ", response.data.notifications);
            const tempNotifications = [...notifications];
            const index = tempNotifications.findIndex(
                (notification) => notification.order_id === order_id
            );
            tempNotifications.splice(index, 1);
            setNotifications(tempNotifications);
        } catch (error) {
            console.log("DELETE NOTIFICATION ERROR: ", error.response.data);
        }
    };
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
                        <h1 className="m-0">{retention}%</h1>
                    </div>
                </div>
            </div>

            <div
                className={`${classes["notification-table"]} table-responsive mt-5 bg-white border px-4 py-3`}
            >
                <h4 className="mb-3">Notification Table</h4>
                <table className={`table w-100`}>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Customer Name</th>
                            <th>Order Date & Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications &&
                            notifications.map((notification) => (
                                <tr key={notification.notification_id}>
                                    <td>{notification.order_id}</td>
                                    <td>{notification.customer_name}</td>
                                    <td>
                                        {formatDateAndTimeFromString(
                                            notification.order_date
                                        )}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${
                                                notification.status ===
                                                "checked"
                                                    ? "bg-success"
                                                    : "bg-danger"
                                            }`}
                                        >
                                            {notification.status === "checked"
                                                ? "Checked"
                                                : "Not Checked"}
                                        </span>
                                    </td>
                                    <td>
                                        <i
                                            onClick={() =>
                                                notification.status ===
                                                "checked"
                                                    ? handleDelete(
                                                          notification.order_id
                                                      )
                                                    : handleCheck(
                                                          notification.order_id
                                                      )
                                            }
                                            className={`${
                                                notification.status ===
                                                "checked"
                                                    ? iconList["Checked"]
                                                    : iconList["Not Checked"]
                                            }`}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardHome;
