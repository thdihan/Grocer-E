import { useState } from "react";
import classes from "../../Style/Buyer/Cart.module.css";
import { useCartContext } from "../../hooks/useCartContext";
import { makeSourceURL } from "../../utilities/utilities";
const SingleCartItem = ({ product }) => {
  console.log("Cart Page Product ", product);
  const {
    base_price,
    category_names,
    description,
    discount,
    product_id,
    product_image,
    product_name,
    stock,
    unit,
    quantity,
    discountedPrice,
  } = product;

  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const changeQuantity = (count) => {
    setUpdatedQuantity((prev) => {
      return prev + count;
    });
  };
  const { updatePriceAndDiscount, deleteProductFromCart } = useCartContext();
  return (
    <div className={`px-3 py-4 mb-2 bg-white border rounded-3`}>
      <div className={`row`}>
        <div className={`col col-12 col-md-2`}>
          <div className={`${classes["img-thumbnail"]}`}>
            <img src={makeSourceURL(product_image)} alt="" />
          </div>
        </div>
        <div
          className={`col col-12 col-md-10 pe-5 d-flex flex-column justify-content-center`}
        >
          <div className={`d-flex justify-content-between text-red`}>
            <p className={`${classes["product-category"]} m-0`}>
              {category_names?.map((category, index) => category)}
            </p>
            <i
              onClick={() => {
                updatePriceAndDiscount(product, 0);
              }}
              className="fa-solid fa-trash-can"
            ></i>
          </div>

          <h5 className={`mb-1`}>{product_name}</h5>
          <p className={`my-1 text-green fw-semibold h6`}>
            {discountedPrice * updatedQuantity} tk
          </p>
          <div className={`d-flex flex-wrap justify-content-between`}>
            <p className={`m-0`}>
              Stock: {stock} {unit}{" "}
            </p>

            <p className={`my-2`}>
              Quantity:
              <span className={`border py-1 px-3 rounded ms-2`}>
                <i
                  className="fa-solid fa-plus me-2 text-green"
                  onClick={() => {
                    changeQuantity(1);
                    updatePriceAndDiscount(product, updatedQuantity + 1);
                  }}
                ></i>
                <span>{updatedQuantity}</span> {unit}
                <i
                  className="fa-solid fa-minus ms-2 text-green"
                  onClick={() => {
                    changeQuantity(-1);
                    updatePriceAndDiscount(
                      product,
                      updatedQuantity - 1 === 0 ? 0 : updatedQuantity - 1
                    );
                  }}
                ></i>
              </span>
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SingleCartItem;
