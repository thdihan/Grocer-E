import { useCategoryAllProduct } from "../../../hooks/useCategoryAllProduct";
import { useGetProduct } from "../../../hooks/useGetProduct";
import ProductBox from "../ProductBox";

const RelatedProduct = ({ id }) => {
    const { productList, count, categoryName, productLoading, productError } =
        useCategoryAllProduct(parseInt(id));
    console.log("PRODUCT LIST: ", productList);
    console.log("COUNT: ", count);
    console.log("CATEGORY NAME: ", categoryName);
    return (
        <div className={`py-5`}>
            <ProductBox
                itemCount={4}
                boxTitle={`Related Product`}
                boxSize="small"
                productList={productList}
                viewAll={false}
            />
        </div>
    );
};

export default RelatedProduct;
