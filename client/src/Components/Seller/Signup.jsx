import { Link } from "react-router-dom";
import classes from "../../Style/Seller/Login.module.css";
export default function Signup() {
    return (
        <div className={classes["login-form-container"]}>
            <form className={classes["login-form"]}>
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
                            className="form-control"
                            id="fullname"
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
                            type="email"
                            className="form-control"
                            id="inputEmail3"
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
                            className="form-control"
                            id="inputPassword3"
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
                            className="form-control"
                            id="inputPassword3"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`btn  ${classes["btn-primary"]}`}
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
