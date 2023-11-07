import { Link } from "react-router-dom";
import classes from "../../Style/Buyer/ProductBox.module.css";
import { useGetProduct } from "../../hooks/useGetProduct";
import SingleProduct from "./SingleProduct";
export default function ProductBox({ itemCount, boxTitle, category }) {
  // [Todo] : Hook call
  const { productList, productLoading, productError } = useGetProduct(category);
  console.log("PRODUCT LIST: ", productList);

  //   const SingleProductCount = Array(itemCount).fill(null);
  return (
    <div className="container p-0">
      <div className={`${classes["product-box"]} w-100 border bg-white`}>
        <div
          className={`${classes["product-box-header"]} border-bottom px-4 py-2 d-flex justify-content-between align-items-center`}
        >
          <p className={`fs-4 m-0`}>{boxTitle}</p>
          <Link to={`#`}>View All</Link>
        </div>
        <div className={`${classes["product-box-content"]} px-2 row`}>
          {productList?.slice(0, itemCount).map((product, index) => (
            <SingleProduct key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
