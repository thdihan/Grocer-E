import { Link } from "react-router-dom";
import classes from "../../Style/Buyer/ProductBox.module.css";
import { makeSourceURL } from "../../utilities/utilities";
export default function SingleProduct({ product }) {
  // {
  //     "product_id": "1",
  //     "product_name": "qqqqq",
  //     "description": "sfasdfsfsdf",
  //     "base_price": "122",
  //     "discount": "12",
  //     "unit": "sdfsd",
  //     "stock": "12",
  //     "product_image": "image_1699380571849.png",
  //     "category_ids": [
  //         7,
  //         8,
  //         11
  //     ],
  //     "category_names": [
  //         "Category A",
  //         "Category B",
  //         "Category E"
  //     ]
  // }
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
      className={`${classes["single-product"]} py-2 col-12 col-md-3 border-bottom`}
    >
      <div
        className={`${classes["product-thumnail"]} d-flex justify-content-center align-items-center w-100`}
      >
        <div className={`${classes["image-container"]}`}>
          <img
            className="img-fluid"
            src={makeSourceURL(product_image)}
            alt=""
          />
        </div>

        {/* <span className={`${classes["special-message"]} rounded-pill`}>
          Stock Limited
        </span> */}
      </div>

      <div
        className={`${classes["product-info"]} d-flex align-items-center flex-column`}
      >
        <p className={`${classes["product-title"]} fw-semibold m-0`}>
          <Link to={`/product/${product_id}`} state={product}>
            {product_name}
          </Link>
        </p>
        <p className={`${classes["product-category"]} m-0`}>
          {category_names?.map((category, index) => (
            <Link key={index}>{category}, </Link>
          ))}
        </p>

        <p className={`m-0 mt-3`}>
          <del className={`${classes["fade-base-price"]}`}>{base_price} tk</del>{" "}
          <span>{base_price - base_price * (discount / 100.0)} tk</span>
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
