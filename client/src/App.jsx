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
import SellerOrderList from "./Components/Seller/Pages/SellerOrderList";
import SellerSingleOrder from "./Components/Seller/Pages/SellerSingleOrder";
import SellerSingleProductDetails from "./Components/Seller/Pages/SellerSingleProductDetails";
import LoginSignup from "./Components/Buyer/Pages/LoginSignup";
import SingleOrderList from "./Components/Buyer/Pages/SingleOrderList";
import SearchResult from "./Components/Buyer/Pages/SearchResult";
import AllCategories from "./Components/Buyer/Pages/AllCategories";
import DashboardHome from "./Components/Seller/Pages/DashboardHome";
import ProductsList from "./Components/Buyer/Pages/ProductsList";
function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/signup" element={<Signup />} />
                    <Route path="/admin/*" element={<SellerDashboard />}>
                        <Route path="" element={<DashboardHome />} />
                        <Route path="products" element={<Products />} />
                        <Route path="orders" element={<SellerOrderList />} />
                        <Route
                            path="product/:product_Id"
                            element={<SellerSingleProductDetails />}
                        />
                        <Route
                            path="orders/singleOrder/:orderId"
                            element={<SellerSingleOrder />}
                        />
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
                        <Route path="products" element={<ProductsList />} />
                        <Route
                            path="all-categories"
                            element={<AllCategories />}
                        />
                        <Route
                            path="search/:searchQuery"
                            element={<SearchResult />}
                        />
                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="account" element={<LoginSignup />} />
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
                            <Route
                                path="single-order-list"
                                element={<SingleOrderList />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
