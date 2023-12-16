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

/** CONFIRM ORDER */
// const response = await BuyerApi.post("/confirm-order", { cart_id, customer_details },{
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

/** GET PENDING CART PRODUCTS*/
// const response = await BuyerApi.get("/get-pending-products",{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });

/** UPDATE CART */
// const response = await BuyerApi.put("/update-cart",{ product_id, cart_id, quantity },{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });
