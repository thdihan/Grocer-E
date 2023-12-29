import { useEffect, useState } from "react";
import classes from "../../../Style/Seller/ProductTable.module.css";
import { useGetProduct } from "../../../hooks/useGetProduct";
import SellerSingleProduct from "./SellerSingleProduct";
export default function ProductTable() {
    const { productList, productLoading, productError } = useGetProduct(null);
    console.log("All Products : ", productList);
    const [search, setSearch] = useState("");
    const [filteredProductList, setFilteredProductList] = useState([]);
    useEffect(() => {
        if (productList) {
            const filtered = productList.filter((product) =>
                product.product_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
            setFilteredProductList(filtered);
        }
    }, [search, productList]);
    return (
        <div className={`table-responsive ${classes["product-table"]}`}>
            <table className="w-100 table">
                <thead>
                    <tr className="">
                        <th className="w-50 px-3 py-3">Product Name</th>
                        <th className="px-3 py-3">Price</th>
                        <th className="px-3 py-3">Discount</th>
                        <th className="px-3 py-3">Stock</th>
                        <th className="px-3 py-3">Total Sell</th>
                        <th className="px-3 py-3">
                            <input
                                type="text"
                                name="search"
                                id=""
                                className="w-100"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProductList?.map((product, index) => (
                        <SellerSingleProduct product={product} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
