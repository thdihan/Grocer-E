import "./App.css";
import Login from "./Components/Seller/Login";
import SellerDashboard from "./Components/Seller/SellerDashboard";
import Signup from "./Components/Seller/Signup";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/admin/dashboard" element={<SellerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
