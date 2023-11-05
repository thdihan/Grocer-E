import classes from "../../Style/Buyer/Navbar.module.css";
import MainNav from "./MainNav";
export default function Navbar() {
    return (
        <section className="header-area">
            <div className="container">
                <div className={`${classes["top-header"]} row py-3`}>
                    <h2 className={`${classes["logo"]} col-md-2 col-12`}>
                        Grocer-E
                    </h2>
                    <div
                        className={`${classes["search-box-container"]} col-12 col-md-6`}
                    >
                        <label
                            htmlFor="search-box"
                            className="w-100n d-flex justify-content-between"
                        >
                            <input
                                type="text"
                                name="search-box"
                                id="search-box"
                                className="w-75"
                            />
                            <span
                                className={`material-symbols-outlined ${classes["custom-search-button"]}`}
                            >
                                search
                            </span>
                        </label>
                    </div>
                    <nav
                        className={`${classes["user-nav"]} col-md-4 col-12 mt-4 mt-md-0 d-flex align-items-center flex-wrap`}
                    >
                        <ul className="row w-100">
                            <li className="col-6 ">
                                <span className="material-symbols-outlined me-2">
                                    shopping_cart
                                </span>
                                <span>Cart</span>
                                <span
                                    className={`${classes["cart-update"]} rounded-circle`}
                                >
                                    12
                                </span>
                            </li>
                            <li className="col-6">
                                <span className="material-symbols-outlined me-2">
                                    account_circle
                                </span>
                                <span>My Account</span>
                            </li>
                        </ul>
                    </nav>
                </div>
                <MainNav />
            </div>
        </section>
    );
}
