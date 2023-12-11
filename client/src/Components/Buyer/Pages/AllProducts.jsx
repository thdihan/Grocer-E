import { useGetProduct } from "../../../hooks/useGetProduct";
import ProductBox from "../ProductBox";

const AllProducts = ({ category }) => {
    const { productList, productLoading, productError } =
        useGetProduct(category);
    return (
        <div>
            <ProductBox
                itemCount={6}
                boxTitle={`All Product`}
                boxSize="big"
                productList={productList}
            />
        </div>
    );
};

export default AllProducts;
