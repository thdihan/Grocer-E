import { Link } from "react-router-dom";
import classes from "../../Style/Buyer/ProductBox.module.css";
import SingleProduct from "./SingleProduct";
export default function ProductBox({ itemCount, boxTitle }) {
    const SingleProductCount = Array(itemCount).fill(null);
    return (
        <div className="container">
            <div className={`${classes["product-box"]} w-100 border bg-white`}>
                <div
                    className={`${classes["product-box-header"]} border-bottom px-4 py-2 d-flex justify-content-between align-items-center`}
                >
                    <p className={`fs-4 m-0`}>{boxTitle}</p>
                    <Link to={`#`}>View All</Link>
                </div>
                <div className={`${classes["product-box-content"]} px-2 row`}>
                    {SingleProductCount.map((_, index) => (
                        <SingleProduct key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
