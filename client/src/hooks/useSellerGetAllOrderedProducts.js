import { useEffect, useState } from "react";
import SellerApi from "../apis/SellerApi";

export const useSellerGetAllOrderedProducts = (user, orderId) => {
    const [error, setError] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        async function getProductList() {
            try {
                setProductLoading(true);
                setError(false);
                const response = await SellerApi.get(
                    `/get-ordered-products/${orderId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Products: ", response.data.order);
                const products = response.data.order;
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
