import classes from "../../../Style/Seller/SellerCategoryTable.module.css";
export default function SellerCategoryTable({ category }) {
    // console.log(category);
    const { categoryList, categoryLoading, categoryError } = category;
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
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!categoryLoading &&
                        !categoryError &&
                        categoryList?.map((category, index) => {
                            // console.log(category.category_name);
                            return (
                                <tr className="fw-semibold" key={index}>
                                    <td className="px-3 py-3 align-middle">
                                        {category.category_name}
                                    </td>
                                    <td className="px-3 py-3 align-middle">
                                        Rice
                                    </td>
                                    <td className="px-3 py-3 align-middle">
                                        {category.total_product}
                                    </td>
                                    <td className="px-3 py-3 align-middle">
                                        Action
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
