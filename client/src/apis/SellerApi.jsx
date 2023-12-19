import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/seller`,
});

/** UPDATE ORDER */
//ACCEPTABLE VALUES 'Approved', 'Shipped', 'Pending', 'Completed'

// const response = await BuyerApi.put("/update-order-status",{ order_id, order_status },{
//   headers: {
// Authorization: `Bearer ${user}`,
//     "Content-Type": "application/json",
//   },
// });
