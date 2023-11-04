import { useState } from "react";
import classes from "../../../Style/Seller/SellerAddCategory.module.css";

export default function SellerAddProduct() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        // Get the selected files from the input element
        const files = e.target.files;
        const selectedFilesArray = [];

        for (let i = 0; i < files.length; i++) {
            selectedFilesArray.push(files[i]);
        }

        // Update the state with the selected files
        setSelectedFiles(selectedFilesArray);
    };
    function handleSubmit(e) {
        e.preventDefault();
        console.log(selectedFiles);
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
                    encType="multipart/form-data"
                    className={`row gx-3 ${classes["add-category-form"]}`}
                >
                    <div className="col-12">
                        <label htmlFor="product-name">Product Name</label>
                        <input
                            type="text"
                            name="product-name"
                            id="product-name"
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="product-image">Product Image</label>
                        <input
                            multiple
                            type="file"
                            name="product-image"
                            id="product-image"
                            onChange={handleFileChange}
                        />
                    </div>
                    <input
                        className={`btn py-2 mt-2 ${classes["add-category-btn"]}`}
                        type="submit"
                        value="Add Product"
                    />
                </form>

                <div>
                    <h2>Selected Image Files:</h2>
                    {selectedFiles.map((file, index) => (
                        <div key={index}>
                            <p>{file.name}</p>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{ maxWidth: "200px" }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
