import { Link, NavLink } from "react-router-dom";
import classes from "../../Style/Buyer/Navbar.module.css";
import MainNav from "./MainNav";
import { useCartContext } from "../../hooks/useCartContext";
export default function Navbar() {
    const { productCount } = useCartContext();
    return (
        <section className={`${classes["header-area"]} shadow`}>
            <div className="container">
                <div className={`${classes["top-header"]} row py-4`}>
                    <Link
                        to="/"
                        className={`${classes["logo"]} col-md-2 col-12 h2`}
                    >
                        Grocer-E
                    </Link>
                    <div
                        className={`${classes["search-box-container"]} col-12 col-md-8  d-flex align-items-center`}
                    >
                        <label
                            htmlFor="search-box"
                            className="w-100 px-3 d-flex border border-2 rounded-pill justify-content-between align-items-center"
                        >
                            <input
                                type="text"
                                name="search-box"
                                id="search-box"
                                className="w-75"
                                placeholder="Search"
                            />
                            <span
                                className={`${classes["custom-search-button"]}`}
                            >
                                <i className="bi bi-search"></i>
                            </span>
                        </label>
                    </div>
                    <nav
                        className={`${classes["user-nav"]} col-md-2 col-12 mt-4 mt-md-0 d-flex align-items-center justify-content-center flex-wrap`}
                    >
                        <ul className=" p-0 d-flex justify-content-center align-items-center w-100">
                            <li className="me-4 p-0">
                                <Link
                                    to="/cart"
                                    className={`${classes["cart-link"]}`}
                                >
                                    <i
                                        className={`bi bi-bag-plus-fill ${
                                            productCount > 0 ? "text-red" : ""
                                        } `}
                                    ></i>

                                    {productCount > 0 && (
                                        <span
                                            className={`${classes["cart-update"]} rounded-circle`}
                                        >
                                            {productCount}
                                        </span>
                                    )}
                                </Link>
                            </li>
                            <li className={`${classes["header-profile"]} `}>
                                <Link
                                    to={`/profile`}
                                    className={`px-2 border border-2 d-flex justify-content-end align-items-center rounded`}
                                >
                                    <span className={`fw-semibold pe-2`}>
                                        Tanvir
                                    </span>{" "}
                                    <i className="bi bi-person-fill p-0"></i>
                                </Link>
                            </li>
                            <li className={`${classes["logout-btn"]}`}>
                                <i className="fa-solid fa-right-from-bracket ms-4 p-0"></i>
                            </li>
                        </ul>
                    </nav>
                </div>
                <MainNav />
            </div>
        </section>
    );
}
