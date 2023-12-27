import { useEffect, useState } from "react";
import classes from "../../../Style/Buyer/UserInfo.module.css";
import TextInput from "../../Common/FormComponents/TextInput";
import useGetProfileInfo from "../../../hooks/useGetProfileInfo";
import { useAuthContext } from "../../../hooks/useAuthContext";
import BuyerApi from "../../../apis/BuyerApi";
const UserInfo = () => {
    const [editMode, setEditMode] = useState(false);
    const { user } = useAuthContext();
    const { profile, loading } = useGetProfileInfo(user);
    const [profileInfo, setProfileInfo] = useState();
    useEffect(() => {
        const tempProfile = {
            fullname: profile?.user?.fullname,
            email: profile?.user?.email,
            contact: profile?.user?.contact,
            address: profile?.user?.address,
        };
        setProfileInfo(tempProfile);
    }, [profile]);

    // [ToDo] : Get data from hook.

    const handleEdit = (e) => {
        e.preventDefault();
        const tempObj = { ...profileInfo };
        tempObj[e.target.name] = e.target.value;
        setProfileInfo(tempObj);
    };

    const submitChange = async (e) => {
        e.preventDefault();
        setEditMode((prev) => !prev);
        // [ToDo] : Send data to server
        console.log("Update Profile Info : ", profileInfo);
        try {
            const response = await BuyerApi.put(
                "/update-profile-info",
                profileInfo,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("PROFILE UPDATED : ", response);
        } catch (error) {
            console.log(error);
        }
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
                                        name="fullname"
                                        placeholder="Enter your name"
                                        value={profileInfo.fullname}
                                        onChange={handleEdit}
                                    />
                                ) : (
                                    profileInfo?.fullname
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
                                    profileInfo?.email
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
                                    profileInfo?.contact
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
                                    profileInfo?.address
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
