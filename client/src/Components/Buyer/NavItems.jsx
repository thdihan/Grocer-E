import { useState } from "react";
import classes from "../../Style/Buyer/Navbar.module.css";
import { Link } from "react-router-dom";
export default function NavItems({ items }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };
    return (
        <ul className="navbar-nav mx-auto py-3">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={`nav-item me-4 ${classes["nav-list-item"]} ${
                        index === activeIndex ? classes["active"] : ""
                    }`}
                >
                    <a
                        className="p-0 nav-link fw-normal"
                        aria-current="page"
                        href="#"
                        onClick={() => handleItemClick(index)}
                    >
                        {item}
                    </a>
                </li>
            ))}

            {/* <li className="nav-item">
                <a className={`nav-link`} href="#">
                    Features
                </a>
            </li> */}
        </ul>
    );
}
