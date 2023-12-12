import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";

export const useGetSingleProduct = (product_id) => {
    const [error, setError] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        async function getProductList() {
            try {
                setProductLoading(true);
                setError(false);
                /**GET SINGLE PRODUCT DETAILS */
                const response = await UserApi.get(
                    `/get-single-product?product_id=${product_id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(
                    "Category Based Products: ",
                    response.data.products
                );
                const products = response.data.product;
                console.log("Products: ", products);
                setProductList(products);
                setProductLoading(false);
            } catch (error) {
                console.log(error);
                setProductLoading(false);
                setError(false);
            }
        }

        if (product_id) getProductList();
    }, []);
    return {
        productDetails: productList,
        productDetailsError: error,
        productDetailsLoading: productLoading,
    };
};
