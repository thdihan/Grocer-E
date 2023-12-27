import { useGetPopularProduct } from "../../../hooks/useGetPopularProducts";
import { useGetProduct } from "../../../hooks/useGetProduct";
import ProductBox from "../ProductBox";

const PopularProducts = () => {
    const { productList, productLoading, productError } =
        useGetPopularProduct();
    return (
        <div>
            <ProductBox
                itemCount={6}
                boxTitle={`Popular Product`}
                boxSize="big"
                productList={productList}
            />
        </div>
    );
};

export default PopularProducts;
