import { Link } from "react-router-dom";
import classes from "../../../Style/Buyer/AllCategories.module.css";
import { useCategoryList } from "../../../hooks/useCategoryList";
import { useAuthContext } from "../../../hooks/useAuthContext";

const AllCategories = () => {
    const { user } = useAuthContext();
    const { categoryList, categoryLoading, categoryError } =
        useCategoryList(user);
    console.log("CATEGORY LIST: ", categoryList);
    return (
        <div className={`${classes["AllCategories"]} py-5`}>
            <div className={`container border  bg-white`}>
                <div
                    className={`px-4 py-3 border-bottom d-flex justify-content-between align-items-center`}
                >
                    <h5 className={`m-0`}>
                        <i className="fa-solid fa-table-list pe-2"></i>{" "}
                        Categories
                    </h5>
                </div>
                <div
                    className={`${classes["categories"]} d-flex flex-wrap  px-4 py-3`}
                >
                    {!categoryLoading &&
                        !categoryError &&
                        categoryList?.map((category, index) => {
                            console.log("category", category);
                            return (
                                <div
                                    key={index}
                                    className={`${classes["category"]} px-3 py-2 border rounded mx-2 my-2 btn`}
                                >
                                    <Link
                                        to={`/category-all-product/${category?.category_id}}`}
                                    >
                                        <p className={`text-center m-0`}>
                                            {category.category_name}
                                        </p>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default AllCategories;
