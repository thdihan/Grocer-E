import { Link } from "react-router-dom";
import classes from "../../../Style/Seller/SellerSingleProduct.module.css";
import { makeSourceURL } from "../../../utilities/utilities";
export default function SellerSingleProduct({ product }) {
    const {
        product_id,
        product_name,
        description,
        base_price,
        discount,
        unit,
        stock,
        product_image,
        category_ids,
        categories,
        sell_quantity,
    } = product;
    console.log(product);
    return (
        <tr className="fw-semibold">
            <td className="d-flex align-items-center px-3 py-3">
                <div className={`${classes["product-thumbnail"]} me-2 rounded`}>
                    <img
                        className={`img-fluid rounded`}
                        src={makeSourceURL(product_image)}
                        alt=""
                    />
                </div>
                <div>
                    <p className="fs-5"> {product_name}</p>
                    <p className={`${classes["product-category"]}`}>
                        {/* {category_names?.map((cat, index) => {
                            return cat;
                        })} */}
                        {categories?.map((cat, index) => cat).join(", ")}
                    </p>
                </div>
            </td>
            <td className="px-3 py-3 align-middle">{base_price} tk</td>
            <td className="px-3 py-3 align-middle">{discount} %</td>
            <td className="px-3 py-3 align-middle">{stock}</td>
            <td className="px-3 py-3 align-middle">{sell_quantity}</td>
            <td className="px-3 py-3 align-middle text-end">
                <Link
                    to={`/admin/product/${product_id}`}
                    className={`btn fw-semibold text-black ${classes["details-button"]}`}
                >
                    View Details{" "}
                </Link>
            </td>
        </tr>
    );
}
