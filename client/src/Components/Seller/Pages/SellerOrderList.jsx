import { Link } from "react-router-dom";
import classes from "../../../Style/Seller/SellerOrderList.module.css";
import OrderTable from "../ProductsComponents/OrderTable";
import { useSellerGetAllOrder } from "../../../hooks/useSellerGetAllOrder";
import { useAuthContext } from "../../../hooks/useAuthContext";

const SellerOrderList = () => {
    const { user } = useAuthContext();
    const { orderList, orderLoading, orderError } = useSellerGetAllOrder(user);
    console.log("orderList", orderList);
    return (
        <div className={classes.SellerOrderList}>
            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                <h4 className={`m-0`}>Orders</h4>
            </div>

            {!orderLoading && !orderError ? (
                <OrderTable orderList={orderList} />
            ) : (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "50vh" }}
                >
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerOrderList;
