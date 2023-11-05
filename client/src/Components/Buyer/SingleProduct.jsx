import classes from "../../Style/Buyer/ProductBox.module.css";
import product_image from "../../assets/rice.webp";
export default function SingleProduct() {
    return (
        <div className={`${classes["single-product"]} py-2 col-12 col-md-3`}>
            <div
                className={`${classes["product-thumnail"]} d-flex justify-content-center align-items-center w-100`}
            >
                <div className={`${classes["image-container"]}`}>
                    <img className="img-fluid" src={product_image} alt="" />
                </div>

                <span className={`${classes["special-message"]} rounded-pill`}>
                    Stock Limited
                </span>
            </div>

            <div
                className={`${classes["product-info"]} d-flex align-items-center flex-column`}
            >
                <p className={`fw-semibold m-0`}>Basmoti Rice</p>
                <p className={`m-0`}>Category</p>
                <p className={`m-0 mt-3`}>
                    <del className={`${classes["fade-base-price"]}`}>
                        520 tk
                    </del>{" "}
                    <span>500 tk</span>
                </p>
            </div>

            <div
                className={`${classes["order-info"]} py-3 d-flex justify-content-center`}
            >
                <div className={`${classes["quantity"]}`}>
                    <label htmlFor="product-qty">
                        Qty:
                        <input
                            className={`ms-2`}
                            type="number"
                            name="product-qty"
                            id="product-qty"
                            min="0"
                        />
                    </label>
                </div>
                <div className={`${classes["add-to-cart"]} `}>
                    <button className={``}>Add to cart</button>
                </div>
            </div>
        </div>
    );
}
