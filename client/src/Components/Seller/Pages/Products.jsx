import SellerNavItems from "../SidebarComponents/SellerNavItems";
import classes from "../../../Style/Seller/Products.module.css";
import ProductTable from "../ProductsComponents/ProductTable";
export default function Products() {
    return (
        <>
            <div
                className={`px-5 py-1 border-bottom ${classes["product-status-bar"]}`}
            >
                <ul className="d-flex justify-content-around">
                    <SellerNavItems
                        icon="published_with_changes"
                        text="Published"
                    />
                    <SellerNavItems icon="draft" text="Draft" />
                    <SellerNavItems icon="visibility_off" text="Hidden" />
                </ul>
            </div>
            <ProductTable />
        </>
    );
}
