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
    category_names,
  } = product;
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
            {/* {" "}
            {category_names?.map((category, index) => ({ category }))} */}
            Category A, Category B
          </p>
        </div>
      </td>
      <td className="px-3 py-3 align-middle">{base_price} tk</td>
      <td className="px-3 py-3 align-middle">{discount} %</td>
      <td className="px-3 py-3 align-middle">{stock}</td>
      <td className="px-3 py-3 align-middle">3.4</td>
      <td className="px-3 py-3 align-middle text-end">
        <button className={`btn fw-semibold ${classes["details-button"]}`}>
          View Details{" "}
        </button>
      </td>
    </tr>
  );
}
