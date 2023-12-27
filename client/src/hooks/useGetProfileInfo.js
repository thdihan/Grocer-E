import { useEffect, useState } from "react";
import BuyerApi from "../apis/BuyerApi";

const useGetProfileInfo = (user) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfileInfo = async () => {
            try {
                const response = await BuyerApi.get("/get-profile-info", {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log("profile info", response.data);
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        getProfileInfo();
    }, [user]);

    return { profile, loading };
};

export default useGetProfileInfo;
