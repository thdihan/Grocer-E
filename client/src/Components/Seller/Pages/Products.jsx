import { Link } from "react-router-dom";
import classes from "../../../Style/Seller/Products.module.css";
import ProductTable from "../ProductsComponents/ProductTable";
import SellerNavItems from "../SidebarComponents/SellerNavItems";

export default function Products() {
  return (
    <>
      <div
        className={`px-3 py-1 border-bottom ${classes["product-status-bar"]} d-flex justify-content-between align-items-center`}
      >
        <h4>Products</h4>
        <ul className="d-flex justify-content-around">
          <SellerNavItems icon="published_with_changes" text="Published" />
          <SellerNavItems icon="draft" text="Draft" />
          <SellerNavItems icon="visibility_off" text="Hidden" />
        </ul>

        <div className="d-flex align-items-center">
          <Link
            to="/admin/add-product"
            className={`btn fw-semibold ${classes["add-product-button"]}`}
          >
            Add New Product
          </Link>
        </div>
      </div>
      <ProductTable />
    </>
  );
}
