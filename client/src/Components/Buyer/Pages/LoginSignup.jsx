import { useEffect, useState } from "react";
import classes from "../../../Style/Buyer/LoginSignup.module.css";
import TextInput from "../../Common/FormComponents/TextInput";
import { Link, useNavigate } from "react-router-dom";
import UserApi from "../../../apis/UserApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
const LoginSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullname, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");

    const { login } = useAuthContext();
    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const response = await login(email, password);
            navigate("/");
            // toast.success("Login Successful !! Navigating to dashboard...", {
            //     position: toast.POSITION.TOP_RIGHT,
            //     autoClose: 1200, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
            // });
        } catch (err) {
            setError(err.response.data.error);
            setLoading(false);

            console.log("LOGIN ERR: ", err);
        }

        console.log("Handle Login Function Called");
    }
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(
            "Email : ",
            email,
            "Password : ",
            password,
            "Full Name : ",
            fullname,
            "Confirm Password : ",
            confirmPassword,
            "Contact : ",
            contact,
            "Address : ",
            address
        );

        // [Todo] : Signup Api Call
        try {
            const response = await UserApi.post(
                "/signup",
                {
                    email,
                    password,
                    fullname,
                    contact,
                    address,
                    confirm_password: confirmPassword,
                    user_type: "",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setLoading(false);
            toast.success("Signup Successful !! Navigating to login page...", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
            });
            console.log("SIGNUP: ", response);
            // navigate("/dashboard/appointment");
        } catch (err) {
            setError(err.response.data.error);
            setLoading(false);

            console.log("SIGNUP: ", err);
        }
    };
    useEffect(() => {
        toast.onChange((payload) => {
            if (payload.status === "removed") {
                navigate("/account");
            }
        });
    }, [navigate]);

    return (
        <div className={`${classes["LoginSignup"]}`}>
            <div className={`container py-5 `}>
                <div className={`row bg-white`}>
                    <div
                        className={`${classes["login-form"]} col-12 col-md-4 border-end py-5`}
                    >
                        <div
                            className={`px-4 py-3 d-flex justify-content-between align-items-center`}
                        >
                            <h5 className={`m-0`}>
                                <i className="fa-solid fa-right-to-bracket pe-2"></i>
                                Login
                            </h5>
                        </div>
                        <form
                            onSubmit={handleLogin}
                            className={`${classes["login-form"]} px-4`}
                        >
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputEmail3"
                                    className="col-sm-12 col-form-label"
                                >
                                    Email
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="inputEmail3"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputPassword3"
                                    className="col-sm-12 col-form-label"
                                >
                                    Password
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        id="inputPassword3"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <button
                                disabled={loading}
                                type="submit"
                                className={`btn  ${classes["btn-primary"]}`}
                            >
                                Log in
                            </button>
                        </form>
                    </div>

                    <div
                        className={`${classes["login-form-container"]} col-12 col-md-8 py-5`}
                    >
                        <div
                            className={`px-4 py-3 d-flex justify-content-between align-items-center`}
                        >
                            <h5 className={`m-0`}>
                                <i className="fa-solid fa-user-plus pe-2"></i>
                                Signup
                            </h5>
                        </div>
                        <form
                            onSubmit={handleSignup}
                            className={`${classes["login-form"]} px-4`}
                        >
                            <div className="row mb-3">
                                <label
                                    htmlFor="fullname"
                                    className="col-sm-12 col-form-label"
                                >
                                    Full Name
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        name="fullname"
                                        className="form-control"
                                        id="fullname"
                                        value={fullname}
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputEmail3"
                                    className="col-sm-12 col-form-label"
                                >
                                    Email
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        id="inputEmail3"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputEmail3"
                                    className="col-sm-12 col-form-label"
                                >
                                    Contact
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        name="contact"
                                        type="contact"
                                        className="form-control"
                                        id="inputEmail3"
                                        value={contact}
                                        onChange={(e) => {
                                            setContact(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputPassword3"
                                    className="col-sm-12 col-form-label"
                                >
                                    Password
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        id="inputPassword3"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputPassword3"
                                    className="col-sm-12 col-form-label"
                                >
                                    Confirm Password
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        className="form-control"
                                        id="inputPassword3"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label
                                    htmlFor="inputPassword3"
                                    className="col-sm-12 col-form-label"
                                >
                                    Address
                                </label>
                                <div className="col-sm-12">
                                    <textarea
                                        className="form-control"
                                        placeholder="Default Address"
                                        id="floatingTextarea"
                                        name="address"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <button
                                disabled={loading}
                                type="submit"
                                className={`btn  ${classes["btn-primary"]}`}
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
};

export default LoginSignup;
