import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../../Style/Seller/Login.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        navigate("/admin/dashboard");
      }
    });
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    // Form Data Object
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    console.log("FORMADATA: ", formDataObject);

    try {
      const response = await login(
        formDataObject.email,
        formDataObject.password
      );

      toast.success("Login Successful !! Navigating to dashboard...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1200, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
      });
    } catch (err) {
      setError(err.response.data.error);
      setLoading(false);

      console.log("LOGIN ERR: ", err);
    }

    console.log("Handle Login Function Called");
  }
  return (
    <>
      {" "}
      <div className={classes["login-form-container"]}>
        <form onSubmit={handleLogin} className={classes["login-form"]}>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-12 col-form-label">
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
          <p>
            {`Don't Have an account?`}{" "}
            <Link className={classes["form-link"]} to="/admin/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
