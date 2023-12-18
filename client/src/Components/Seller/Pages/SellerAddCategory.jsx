import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../../../Style/Seller/SellerAddCategory.module.css";
import SellerApi from "../../../apis/SellerApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCategoryList } from "../../../hooks/useCategoryList";

export default function SellerAddCategory() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();
    const { categoryList, categoryError, categoryLoading } =
        useCategoryList(user);
    const [parentCategory, setParentCategory] = useState({});
    console.log("Category List: ", categoryList);
    useEffect(() => {
        toast.onChange((payload) => {
            if (payload.status === "removed") {
                // Refresh the page
                window.location.reload();
            }
        });
    }, []);

    async function handleSubmit(e) {
        console.log(user);
        e.preventDefault();
        setError(false);
        setLoading(true);

        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);
        const submitData = { ...formDataObject, ...parentCategory };
        console.log("Submit Data: ", submitData);
        try {
            const response = await SellerApi.post("/add-category", submitData, {
                headers: {
                    Authorization: `Bearer ${user}`,
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            e.target.reset();

            toast.success("Category added successfully...", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1200, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
            });
            console.log("ADD CAT: ", response);
        } catch (err) {
            setError(err.response.data.error);
            setLoading(false);

            console.log("ADD CAT: ", err);
        }
    }

    // Parent Category Selection Box
    const [selectedCategory, setSelectedCategory] = useState([]);
    const addCategorySelection = (e) => {
        const category_id = e.target.value;
        const category_name = e.target.nextSibling.textContent;
        console.log("Category ID: ", category_id);
        console.log("Category Name: ", category_name);
        setSelectedCategory((prevSelected) => [...prevSelected, category_name]);
        setParentCategory((prevSelected) => ({
            ...prevSelected,
            [category_name]: category_id,
        }));
        // setRelatedCategories((prevSelected) => [...prevSelected, category]);
    };

    const deleteCategorySelection = (e) => {
        const category_id = e.target.value;
        const category = e.target.nextSibling.textContent;

        setSelectedCategory((prevSelected) =>
            prevSelected.filter((item) => item !== category)
        );

        const tempObj = { ...parentCategory };
        delete tempObj[category];
        setParentCategory(tempObj);
    };

    // [Todo] : Add Parent Category filter function
    return (
        <>
            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                <h4>Add Category</h4>
            </div>
            <div className="p-3 d-flex justify-content-center">
                <form
                    onSubmit={handleSubmit}
                    className={`row mt-md-5 g-3 ${classes["add-category-form"]}`}
                >
                    <div className="col-md-12 p-0">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <input
                            required
                            name="category_name"
                            type="text"
                            className="form-control p-2"
                            id="category"
                        />
                    </div>

                    <div
                        className={`dropdown ${classes["parent-category"]} col-md-12 p-0`}
                    >
                        <div className="container-fluid">
                            <div
                                className={`${classes["category-header"]} p-2 row`}
                            >
                                <div
                                    className={`col-10 d-flex align-items-center ${classes["selected-category-list"]}`}
                                >
                                    <p>Selected Category: </p>{" "}
                                    <div
                                        className={`${classes["selected-category"]} d-flex ms-2`}
                                    >
                                        {selectedCategory?.map((category) => (
                                            <p
                                                key={category}
                                                className="d-flex align-items-center rounded-pill px-2 me-2"
                                            >
                                                <span className="me-2">
                                                    {category}
                                                </span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className={`col-2 ${classes["category-search-box"]}`}
                                >
                                    <input
                                        type="text"
                                        className={`py-2`}
                                        name=""
                                        id=""
                                    />
                                </div>
                            </div>
                            <div
                                className={`${classes["category-details"]} p-2 row`}
                            >
                                <div
                                    className={`col-12 d-flex flex-wrap ${classes["category-list"]}`}
                                >
                                    {categoryList &&
                                        !categoryLoading &&
                                        !categoryError &&
                                        categoryList.map((category, index) => (
                                            <label
                                                key={index}
                                                htmlFor={`checkbox${index + 1}`}
                                                className="me-3"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="me-2"
                                                    value={category.category_id}
                                                    onChange={(e) => {
                                                        e.target.checked
                                                            ? addCategorySelection(
                                                                  e
                                                              )
                                                            : deleteCategorySelection(
                                                                  e
                                                              );
                                                    }}
                                                    checked={selectedCategory?.includes(
                                                        category.category_name
                                                    )}
                                                />
                                                {category.category_name}
                                            </label>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <input
                        disabled={loading}
                        className={`btn py-2 mt-2 ${classes["add-category-btn"]}`}
                        type="submit"
                        value="Add Category"
                    />
                </form>
            </div>
            <ToastContainer position="top-right" />
        </>
    );
}
