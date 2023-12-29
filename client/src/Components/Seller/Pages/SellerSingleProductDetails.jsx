import { useEffect, useState } from "react";
import classes from "../../../Style/Seller/SellerSingleProductDetails.module.css";
import { useGetSingleProduct } from "../../../hooks/useGetSingleProduct";
import { Link, useParams } from "react-router-dom";
import {
    formatDateAndTimeFromString,
    makeSourceURL,
} from "../../../utilities/utilities";
import { useSingleProductRecord } from "../../../hooks/useSingleProductRecord";
import Chart from "react-apexcharts";

const SellerSingleProductDetails = () => {
    const [product_name, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [base_price, setBasePrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [unit, setUnit] = useState("");
    const [stock, setStock] = useState("");
    const [product_image, setProductImage] = useState("");
    const [category_ids, setCategoryIds] = useState([]);
    const [category_names, setCategoryNames] = useState([]);

    // get product Id from url
    const { product_Id } = useParams();
    console.log("product_Id: ", product_Id);
    const { productDetails, productDetailsError, productDetailsLoading } =
        useGetSingleProduct(product_Id);
    console.log("productDetails: ", productDetails);
    useEffect(() => {
        if (product_Id) {
            console.log("product_Id: ", product_Id);
            setProductName(productDetails.product_name);
            setDescription(productDetails.description);
            setBasePrice(productDetails.base_price);
            setDiscount(productDetails.discount);
            setUnit(productDetails.unit);
            setStock(productDetails.stock);
            setProductImage(productDetails.product_image);
            setCategoryIds(productDetails.category_ids);
            setCategoryNames(productDetails.categories);
        }
    }, [productDetails, product_Id]);

    // Get Product Info
    const { infoList, infoLoading, error } = useSingleProductRecord(
        product_Id,
        "yearly"
    );
    const { infoList: info } = useSingleProductRecord(product_Id, "monthly");

    console.log("infoList: ", info);
    const [graphConfigYearly, setGraphConfigYearly] = useState({
        options: {
            chart: {
                id: "basic-bar",
                width: "1000px",
            },
            xaxis: {
                categories: [
                    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                ],
            },
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91],
            },
        ],
    });

    useEffect(() => {
        console.log("InfoList: ", infoList);
        if (infoList) {
            const categories = infoList.map((info) => info.month_name);
            const sales = infoList.map((info) => info.total_quantity_sold);
            console.log("categories: ", categories);
            console.log("sales: ", sales);
            setGraphConfigYearly({
                options: {
                    colors: ["#F44336", "#E91E63", "#9C27B0"],
                    chart: {
                        id: "basic-bar",
                        width: "1000px",
                    },
                    xaxis: {
                        categories: categories.reverse(),
                    },
                },
                series: [
                    {
                        name: "series-1",
                        data: sales.reverse(),
                    },
                ],
            });
        }
    }, [infoList]);

    // Monthly Report
    const [graphConfigMonthly, setGraphConfigMonthly] = useState({
        options: {
            chart: {
                id: "basic-bar",
                width: "1000px",
            },
            xaxis: {
                categories: [
                    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                ],
            },
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91],
            },
        ],
    });

    useEffect(() => {
        console.log("InfoList: ", infoList);
        if (infoList) {
            const categories = info.map((info) =>
                formatDateAndTimeFromString(info.sale_date)
            );
            const sales = infoList.map((info) => info.total_quantity_sold);
            console.log("categories: ", categories);
            console.log("sales: ", sales);
            setGraphConfigMonthly({
                options: {
                    colors: ["#F44336", "#E91E63", "#9C27B0"],
                    chart: {
                        id: "basic-bar",
                        width: "1000px",
                    },
                    xaxis: {
                        categories: categories.reverse(),
                    },
                },
                series: [
                    {
                        name: "series-1",
                        data: sales.reverse(),
                    },
                ],
            });
        }
    }, [info]);
    return (
        <div className={classes.SellerSingleProductDetails}>
            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                <h4 className={`m-0`}>Product Details</h4>
                <div className="d-flex align-items-center">
                    <Link
                        to={`/admin/add-product/${product_Id}`}
                        className={`btn fw-semibold text-black ${classes["add-product-button"]}`}
                    >
                        Edit Product
                    </Link>
                </div>
            </div>
            <div className={`px-3 py-3 table-responsive bg-white`}>
                <table className={`w-100 table`}>
                    <tbody>
                        <tr>
                            <td className="fw-bold">Product Name</td>
                            <td>{product_name}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Description</td>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Base Price</td>
                            <td>{base_price}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Discount</td>
                            <td>{discount}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Unit</td>
                            <td>{unit}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Stock</td>
                            <td>{stock}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Category Names</td>
                            <td>
                                {category_names?.map((category) => category)}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Product Image</td>
                            <td>
                                <img
                                    src={makeSourceURL(product_image)}
                                    alt="product_image"
                                    className="img-fluid"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                <h4 className={`m-0`}>Product Report</h4>
            </div>
            <div className={`px-3 py-3 bg-white`}>
                <div>
                    <h5>Monthly Report</h5>
                    <Chart
                        options={graphConfigMonthly.options}
                        series={graphConfigMonthly.series}
                        type="area"
                        width="100%"
                        height={300}
                    />
                </div>
                <div>
                    <h5>Yearly Report</h5>
                    <Chart
                        options={graphConfigYearly.options}
                        series={graphConfigYearly.series}
                        type="area"
                        width="100%"
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
};

export default SellerSingleProductDetails;
