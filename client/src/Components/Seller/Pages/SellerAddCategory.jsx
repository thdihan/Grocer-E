import classes from "../../../Style/Seller/SellerAddCategory.module.css";

export default function SellerAddCategory() {
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);
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
                    <div className="col-md-12">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <input
                            name="category-name"
                            type="text"
                            className="form-control p-2"
                            id="category"
                        />
                    </div>

                    <div
                        className={`dropdown ${classes["parent-category"]} col-md-12`}
                    >
                        <button
                            className="btn btn-secondary dropdown-toggle p-2 mt-3"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Parent Category
                        </button>
                        <ul className="dropdown-menu">
                            <li className="p-2">
                                <label htmlFor="" className="d-inline">
                                    <input
                                        type="checkbox"
                                        name="cat1"
                                        value="cat1"
                                        id=""
                                    />{" "}
                                    Category
                                </label>
                            </li>
                            <li className="p-2">
                                <label htmlFor="" className="d-inline">
                                    <input
                                        type="checkbox"
                                        name="cat2"
                                        value="cat2"
                                        id=""
                                    />{" "}
                                    Category
                                </label>
                            </li>
                            <li className="p-2">
                                <label htmlFor="" className="d-inline">
                                    <input
                                        type="checkbox"
                                        name="cat3"
                                        value="cat3"
                                        id=""
                                    />{" "}
                                    Category
                                </label>
                            </li>
                        </ul>
                    </div>
                    <input
                        className={`btn py-2 mt-2 ${classes["add-category-btn"]}`}
                        type="submit"
                        value="Add Category"
                    />
                </form>
            </div>
        </>
    );
}
