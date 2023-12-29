import { useEffect, useState } from "react";
import SellerApi from "../apis/SellerApi";

const useGetProductStatusCount = () => {
    const [productStatusCount, setProductStatusCount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductStatusCount = async () => {
            setLoading(true);
            try {
                const { data } = await SellerApi.get("get-order-status-count");
                console.log(data);
                setProductStatusCount(data.orderStatusCount);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchProductStatusCount();
    }, []);

    return { productStatusCount, loading, error };
};
export default useGetProductStatusCount;
