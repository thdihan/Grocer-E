import SellerCategoryTable from "../CategoryComponents/SellerCategoryTable";
import classes from "../../../Style/Seller/SellerCategories.module.css";
export default function SellerCategories() {
    return (
        <>
            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                <h4>Categories</h4>
                <div className="d-flex align-items-center">
                    <button className={`btn ${classes["add-category-button"]}`}>
                        Add New Category
                    </button>
                </div>
            </div>
            <SellerCategoryTable />
        </>
    );
}
