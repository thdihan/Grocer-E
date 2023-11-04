import { Link } from "react-router-dom";
export default function SellerNavItems({ icon, text, to }) {
    return (
        <li className="d-flex items-center p-3">
            <span className="material-symbols-outlined me-3 align-middle">
                {icon}
            </span>

            <Link className="fw-semibold" to={to}>
                {text}
            </Link>
        </li>
    );
}
