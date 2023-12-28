import classes from "../../../Style/Seller/ProductTable.module.css";
import { useGetProduct } from "../../../hooks/useGetProduct";
import SellerSingleProduct from "./SellerSingleProduct";
export default function ProductTable() {
    const { productList, productLoading, productError } = useGetProduct(null);
    console.log("All Products : ", productList);
    return (
        <div className={`table-responsive ${classes["product-table"]}`}>
            <table className="w-100 table">
                <thead>
                    <tr className="">
                        <th className="w-50 px-3 py-3">Product Name</th>
                        <th className="px-3 py-3">Base Price</th>
                        <th className="px-3 py-3">Discount</th>
                        <th className="px-3 py-3">Stock</th>
                        <th className="px-3 py-3">Rating</th>
                        <th className="px-3 py-3">
                            <input
                                type="text"
                                name="search"
                                id=""
                                className="w-100"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productList?.map((product, index) => (
                        <SellerSingleProduct product={product} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
