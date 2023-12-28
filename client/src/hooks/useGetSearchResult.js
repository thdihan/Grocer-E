import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";

export const useGetSearchResult = (searchQuery) => {
    const [error, setError] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        async function getProductList() {
            console.log("Getting popular products...");
            try {
                setProductLoading(true);
                setError(false);
                /**GET SEARCH RESULT */
                const response = await UserApi.get(
                    `/get-search-results?text=${searchQuery}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Search Product Products: ", response.data.result);
                const products = response.data.result;
                setProductList(products);
                setProductLoading(false);
            } catch (error) {
                console.log("Error getting popular products: ", error);
                console.log(error);
                setProductLoading(false);
                setError(false);
            }
        }
        getProductList();
    }, []);
    return {
        productList: productList,
        productLoading: productLoading,
        productError: error,
    };
};
