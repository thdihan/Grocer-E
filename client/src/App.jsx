import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Seller/Login";
import Products from "./Components/Seller/Pages/Products";
import SellerAddCategory from "./Components/Seller/Pages/SellerAddCategory";
import SellerAddProduct from "./Components/Seller/Pages/SellerAddProduct";
import SellerCategories from "./Components/Seller/Pages/SellerCategories";
import SellerDashboard from "./Components/Seller/SellerDashboard";
import Signup from "./Components/Seller/Signup";
import { AuthContextProvider } from "./Context/AuthContext";
import Layout from "./Components/Buyer/Layout";
import Home from "./Components/Buyer/Pages/Home";
import SingleProductDetails from "./Components/Buyer/SingleProductDetails";
import Cart from "./Components/Buyer/Pages/Cart";
import Checkout from "./Components/Buyer/Pages/Checkout";
import Profile from "./Components/Buyer/Profile";
import UserInfo from "./Components/Buyer/Pages/UserInfo";
import OrderList from "./Components/Buyer/Pages/OrderList";
import CategoryAllProduct from "./Components/Buyer/Pages/CategoryAllProduct";
function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/signup" element={<Signup />} />
                    <Route path="/admin/*" element={<SellerDashboard />}>
                        <Route path="products" element={<Products />} />
                        <Route
                            path="categories"
                            element={<SellerCategories />}
                        />
                        <Route
                            path="add-category"
                            element={<SellerAddCategory />}
                        />
                        <Route
                            path="add-product"
                            element={<SellerAddProduct />}
                        />
                        <Route
                            path="add-product/:product_Id"
                            element={<SellerAddProduct />}
                        />
                    </Route>
                    <Route path="/*" element={<Layout />}>
                        <Route path="" element={<Home />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route
                            path="product/:id"
                            element={<SingleProductDetails />}
                        />
                        <Route
                            path="category-all-product/:id"
                            element={<CategoryAllProduct />}
                        />
                        <Route path="profile/*" element={<Profile />}>
                            <Route path="" element={<UserInfo />} />
                            <Route path="orders" element={<OrderList />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
