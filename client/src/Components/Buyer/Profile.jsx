import { Outlet } from "react-router-dom";
import classes from "../../Style/Buyer/Profile.module.css";
import ProfileNav from "./Pages/ProfileNav";
import UserInfo from "./Pages/UserInfo";

const Profile = () => {
    return (
        <div className={classes.Profile}>
            <div className={`container py-5`}>
                <div className={`row gx-3 gy-3`}>
                    <div className={`col col-12 col-md-3`}>
                        <ProfileNav />
                    </div>
                    <div className={`col col-12 col-md-9`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
