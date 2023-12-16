import { Link } from "react-router-dom";
import classes from "../../../Style/Seller/SellerOrderList.module.css";
import OrderTable from "../ProductsComponents/OrderTable";

const SellerOrderList = () => {
    return (
        <div className={classes.SellerOrderList}>
            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                <h4 className={`m-0`}>Orders</h4>
            </div>

            <OrderTable />
        </div>
    );
};

export default SellerOrderList;
