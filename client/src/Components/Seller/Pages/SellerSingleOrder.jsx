import classes from "../../../Style/Seller/SellerSingleOrder.module.css";

const SellerSingleOrder = () => {
    return (
        <div className={`${classes["SellerSingleOrder"]}`}>
            <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                <h4>Order Details</h4>
            </div>
            <div className={`px-3 py-3 table-responsive bg-white`}>
                <table className={`w-100 table`}>
                    <tr>
                        <td>Order Id</td>
                        <td>#1234</td>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <td>ABCD</td>
                    </tr>
                    <tr>
                        <td>Customer Email</td>
                        <td>
                            <a
                                href="mailto:

                            "
                            >
                                username@gmail.columns
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Customer Phone</td>
                        <td>
                            <a href="tel:1234567890">1234567890</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Customer Address</td>
                        <td>123, ABCD, XYZ, ABCD</td>
                    </tr>
                    <tr>
                        <td>Payment Method</td>
                        <td>Cash on Delivery</td>
                    </tr>
                    <tr>
                        <td>Order Status</td>
                        <td>Pending...</td>
                    </tr>
                    <tr>
                        <td>Total Price</td>
                        <td>1200 tk</td>
                    </tr>
                    <tr>
                        <td>Order Date</td>
                        <td>12/12/2021</td>
                    </tr>
                    <tr>
                        <td>Order Time</td>
                        <td>12:12:12</td>
                    </tr>
                </table>
            </div>

            <div className={`px-3 py-3 table-responsive bg-white`}>
                <h5>Order Products</h5>
                <table className={`w-100 table`}>
                    <tr>
                        <td>Product Id</td>
                        <td>Product Name</td>
                        <td>Product Price</td>
                        <td>Product Quantity</td>
                        <td>Product Total Price</td>
                    </tr>
                    <tr>
                        <td>1234</td>
                        <td>ABCD</td>
                        <td>1200 tk</td>
                        <td>1</td>
                        <td>1200 tk</td>
                    </tr>
                    <tr>
                        <td>1234</td>
                        <td>ABCD</td>
                        <td>1200 tk</td>
                        <td>1</td>
                        <td>1200 tk</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default SellerSingleOrder;
