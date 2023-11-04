import { useState } from "react";
import classes from "../../Style/Seller/SellerDashboard.module.css";
import SellerSidebar from "./SellerSidebar";
import SellerDashboardBody from "./SellerDashboardBody";
export default function SellerDashboard() {
    const [activeSidebar, setActiveSidebar] = useState(false);
    return (
        <div className="row">
            <SellerSidebar
                activeSidebar={activeSidebar}
                setActiveSidebar={setActiveSidebar}
            />

            <SellerDashboardBody setActiveSidebar={setActiveSidebar} />
        </div>
    );
}
