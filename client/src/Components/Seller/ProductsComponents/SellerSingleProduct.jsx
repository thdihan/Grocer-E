import classes from "../../../Style/Seller/SellerSingleProduct.module.css";
import productImg from "../../../assets/rice.webp";
export default function SellerSingleProduct() {
    return (
        <tr className="fw-semibold">
            <td className="d-flex align-items-center px-3 py-3">
                <div className={`${classes["product-thumbnail"]} me-2 rounded`}>
                    <img
                        className={`img-fluid rounded`}
                        src={productImg}
                        alt=""
                    />
                </div>
                <div>
                    <p className="fs-5"> Basmoti Rice</p>
                    <p className={`${classes["product-category"]}`}>Category</p>
                </div>
            </td>
            <td className="px-3 py-3 align-middle">120$</td>
            <td className="px-3 py-3 align-middle">10%</td>
            <td className="px-3 py-3 align-middle">220kg</td>
            <td className="px-3 py-3 align-middle">3.4</td>
            <td className="px-3 py-3 align-middle">
                <button
                    className={`btn fw-semibold ${classes["details-button"]}`}
                >
                    View Details{" "}
                </button>
            </td>
        </tr>
    );
}
