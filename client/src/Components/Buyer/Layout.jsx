import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { CartContextProvider } from "../../Context/CartContext";
export default function Layout() {
    return (
        <CartContextProvider>
            <div>
                <Navbar />
                <Outlet />
            </div>
        </CartContextProvider>
    );
}
