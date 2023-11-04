import TextInput from "../Common/FormComponents/TextInput";
import classes from "../../Style/Seller/Login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleLogin(e) {
        e.preventDefault();
        console.log("Handle Login Function Called");
    }
    return (
        <div className={classes["login-form-container"]}>
            <form onSubmit={handleLogin} className={classes["login-form"]}>
                <div className="row mb-3">
                    <label
                        htmlFor="inputEmail3"
                        className="col-sm-12 col-form-label"
                    >
                        Email
                    </label>
                    <div className="col-sm-12">
                        <input
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
                <button
                    type="submit"
                    className={`btn p-2 ${classes["btn-primary"]}`}
                >
                    Sign in
                </button>
                <p>
                    {`Don't Have an account?`}{" "}
                    <Link className={classes["form-link"]} to="/admin/signup">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
