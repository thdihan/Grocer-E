import { Link } from "react-router-dom";
import classes from "../../Style/Buyer/ProductBox.module.css";
import { makeSourceURL } from "../../utilities/utilities";
import { useCartContext } from "../../hooks/useCartContext";
export default function SingleProduct({ product }) {
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
    } = product;

    const { addProductToCart } = useCartContext();
    console.log("Category IDS", category_ids, product_name);

    return (
        <div className={`${classes["single-product"]} py-2 col-12 col-md-4`}>
            <div
                className={`${classes["single-product-inner-box"]}  rounded border border-light-subtle`}
            >
                <div
                    className={`${classes["product-thumnail"]} d-flex justify-content-center align-items-center w-100 px-4 py-2`}
                >
                    <div
                        className={`${classes["image-container"]} mt-3 d-flex justify-content-center`}
                    >
                        <img
                            className="img-fluid"
                            src={makeSourceURL(product_image)}
                            // src={demoImg}
                            alt=""
                        />
                    </div>

                    {discount > 0 && (
                        <span
                            className={`${classes["special-message"]} rounded-pill fw-semibold`}
                        >
                            {discount}% Off
                        </span>
                    )}
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
                                {categories?.map((category, index) => {
                                    console.log(
                                        "Category Index",
                                        category_ids[index]
                                    );
                                    return (
                                        <Link
                                            to={`/category-all-product/${category_ids[index]}`}
                                            key={index}
                                        >
                                            {" "}
                                            {category}
                                            {","}
                                        </Link>
                                    );
                                })}
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

                        <div
                            className={`${classes["add-to-cart"]} text-end`}
                            onClick={() => {
                                addProductToCart({
                                    ...product,
                                    quantity: 1,
                                    discountedPrice: (
                                        base_price -
                                        base_price * (discount / 100.0)
                                    ).toFixed(2),
                                    discountTotal:
                                        base_price * (discount / 100.0),
                                });
                            }}
                        >
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
