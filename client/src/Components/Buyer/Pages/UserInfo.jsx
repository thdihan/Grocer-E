import classes from "../../../Style/Buyer/UserInfo.module.css";
import TextInput from "../../Common/FormComponents/TextInput";

const UserInfo = () => {
    return (
        <div className={`${classes["UserInfo"]} bg-white border `}>
            <div
                className={`px-4 py-3 border-bottom d-flex justify-content-between align-items-center`}
            >
                <h5 className={`m-0`}>
                    <i className="fa-solid fa-address-card pe-2"></i> Profile
                    Information
                </h5>
                <button className={`btn btn-lite fw-semibold`}>
                    Edit Profile
                </button>
            </div>

            <div className={`px-4 py-3`}>
                <form className={`${classes["profile-form"]}`}>
                    <table className={`w-100`}>
                        <tr>
                            <td>Name:</td>
                            <td>Tanvir Hossain Dihan</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>username@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Contact:</td>
                            <td>017********</td>
                        </tr>
                        <tr>
                            <td>Default Address:</td>
                            <td>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Harum, vero., Lorem ipsum
                                dolor sit amet.
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default UserInfo;
