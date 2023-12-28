import { useGetProduct } from "../../../hooks/useGetProduct";
import ProductBox from "../ProductBox";

const AllProducts = ({ category }) => {
    const { productList, productLoading, productError } =
        useGetProduct(category);
    console.log("ALL PRODUCT LIST: ", productList);
    return (
        <div>
            <ProductBox
                itemCount={100}
                boxTitle={`All Product`}
                boxSize="big"
                productList={productList}
            />
        </div>
    );
};

export default AllProducts;
