import { useEffect, useState } from "react";
import SellerApi from "../apis/SellerApi";

export const useParentCategoryList = (user) => {
  const [error, setError] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function getCategoryList() {
      try {
        setCategoryLoading(true);
        setError(false);
        const response = await SellerApi.get("/get-all-categories", {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        });
        console.log("CATEGORIES: ", response.data.categories);
        const categories = response.data.categories;
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
    parentCategoryList: categoryList,
    parentLoading: categoryLoading,
    parentError: error,
  };
};
