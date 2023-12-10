import { Link } from "react-router-dom";
import classes from "../../Style/Buyer/ProductBox.module.css";
import { makeSourceURL } from "../../utilities/utilities";
import demoImg from "../../assets/rice.webp";
export default function SmallSingleProduct({ product }) {
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
    console.log(category_names);

    return (
        <div
            className={`${classes["small-single-product"]} py-2 col-6 col-md-2`}
        >
            <div
                className={`${classes["small-single-product-inner-box"]}  rounded border border-light-subtle`}
            >
                <div
                    className={`${classes["product-thumnail"]} d-flex justify-content-center align-items-center  px-4 py-2`}
                >
                    <div className={`${classes["image-container"]} mt-3`}>
                        <img
                            className="img-fluid"
                            src={makeSourceURL(product_image)}
                            // src={demoImg}
                            alt=""
                        />
                    </div>

                    <span
                        className={`${classes["special-message"]} rounded-pill fw-semibold`}
                    >
                        {discount}% Off
                    </span>
                </div>
                <div
                    className={`${classes["product-info"]} d-flex align-items-start flex-column px-4`}
                >
                    <p className={`${classes["product-title"]}  m-0`}>
                        <Link to={`/product/${product_id}`} state={product}>
                            {product_name}{" "}
                            <span
                                className={`${classes["product-category"]} ms-2`}
                            >
                                {category_names?.map((category, index) => (
                                    <Link key={index}> {category} </Link>
                                ))}
                            </span>
                        </Link>
                    </p>

                    <p
                        className={`m-0 d-flex w-100 justify-content-between align-items-center`}
                    >
                        <div className={`p-0`}>
                            <span
                                className={`${classes["base-price"]} fw-semibold`}
                            >
                                {(
                                    base_price -
                                    base_price * (discount / 100.0)
                                ).toFixed(2)}{" "}
                                tk
                            </span>
                            <del
                                className={`${classes["fade-base-price"]} ms-2`}
                            >
                                {base_price} tk
                            </del>
                        </div>

                        <div className={`${classes["add-to-cart"]} text-end`}>
                            <i className="bi bi-plus-lg fw-bold"></i>
                        </div>
                    </p>
                </div>
                <div
                    className={`${classes["order-info"]} py-3 d-flex justify-content-center`}
                ></div>
            </div>
        </div>
    );
}
