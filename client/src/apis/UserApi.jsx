import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/user`,
});

/**GET SINGLE PRODUCT DETAILS */
// const response = await UserApi.get("/get-single-product?product_id=${product_id}",{
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/**GET CATEGORY BASED PRODUCT LIST */
// const response = await UserApi.get("/get-category-based-product?category_id=${category_id}",{
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
