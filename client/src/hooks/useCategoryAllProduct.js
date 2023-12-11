import { useEffect, useState } from "react";
import SellerApi from "../apis/BuyerApi";
import UserApi from "../apis/UserApi";

export const useCategoryAllProduct = (category_id) => {
    const [error, setError] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [count, setCount] = useState(0);
    useEffect(() => {
        async function getProductList() {
            try {
                setProductLoading(true);
                setError(false);
                /**GET CATEGORY BASED PRODUCT LIST */
                console.log("category_id: ", category_id);
                const response = await UserApi.get(
                    `/get-category-based-product?category_id=${category_id}`,
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
                const products = response.data.products.productList;
                const category_name = response.data.products.category_name;
                const count = response.data.products.count;
                setCount(count);
                setCategoryName(category_name);
                setProductList(products);
                setProductLoading(false);
            } catch (error) {
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
        categoryName: categoryName,
        count: count,
    };
};
