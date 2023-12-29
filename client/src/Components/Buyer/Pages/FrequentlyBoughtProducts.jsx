import { useAuthContext } from "../../../hooks/useAuthContext";
import { useGetFrequentProduct } from "../../../hooks/useGetFrequentProduct";
import ProductBox from "../ProductBox";

const FrequentlyBoughtProducts = () => {
    const { user } = useAuthContext();
    const { productList, productLoading, productError } =
        useGetFrequentProduct(user);
    return (
        <div>
            {user && productList?.length > 0 && (
                <ProductBox
                    itemCount={6}
                    boxTitle={`Frequently Bought Products`}
                    boxSize="small"
                    productList={productList}
                />
            )}
        </div>
    );
};

export default FrequentlyBoughtProducts;
