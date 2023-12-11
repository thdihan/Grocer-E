import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/user`,
});

// const response = await UserApi.get("/get-single-product?product_id=${product_id}",{
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
