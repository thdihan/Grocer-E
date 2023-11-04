import classes from "../../../Style/Seller/SellerAddCategory.module.css";

export default function SellerAddProduct() {
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);
    }
    return (
        <>
            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                <h4>Add Product</h4>
            </div>
            <div className="p-3">
                <form
                    onSubmit={handleSubmit}
                    className={`row gx-3 ${classes["add-category-form"]}`}
                >
                    <div className=" col col-md-12">
                        <label htmlFor="category" className="form-label">
                            Product Name
                        </label>
                        <input
                            name="product-name"
                            type="text"
                            className="form-control p-2"
                            id="category"
                        />
                    </div>
                    <div className="col col-md-6">
                        <label htmlFor="base-price" className="form-label">
                            Base Price
                        </label>
                        <input
                            name="base-price"
                            type="text"
                            className="form-control p-2"
                            id="base-price"
                        />
                    </div>
                    <div className="col col-md-6">
                        <label htmlFor="base-price" className="form-label">
                            Discount
                        </label>
                        <input
                            name="discount"
                            type="text"
                            className="form-control p-2"
                            id="discount"
                        />
                    </div>

                    <div className="col col-md-12">
                        <label htmlFor="base-price" className="form-label">
                            Stock
                        </label>
                        <input
                            name="stock"
                            type="text"
                            className="form-control p-2"
                            id="stock"
                        />
                    </div>
                    <div className="col col-md-12">
                        <label htmlFor="floatingTextarea2">
                            Product Description
                        </label>
                        <textarea
                            className="form-control"
                            name="description"
                            id="floatingTextarea2"
                            style={{ height: "100px" }}
                        ></textarea>
                    </div>
                    <div className="col col-md-12">
                        <label htmlFor="formFile" className="form-label">
                            Product Image
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"
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
                        value="Add Product"
                    />
                </form>
            </div>
        </>
    );
}
