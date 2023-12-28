import { useParams } from "react-router-dom";
import classes from "../../../Style/Buyer/CategoryAllProduct.module.css";
import { useCategoryAllProduct } from "../../../hooks/useCategoryAllProduct";
import ProductBox from "../ProductBox";
import { useGetSearchResult } from "../../../hooks/useGetSearchResult";

const SearchResult = () => {
    const { searchQuery } = useParams();
    const { productList, productLoading, productError } =
        useGetSearchResult(searchQuery);
    console.log("SEARCH PRODUCT LIST: ", productList);
    // console.log("COUNT: ", count);
    // console.log("CATEGORY NAME: ", categoryName);
    return (
        <div className={`${classes["CategoryAllProduct"]} py-5`}>
            <ProductBox
                itemCount={productList?.length}
                boxTitle={`Category: ${searchQuery}`}
                boxSize="big"
                productList={productList}
                viewAll={false}
            />
        </div>
    );
};

export default SearchResult;
