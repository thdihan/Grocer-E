import classes from "../../Style/Seller/SellerSidebar.module.css";
import SellerNavItems from "./SidebarComponents/SellerNavItems";
export default function SellerSidebar({ activeSidebar, setActiveSidebar }) {
    return (
        <div
            className={`col col-12 col-md-2 px-2 ${classes["sidebar"]} ${
                activeSidebar ? classes["active"] : ""
            } `}
        >
            <div
                className={` ${classes["sidebar-header"]} d-flex justify-content-between  items-center mt-3 px-3`}
            >
                <div className="logo">
                    <h2>Grocer-E</h2>
                </div>
                <div className="fs-2 close-button d-md-none d-block">
                    <span
                        onClick={() => {
                            setActiveSidebar((active) => !active);
                        }}
                        className="fs-2 material-symbols-outlined"
                    >
                        close
                    </span>
                </div>
            </div>

            <div className={`${classes["sidebar-element"]} mt-4`}>
                <ul>
                    <SellerNavItems icon="view_cozy" text="Dashboard" />
                    <SellerNavItems
                        icon="checklist"
                        text="Products"
                        to="/admin/products"
                    />
                    <SellerNavItems
                        icon="category"
                        text="Categories"
                        to="/admin/categories"
                    />
                    <SellerNavItems
                        icon="category"
                        text="Orders"
                        to="/admin/orders"
                    />
                </ul>
            </div>
        </div>
    );
}
