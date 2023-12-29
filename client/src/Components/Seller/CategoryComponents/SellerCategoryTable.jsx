import { useEffect, useState } from "react";
import classes from "../../../Style/Seller/SellerCategoryTable.module.css";
import { Link } from "react-router-dom";
export default function SellerCategoryTable({ category }) {
    // console.log(category);
    const { categoryList, categoryLoading, categoryError } = category;
    const [search, setSearch] = useState("");
    const [filteredCategoryList, setFilteredCategoryList] = useState([]);
    useEffect(() => {
        if (categoryList) {
            const filtered = categoryList.filter((category) =>
                category.category_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
            setFilteredCategoryList(filtered);
        }
    }, [search, categoryList]);
    return (
        <div className={`table-responsive ${classes["category-table"]}`}>
            <table className="w-100 table">
                <thead>
                    <tr className="">
                        <th className="w-50 px-3 py-3">Category Name</th>
                        <th className="px-3 py-3">Parent Category</th>
                        <th className="px-3 py-3">Total Product</th>
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
                    {!categoryLoading &&
                        !categoryError &&
                        filteredCategoryList?.map((category, index) => {
                            // console.log(category.category_name);
                            return (
                                <tr className="fw-semibold" key={index}>
                                    <td className="px-3 py-3 align-middle">
                                        {category.category_name}
                                    </td>
                                    <td className="px-3 py-3 align-middle">
                                        {category.parent_name
                                            ?.map((parent) => parent)
                                            .join(", ")}
                                    </td>
                                    <td className="px-3 py-3 align-middle">
                                        {category.product_count}
                                    </td>
                                    <td className="px-3 py-3 align-middle">
                                        <Link
                                            to="/admin/add-category"
                                            state={{ category }}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
