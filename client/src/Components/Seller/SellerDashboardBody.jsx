import classes from "../../Style/Seller/SellerDashboardBody.module.css";
import Products from "./Pages/Products";
export default function SellerDashboardBody({ setActiveSidebar, children }) {
    return (
        <div
            className={`col col-12 col-md-10 ${classes["dashboard-body"]} container-fluid`}
        >
            <div
                className={`${classes["dashboard-body-header"]} row border-bottom py-2 px-2`}
            >
                <div className="col-1 menu-toggle d-block d-md-none">
                    <span
                        className="material-symbols-outlined fs-2 fw-bold"
                        onClick={() => {
                            setActiveSidebar((active) => !active);
                        }}
                    >
                        menu
                    </span>
                </div>
                <div className="col-11 col-md-12 user-profile text-end d-flex justify-content-end">
                    <p className="me-2">User 1</p>
                    <span className="material-symbols-outlined">logout</span>
                </div>
            </div>

            {children}
        </div>
    );
}
