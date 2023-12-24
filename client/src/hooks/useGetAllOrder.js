import { useEffect, useState } from "react";
import BuyerApi from "../apis/BuyerApi";

export const useGetAllOrder = (user) => {
    const [error, setError] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        async function getOrderList() {
            try {
                setOrderLoading(true);
                setError(false);
                /** GET ALL ORDERS */
                const response = await BuyerApi.get("/get-all-order", {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                });

                console.log(response.data);
                setOrderList(response.data.orders);
                setOrderLoading(false);
            } catch (error) {
                console.log(error);
                setOrderLoading(false);
                setError(false);
            }
        }
        getOrderList();
    }, []);
    return {
        orderList: orderList,
        orderLoading: orderLoading,
        orderError: error,
    };
};
