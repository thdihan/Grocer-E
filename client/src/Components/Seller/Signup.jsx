import { Link } from "react-router-dom";
import classes from "../../Style/Seller/Login.module.css";
import { useState } from "react";
export default function Signup() {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSignup(e) {
        e.preventDefault();
        console.log("Handle Signup Function Called");
    }
    return (
        <div className={classes["login-form-container"]}>
            <form onSubmit={handleSignup} className={classes["login-form"]}>
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
                            name="confirmPassword"
                            className="form-control"
                            id="inputPassword3"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`btn p-2  ${classes["btn-primary"]}`}
                >
                    Sign in
                </button>
                <p>
                    {`Already have an account?`}{" "}
                    <Link className={classes["form-link"]} to="/admin/login">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
