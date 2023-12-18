import SellerCategoryTable from "../CategoryComponents/SellerCategoryTable";
import classes from "../../../Style/Seller/SellerCategories.module.css";
import { Link } from "react-router-dom";
import { useCategoryList } from "../../../hooks/useCategoryList";
import { useAuthContext } from "../../../hooks/useAuthContext";
export default function SellerCategories() {
    const { user } = useAuthContext();
    const { categoryList, categoryLoading, categoryError } =
        useCategoryList(user);

    return (
        <>
            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                <h4 className={`m-0`}>Categories</h4>
                <div className="d-flex align-items-center">
                    <Link
                        to="/admin/add-category"
                        className={`btn fw-semibold text-black ${classes["add-category-button"]}`}
                    >
                        Add New Category
                    </Link>
                </div>
            </div>
            <SellerCategoryTable
                category={{ categoryList, categoryLoading, categoryError }}
            />
        </>
    );
}
