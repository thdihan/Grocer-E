import { useEffect, useState } from "react";
import SellerApi from "../apis/SellerApi";
import axios from "axios";

export const useSellerGetAllOrder = (user) => {
    const [error, setError] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        async function getProductList() {
            try {
                setOrderLoading(true);
                setError(false);
                // Get All Orders
                console.log("USE SELLER GET ALL ORDER: ");
                const response = await SellerApi.get("/get-all-orders", {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(response.data);
                setOrderList(response.data.order);
                setOrderLoading(false);
            } catch (error) {
                console.log(error);
                setOrderLoading(false);
                setError(false);
            }
        }
        getProductList();
    }, []);
    return {
        orderList: orderList,
        orderLoading: orderLoading,
        orderError: error,
    };
};
