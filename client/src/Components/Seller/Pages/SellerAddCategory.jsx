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

        try {
            const response = await SellerApi.post(
                "/add-category",
                formDataObject,
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                        "Content-Type": "application/json",
                    },
                }
            );

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
                        <button
                            className="btn btn-secondary dropdown-toggle w-100 p-0 m-0"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Parent Category
                        </button>
                        <ul className="dropdown-menu">
                            {categoryList.map((category, index) => (
                                <li className="p-2" key={index}>
                                    <label
                                        htmlFor={`cat${index}`}
                                        className="d-inline"
                                    >
                                        <input
                                            type="checkbox"
                                            name={`cat${index}`}
                                            value={category.category_id}
                                            id={`cat${index}`}
                                        />{" "}
                                        {category.category_name}
                                    </label>
                                </li>
                            ))}
                        </ul>
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
