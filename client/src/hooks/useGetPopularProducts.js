import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";

export const useGetPopularProduct = () => {
    const [error, setError] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        async function getProductList() {
            console.log("Getting popular products...");
            try {
                setProductLoading(true);
                setError(false);
                const response = await UserApi.get("/get-popular-products", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("Popular Products: ", response.data.products);
                const products = response.data.products.productList;
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
