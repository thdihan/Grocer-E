import { useState } from "react";
import classes from "../../Style/Seller/SellerDashboard.module.css";
import SellerSidebar from "./SellerSidebar";
import SellerDashboardBody from "./SellerDashboardBody";
import { Outlet } from "react-router-dom";
export default function SellerDashboard() {
    const [activeSidebar, setActiveSidebar] = useState(false);
    return (
        <div className="row sellerDashboard">
            <SellerSidebar
                activeSidebar={activeSidebar}
                setActiveSidebar={setActiveSidebar}
            />

            <SellerDashboardBody setActiveSidebar={setActiveSidebar}>
                <Outlet />
            </SellerDashboardBody>
        </div>
    );
}
