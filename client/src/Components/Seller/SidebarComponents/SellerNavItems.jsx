export default function SellerNavItems({ icon, text }) {
    return (
        <li className="d-flex items-center p-3">
            <span className="material-symbols-outlined me-3 align-middle">
                {icon}
            </span>
            <a className="fw-semibold" href="">
                {text}
            </a>
        </li>
    );
}
