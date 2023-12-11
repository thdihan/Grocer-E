import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/buyer`,
});

/** ADD TO CART */
// const response = await BuyerApi.post("/add-to-cart", {productList, priceTotal, discountTotal, productCount },{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });

/** GET CURRENT CART */
// const response = await BuyerApi.get("/get-cart",{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });
