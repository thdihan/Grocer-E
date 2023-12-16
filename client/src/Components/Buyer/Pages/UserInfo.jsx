import { useState } from "react";
import classes from "../../../Style/Buyer/UserInfo.module.css";
import TextInput from "../../Common/FormComponents/TextInput";

const UserInfo = () => {
    const [editMode, setEditMode] = useState(false);

    const [profileInfo, setProfileInfo] = useState({
        name: "Tanvir Hossain Dihan",
        email: "username@gmail.com",
        contact: "017********",
        address:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, vero.",
    });

    // [ToDo] : Get data from hook.

    const handleEdit = (e) => {
        e.preventDefault();
        const tempObj = { ...profileInfo };
        tempObj[e.target.name] = e.target.value;
        setProfileInfo(tempObj);
    };

    const submitChange = (e) => {
        e.preventDefault();
        setEditMode((prev) => !prev);
        // [ToDo] : Send data to server
    };
    return (
        <div className={`${classes["UserInfo"]} bg-white border `}>
            <div
                className={`px-4 py-3 border-bottom d-flex justify-content-between align-items-center`}
            >
                <h5 className={`m-0`}>
                    <i className="fa-solid  fa-address-card pe-2"></i> Profile
                    Information
                </h5>
                {editMode ? (
                    <button
                        className={`btn fw-semibold`}
                        onClick={submitChange}
                    >
                        Confirm Change
                    </button>
                ) : (
                    <button
                        className={`btn btn-lite fw-semibold`}
                        onClick={() => {
                            setEditMode((prev) => !prev);
                        }}
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className={`px-4 py-3`}>
                <form className={`${classes["profile-form"]}`}>
                    <table className={`w-100`}>
                        <tr>
                            <td>Name:</td>
                            <td>
                                {editMode ? (
                                    <TextInput
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={profileInfo.name}
                                        onChange={handleEdit}
                                    />
                                ) : (
                                    "Tanvir Hossain Dihan"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>
                                {editMode ? (
                                    <TextInput
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={profileInfo.email}
                                        onChange={handleEdit}
                                    />
                                ) : (
                                    "username@gmail.com"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Contact:</td>
                            <td>
                                {editMode ? (
                                    <TextInput
                                        type="text"
                                        name="contact"
                                        placeholder="Enter your contact number."
                                        value={profileInfo.contact}
                                        onChange={handleEdit}
                                    />
                                ) : (
                                    "017********"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Default Address:</td>
                            <td>
                                {editMode ? (
                                    <TextInput
                                        type="text"
                                        name="address"
                                        placeholder="Enter your default address."
                                        value={profileInfo.address}
                                        onChange={handleEdit}
                                    />
                                ) : (
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, vero."
                                )}
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default UserInfo;
