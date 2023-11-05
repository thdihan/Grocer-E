import { useState } from "react";
import classes from "../../../Style/Seller/SellerAddCategory.module.css";
import TextInput from "../../Common/FormComponents/TextInput";

export default function SellerAddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [fileError, setFileError] = useState(false);

  const addCategorySelection = (e) => {
    const category = e.target.value;
    setSelectedCategory((prevSelected) => [...prevSelected, category]);
  };

  const deleteCategorySelection = (e) => {
    const category = e.target.value;
    setSelectedCategory((prevSelected) =>
      prevSelected.filter((item) => item !== category)
    );
  };
  const handleFileChange = (e) => {
    // Get the selected files from the input element
    setFileError(false);
    const files = e.target.files;
    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    const selectedFilesArray = [];

    for (let i = 0; i < files.length; i++) {
      if (allowedImageTypes.includes(files[i].type)) {
        console.log("CORRECT");
        selectedFilesArray.push(files[i]);
      } else {
        console.log("WRONG");
        setFileError(true);
      }
    }

    // Update the state with the selected files
    setSelectedFiles(selectedFilesArray);
  };
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    if (!selectedFiles[0]) {
      //if no file selected/invalid files
      setFileError(true);
      return;
    }
    formDataObject["product_image"] = selectedFiles[0];

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
          <TextInput
            bclass={`col-12 my-2`}
            id={`product-name`}
            type={`text`}
            name="product_name"
            labelText={`Product Name`}
          />

          <div className="col-12 my-2">
            <div className="row gx-2">
              <TextInput
                bclass={`col col-6 pe-2`}
                id={`base-price`}
                type={`text`}
                name="base_price"
                labelText={`Base Price (tk)`}
              />
              <TextInput
                bclass={`col col-6 ps-2`}
                id={`discount`}
                type={`text`}
                name="discount"
                labelText={`Discount (%)`}
              />
            </div>
          </div>
          <div className="col-12 my-2">
            <div className="row gx-2">
              <TextInput
                bclass={`col col-6 pe-2`}
                id={`stock`}
                type={`text`}
                name="stock"
                labelText={`Avaiable Stock`}
              />

              <TextInput
                bclass={`col col-6 ps-2`}
                id={`unit`}
                type={`text`}
                name="unit"
                labelText={`Unit of product`}
              />
            </div>
          </div>

          <div className="col-12 my-2">
            <div className="container-fluid">
              <div className={`${classes["category-header"]} p-2 row`}>
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
                        <span className="me-2">{category}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className={`col-2 ${classes["category-search-box"]}`}>
                  <input type="text" className={`py-2`} name="" id="" />
                </div>
              </div>
              <div className={`${classes["category-details"]} p-2 row`}>
                <div
                  className={`col-12 d-flex flex-wrap ${classes["category-list"]}`}
                >
                  <label htmlFor="checkbox1" className="me-3">
                    <input
                      type="checkbox"
                      className="me-2"
                      value={`category1`}
                      onChange={(e) => {
                        e.target.checked
                          ? addCategorySelection(e)
                          : deleteCategorySelection(e);
                      }}
                    />
                    Category 1
                  </label>
                  <label htmlFor="checkbox2" className="me-3">
                    <input
                      type="checkbox"
                      className="me-2"
                      value={`category2`}
                      onChange={(e) => {
                        e.target.checked
                          ? addCategorySelection(e)
                          : deleteCategorySelection(e);
                      }}
                    />
                    Category 2
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="product-image">Product Image</label>
            <input
              multiple
              type="file"
              name="product_image"
              id="product-image"
              onChange={handleFileChange}
            />
          </div>
          {fileError && (
            <p style={{ color: "red" }}>Only jpeg, jpg and png files allowed</p>
          )}
          {/* {fileError && <p style={{ color: "red" }}>{fileError}</p>} */}
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
