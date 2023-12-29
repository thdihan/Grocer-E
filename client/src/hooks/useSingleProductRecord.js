import { useEffect, useState } from "react";
import BuyerApi from "../apis/BuyerApi";
import UserApi from "../apis/UserApi";

export const useSingleProductRecord = (product_id, flag) => {
    const [error, setError] = useState(false);
    const [infoLoading, setInfoLoading] = useState(false);
    const [infoList, setInfoList] = useState([]);
    useEffect(() => {
        async function getProductInfo() {
            try {
                setInfoLoading(true);
                setError(false);
                /** GET ALL ORDERS */
                console.log("PRODUCT ID: ", product_id);
                console.log("FLAG: ", flag);
                const response = await UserApi.get(
                    `/get-single-product-record/${product_id}/${flag}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("INFO: ", response.data);
                setInfoList(response.data.product);
                setInfoLoading(false);
            } catch (error) {
                console.log("INFO ERROR : ");
                console.log(error);
                setInfoLoading(false);
                setError(false);
            }
        }
        getProductInfo();
    }, []);
    return {
        infoList,
        infoLoading,
        error,
    };
};
