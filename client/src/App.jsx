import "./App.css";
import Login from "./Components/Seller/Login";
import Products from "./Components/Seller/Pages/Products";
import SellerCategories from "./Components/Seller/Pages/SellerCategories";
import SellerDashboard from "./Components/Seller/SellerDashboard";
import Signup from "./Components/Seller/Signup";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/admin/*" element={<SellerDashboard />}>
                    <Route path="products" element={<Products />} />
                    <Route path="categories" element={<SellerCategories />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
