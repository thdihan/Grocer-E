import { Link } from "react-router-dom";
import classes from "../../Style/Buyer/ProductBox.module.css";
import { useGetProduct } from "../../hooks/useGetProduct";
import SingleProduct from "./SingleProduct";
import { demoProducts } from "../../demoData/demoProducts";
import SmallSingleProduct from "./SmallSingleProduct";
export default function ProductBox({ itemCount, boxTitle, category, boxSize }) {
    // [Todo] : Hook call
    const { productList, productLoading, productError } =
        useGetProduct(category);
    console.log("PRODUCT LIST: ", productList);

    // Demo products
    // const productList = demoProducts;
    //   const SingleProductCount = Array(itemCount).fill(null);
    return (
        <div className="container">
            <div className={`${classes["product-box"]} w-100`}>
                <div
                    className={`${classes["product-box-header"]}  py-2 d-flex justify-content-between align-items-center`}
                >
                    {/* Box Title  */}
                    <p className={`fs-4 m-0 fw-bold p-0`}>
                        <i className="fa-solid fa-border-all"></i> {boxTitle}
                    </p>
                    {/* View All Button  */}
                    <Link className={`fw-bol`} to={`#`}>
                        View All <i className="bi bi-caret-right-fill"></i>
                    </Link>
                </div>
                <div className={`${classes["product-box-content"]} row`}>
                    {productList?.slice(0, itemCount).map((product, index) => (
                        <>
                            {boxSize === "big" ? (
                                <SingleProduct key={index} product={product} />
                            ) : (
                                <>
                                    <SmallSingleProduct
                                        key={index}
                                        product={product}
                                    />
                                    <SmallSingleProduct
                                        key={index}
                                        product={product}
                                    />
                                </>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}
