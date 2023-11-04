import classes from "../../../Style/Seller/SellerCategoryTable.module.css";
export default function SellerCategoryTable() {
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
                    <tr className="fw-semibold">
                        <td className="px-3 py-3 align-middle">Bashmoti</td>
                        <td className="px-3 py-3 align-middle">Rice</td>
                        <td className="px-3 py-3 align-middle">220kg</td>
                        <td className="px-3 py-3 align-middle">3.4</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
