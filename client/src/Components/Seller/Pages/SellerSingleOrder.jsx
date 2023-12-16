import { useState } from "react";
import classes from "../../../Style/Seller/SellerSingleOrder.module.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
const SellerSingleOrder = () => {
    const [orderStatus, setOrderStatus] = useState("Pending");

    const updateStatus = (e) => {
        // Close the modal here
        const modal = document.getElementById("exampleModal");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();

        // Clear the modal backdrop overlay
        const modalBackdrop = document.querySelector(".modal-backdrop");
        if (modalBackdrop) {
            modalBackdrop.remove();
        }

        // [Todo] : Update the order status here
    };
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
                        <td className="">
                            {orderStatus}
                            <button
                                type="button"
                                className="btn ms-5 text-black fw-semibold"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                Change Status
                            </button>
                        </td>
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

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Modal title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <select
                                    name="status"
                                    id=""
                                    value={orderStatus}
                                    onChange={(e) =>
                                        setOrderStatus(e.target.value)
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">
                                        Processing
                                    </option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={updateStatus}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerSingleOrder;
