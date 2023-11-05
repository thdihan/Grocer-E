import { useState } from "react";
import classes from "../../Style/Buyer/Navbar.module.css";
export default function NavItems({ items }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };
    return (
        <ul className="navbar-nav">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={`nav-item px-3 ${classes["nav-list-item"]} ${
                        index === activeIndex ? classes["active"] : ""
                    }`}
                >
                    <a
                        className=" nav-link fw-semibold"
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
