import { Link, useLocation } from "react-router-dom";
import classes from "../../Style/Buyer/SingleProductDetails.module.css";
import { makeSourceURL } from "../../utilities/utilities";
import ProductBox from "./ProductBox";
export default function SingleProductDetails() {
  const location = useLocation();
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
  } = location.state;
  return (
    <div style={{ background: "#dddddd8d" }} className={`py-5`}>
      <div className={`${classes["single-product-details"]} pb-5`}>
        <div
          className={`${classes["product-basic-info"]} container bg-white border py-5`}
        >
          <div className={`row`}>
            <div
              className={`${classes["product-image"]} col-12 d-flex justify-content-center`}
            >
              <img
                src={makeSourceURL(product_image)}
                alt=""
                className={`img-fluid`}
              />
            </div>
            <div className={`${classes["basic-info"]} col-12 pt-5 row`}>
              <div
                className={`${classes["title-category"]} col-12 text-center`}
              >
                <h3 className={`${classes["product-title"]}`}>
                  {product_name}
                </h3>
                <p className={`${classes["product-category"]}`}>
                  {category_names?.map((category, index) => (
                    <Link key={index}>{category}, </Link>
                  ))}
                </p>

                <p className={`${classes["product-price"]} m-0 my-3`}>
                  <del className={`${classes["fade-base-price"]}`}>
                    {base_price}
                  </del>{" "}
                  <span className={`${classes["discounted-price"]}`}>
                    {base_price - base_price * (discount / 100.0)} tk
                  </span>
                </p>
              </div>

              <div
                className={`${classes["order-button"]} col-12 justify-content-center d-flex`}
              >
                <div className={`${classes["quantity"]}`}>
                  <label htmlFor="product-qty">Qty:</label>
                  <label
                    className={`${classes["product-unit"]} border ms-2 rounded`}
                  >
                    <input
                      className={`ps-2`}
                      type="number"
                      name="product-qty"
                      id="product-qty"
                      min="0"
                    />
                    <span>KG</span>
                  </label>
                </div>
                <div className={`${classes["add-to-cart"]} `}>
                  <button className={``}>Add to cart</button>
                </div>
              </div>
            </div>

            <div className={`${classes["product-details"]} py-5 px-5`}>
              <h4 className={`text-center`}>Product Description</h4>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
      <ProductBox
        itemCount={4}
        boxTitle={`Related Product`}
        category={category_ids[0]}
      />
    </div>
  );
}
