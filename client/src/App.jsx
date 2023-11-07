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
                    </Route>
                    <Route path="/*" element={<Layout />}>
                        <Route path="" element={<Home />} />
                        <Route path="cart" element={<Cart />} />
                        <Route
                            path="product/:id"
                            element={<SingleProductDetails />}
                        />
                    </Route>
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
