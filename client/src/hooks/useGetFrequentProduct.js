import { useEffect, useState } from "react";
import BuyerApi from "../apis/BuyerApi";

export const useGetFrequentProduct = (user) => {
    const [error, setError] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        async function getProductList() {
            console.log("Getting popular products...");
            try {
                setProductLoading(true);
                setError(false);
                /** GET FREQUENTLY BOUGHT PRODUCTS */
                const response = await BuyerApi.get(
                    "/get-frequently-bought-products",
                    {
                        headers: {
                            Authorization: `Bearer ${user}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Frequent Products: ", response.data.products);
                const products = response.data.products;
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
    }, [user]);
    return {
        productList: productList,
        productLoading: productLoading,
        productError: error,
    };
};
