import classes from "../../Style/Seller/SellerDashboardBody.module.css";
import Products from "./Pages/Products";
export default function SellerDashboardBody({ setActiveSidebar, children }) {
    return (
        <div
            className={`p-0 col col-12 col-md-10 ${classes["dashboard-body"]}`}
        >
            <div
                className={`${classes["dashboard-body-header"]} border-bottom px-2 container`}
            >
                <div className={`row px-4 bg-white`}>
                    <div className="col-1 col-md-0 menu-toggle d-flex d-md-none align-items-center">
                        <span
                            className="material-symbols-outlined fs-2 fw-bold"
                            onClick={() => {
                                setActiveSidebar((active) => !active);
                            }}
                        >
                            menu
                        </span>
                    </div>
                    <div className="col-11 col-md-12 user-profile d-flex justify-content-end p-0 align-items-center">
                        <p className="m-0 pe-2 py-3 ">User 1</p>
                        <span className="material-symbols-outlined">
                            logout
                        </span>
                    </div>
                </div>
            </div>

            {children}
        </div>
    );
}
