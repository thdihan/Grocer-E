import { useEffect, useState } from "react";
import SellerApi from "../apis/BuyerApi";

export const useGetProduct = (user) => {
    const [error, setError] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        async function getProductList(category) {
            try {
                setProductLoading(true);
                setError(false);
                const response = await SellerApi.post(
                    "/get-products",
                    { category: category },
                    {
                        headers: {
                            Authorization: `Bearer ${user}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Products: ", response.data.products);
                const products = response.data.products;
                setProductList(products);
                setProductLoading(false);
            } catch (error) {
                console.log(error);
                setProductLoading(false);
                setError(false);
            }
        }
        getProductList();
    }, [user]);
    return {
        productList: productList,
        productLoading: productLoading,
        productError: error,
    };
};
