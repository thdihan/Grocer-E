import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../../../Style/Seller/SellerAddCategory.module.css";
import SellerApi from "../../../apis/SellerApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCategoryList } from "../../../hooks/useCategoryList";
import { useGetSingleProduct } from "../../../hooks/useGetSingleProduct";
import { isNumber, makeSourceURL } from "../../../utilities/utilities";
import TextInput from "../../Common/FormComponents/TextInput";

export default function SellerAddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [fileError, setFileError] = useState(false);
  const { user } = useAuthContext();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { categoryList, categoryError, categoryLoading } =
    useCategoryList(user);

  const [product_name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [base_price, setBasePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");
  const [product_image, setProductImage] = useState("");
  const [category_ids, setCategoryIds] = useState([]);
  const [category_names, setCategoryNames] = useState([]);

  // get product Id from url
  const { product_Id } = useParams();
  const navigate = useNavigate();
  const { productDetails, productDetailsError, productDetailsLoading } =
    useGetSingleProduct(product_Id);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (product_Id) {
      console.log("product_Id: ", product_Id);
      setProductName(productDetails.product_name);
      setDescription(productDetails.description);
      setBasePrice(productDetails.base_price);
      setDiscount(productDetails.discount);
      setUnit(productDetails.unit);
      setStock(productDetails.stock);
      setSelectedFiles([productDetails.product_image]);
      setCategoryIds(productDetails.category_ids);
      setCategoryNames(productDetails.category_names);
      setSelectedCategory(productDetails.categories);
      setEditMode(true);
    }
  }, [productDetails, product_Id]);

  const addCategorySelection = (e) => {
    const category = e.target.value;
    console.log(e.target.value);
    setSelectedCategory((prevSelected) => [...prevSelected, category]);
    // setRelatedCategories((prevSelected) => [...prevSelected, category]);
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
    setProductImage(e.target.value);
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

  useEffect(() => {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        // Refresh the page
        setSelectedCategory([]);
        setLoading(false);
        navigate("../products");
      }
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    console.log("FORMDATAAAA: ", ...formData);
    if (!selectedFiles[0]) {
      //if no file selected/invalid files
      setFileError(true);
      setLoading(false);
      return;
    }
    // formDataObject["product_image"] = selectedFiles[0];
    if (!isNumber(formDataObject["base_price"])) {
      setError("Base price must be a number");
      setLoading(false);
      return;
    }
    if (!isNumber(formDataObject["discount"])) {
      setError("Discount must be a number");
      setLoading(false);
      return;
    }
    if (!isNumber(formDataObject["stock"])) {
      setError("Stock must be a number");
      setLoading(false);
      return;
    }
    formDataObject["base_price"] = parseFloat(formDataObject["base_price"]);
    formDataObject["discount"] = parseFloat(formDataObject["discount"]);
    formDataObject["stock"] = parseFloat(formDataObject["stock"]);

    if (selectedCategory.length === 0) {
      setError("Please select a category");
      setLoading(false);
      return;
    }
    const selectedCategoryIds = selectedCategory.map((selectedCategoryName) => {
      console.log("CATNAMES: ", selectedCategoryName);
      const selectedCategory = categoryList.find(
        (category) => category.category_name === selectedCategoryName
      );
      return selectedCategory ? selectedCategory.category_id : null; // Handle if the category name is not found
    });
    // formDataObject["categories"] = selectedCategoryIds;

    formData.append("categories", selectedCategoryIds);
    formData.append("image", selectedFiles[0]);

    console.log("Form Data Example : ", formDataObject);
    console.log(...formData);
    try {
      const response = await SellerApi.post("/add-product", formData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      toast.success("Product added successfully...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1100, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
      });

      setSelectedCategory([]);
      e.target.reset();

      console.log("ADD CAT: ", response.data);
    } catch (err) {
      setError(err.response.data.error);
      setLoading(false);

      console.log("ADD CAT: ", err);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    console.log("Update FORMDATAAAA: ", formDataObject);
    if (!selectedFiles[0]) {
      //if no file selected/invalid files
      setFileError(true);
      setLoading(false);
      return;
    }
    // formDataObject["product_image"] = selectedFiles[0];
    if (!isNumber(formDataObject["base_price"])) {
      setError("Base price must be a number");
      setLoading(false);
      return;
    }
    if (!isNumber(formDataObject["discount"])) {
      setError("Discount must be a number");
      setLoading(false);
      return;
    }
    if (!isNumber(formDataObject["stock"])) {
      setError("Stock must be a number");
      setLoading(false);
      return;
    }

    formDataObject["base_price"] = parseFloat(formDataObject["base_price"]);
    formDataObject["discount"] = parseFloat(formDataObject["discount"]);
    formDataObject["stock"] = parseFloat(formDataObject["stock"]);
    if (selectedCategory.length === 0) {
      setError("Please select a category");
      setLoading(false);
      return;
    }
    const selectedCategoryIds = selectedCategory.map((selectedCategoryName) => {
      console.log("CATNAMES: ", selectedCategoryName);
      const selectedCategory = categoryList.find(
        (category) => category.category_name === selectedCategoryName
      );
      return selectedCategory ? selectedCategory.category_id : null; // Handle if the category name is not found
    });
    // formDataObject["categories"] = selectedCategoryIds;

    formData.append("categories", selectedCategoryIds);
    formData.append("image", selectedFiles[0]);
    formData.append("product_id", product_Id);

    console.log("Update : Form Data Example : ", formDataObject);
    console.log(formData);
    try {
      const response = await SellerApi.put("/update-product", formData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      toast.success("Product updated successfully...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1100, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
      });

      setSelectedCategory([]);
      e.target.reset();

      console.log("ADD CAT: ", response.data);
    } catch (err) {
      setError(err.response.data.error);
      setLoading(false);

      console.log("ADD CAT: ", err);
    }
  }
  return (
    <>
      <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
        <h4>{product_Id ? "Product Details" : "Add Product"}</h4>
      </div>
      <div className="p-3">
        <form
          onSubmit={editMode ? handleUpdate : handleSubmit}
          encType="multipart/form-data"
          className={`row gx-3 ${classes["add-category-form"]}`}
        >
          <TextInput
            required
            bclass={`col-12 my-2`}
            id={`product-name`}
            type={`text`}
            name="product_name"
            labelText={`Product Name`}
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />

          <div className="col-12 my-2">
            <div className="row gx-2">
              <TextInput
                bclass={`col col-6 pe-2`}
                id={`base-price`}
                type={`text`}
                name="base_price"
                labelText={`Base Price (tk)`}
                required
                value={base_price}
                onChange={(e) => setBasePrice(e.target.value)}
              />
              <TextInput
                bclass={`col col-6 ps-2`}
                id={`discount`}
                type={`text`}
                name="discount"
                labelText={`Discount (%)`}
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
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
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />

              <TextInput
                bclass={`col col-6 ps-2`}
                id={`unit`}
                type={`text`}
                name="unit"
                labelText={`Unit of product`}
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
          </div>
          <div className={`col-12`}>
            <label htmlFor="product-description">Product Description</label>
            <textarea
              required
              name="description"
              id="product-description"
              cols="30"
              rows="10"
              className={`form-control`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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
                          value={category.category_name}
                          onChange={(e) => {
                            e.target.checked
                              ? addCategorySelection(e)
                              : deleteCategorySelection(e);
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

          <div className="col-12">
            <div>
              <img src={makeSourceURL(selectedFiles[0])} alt="" />
            </div>
            <label htmlFor="product-image">Product Image</label>
            <input
              accept="image/*"
              type="file"
              name="image"
              id="product-image"
              onChange={handleFileChange}
            />
          </div>
          {fileError && (
            <p style={{ color: "red" }}>Only jpeg, jpg and png files allowed</p>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {product_Id ? (
            <button className={`btn py-2 mt-2 ${classes["add-category-btn"]}`}>
              Update Product
            </button>
          ) : (
            <input
              className={`btn py-2 mt-2 ${classes["add-category-btn"]}`}
              type="submit"
              value="Add Product"
              disabled={loading}
            />
          )}
        </form>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
