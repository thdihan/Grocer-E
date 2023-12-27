import { Link } from "react-router-dom";
import classes from "../../../Style/Buyer/ProfileNav.module.css";
import img from "../../assets/user.jpg";
import { useAuthContext } from "../../../hooks/useAuthContext";
const ProfileNav = () => {
    const { newUser } = useAuthContext();
    return (
        <div className={`${classes["ProfileNav"]} bg-white px-3 py-3 border`}>
            <div
                className={`d-flex flex-column justify-content-center align-items-center py-4`}
            >
                <div className={`w-25 border border-2 rounded-circle`}>
                    <img
                        src={img}
                        alt=""
                        className={`img-fluid rounded-circle`}
                    />
                </div>
                <h6 className={`pt-2 fs-5`}>{newUser?.fullname}</h6>
                <p className={`p-0 text-secondary`}>{newUser?.email}</p>
            </div>

            <ul className={`p-0`}>
                <li>
                    <Link to={`/profile/`}>My Profile</Link>
                </li>
                <li>
                    <Link to={`/profile/orders`}>My Orders</Link>
                </li>
                <li>My List</li>
                <li>Reports</li>
            </ul>
        </div>
    );
};

export default ProfileNav;
