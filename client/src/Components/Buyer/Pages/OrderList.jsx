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
        </div>
    );
};

export default OrderList;
