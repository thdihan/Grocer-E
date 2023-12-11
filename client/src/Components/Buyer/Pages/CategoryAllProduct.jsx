import { useParams } from "react-router-dom";
import classes from "../../../Style/Buyer/CategoryAllProduct.module.css";
import { useCategoryAllProduct } from "../../../hooks/useCategoryAllProduct";
import ProductBox from "../ProductBox";

const CategoryAllProduct = () => {
    const { id } = useParams();
    console.log("PARAMETER: ", id);
    const { productList, count, categoryName, productLoading, productError } =
        useCategoryAllProduct(parseInt(id));
    console.log("PRODUCT LIST: ", productList);
    console.log("COUNT: ", count);
    console.log("CATEGORY NAME: ", categoryName);
    return (
        <div className={`${classes["CategoryAllProduct"]} py-5`}>
            <ProductBox
                itemCount={count}
                boxTitle={`Category: ${categoryName}`}
                boxSize="big"
                productList={productList}
                viewAll={false}
            />
        </div>
    );
};

export default CategoryAllProduct;
