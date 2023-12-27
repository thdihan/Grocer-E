import { useEffect, useState } from "react";
import UserApi from "../apis/UserApi";

export const useGetPopularCategory = (user) => {
    const [error, setError] = useState(false);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        async function getCategoryList() {
            try {
                setCategoryLoading(true);
                setError(false);
                const response = await UserApi.get("/get-popular-categories", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(
                    "POPULAR CATEGORIES: ",
                    response.data.categories.categoryList
                );
                const categories = response.data.categories.categoryList;
                setCategoryList(categories);
                setCategoryLoading(false);
            } catch (error) {
                console.log(error);
                setCategoryLoading(false);
                setError(false);
            }
        }
        getCategoryList();
    }, [user]);
    return {
        categoryList: categoryList,
        categoryLoading: categoryLoading,
        categoryError: error,
    };
};
