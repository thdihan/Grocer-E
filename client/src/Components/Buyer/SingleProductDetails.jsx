import classes from "../../Style/Buyer/SingleProductDetails.module.css";
import img from "../../assets/rice.webp";
import ProductBox from "./ProductBox";
export default function SingleProductDetails() {
    return (
        <div style={{ background: "#dddddd8d" }} className={`py-5`}>
            <div className={`${classes["single-product-details"]} pb-5`}>
                <div
                    className={`${classes["product-basic-info"]} container bg-white border py-5`}
                >
                    <div className={`row`}>
                        <div
                            className={`${classes["product-image"]} col-12 d-flex justify-content-center`}
                        >
                            <img src={img} alt="" className={`img-fluid`} />
                        </div>
                        <div
                            className={`${classes["basic-info"]} col-12 pt-5 row`}
                        >
                            <div
                                className={`${classes["title-category"]} col-12 text-center`}
                            >
                                <h3 className={`${classes["product-title"]}`}>
                                    Basmoti Rice
                                </h3>
                                <p className={`${classes["product-category"]}`}>
                                    Rice
                                </p>

                                <p
                                    className={`${classes["product-price"]} m-0 my-3`}
                                >
                                    <del
                                        className={`${classes["fade-base-price"]}`}
                                    >
                                        520 tk
                                    </del>{" "}
                                    <span
                                        className={`${classes["discounted-price"]}`}
                                    >
                                        500 tk
                                    </span>
                                </p>
                            </div>

                            <div
                                className={`${classes["order-button"]} col-12 justify-content-center d-flex`}
                            >
                                <div className={`${classes["quantity"]}`}>
                                    <label htmlFor="product-qty">Qty:</label>
                                    <label
                                        className={`${classes["product-unit"]} border ms-2 rounded`}
                                    >
                                        <input
                                            className={`ps-2`}
                                            type="number"
                                            name="product-qty"
                                            id="product-qty"
                                            min="0"
                                        />
                                        <span>KG</span>
                                    </label>
                                </div>
                                <div className={`${classes["add-to-cart"]} `}>
                                    <button className={``}>Add to cart</button>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${classes["product-details"]} py-5 px-5`}
                        >
                            <h4 className={`text-center`}>
                                Product Description
                            </h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Necessitatibus ipsa ducimus
                                eum eveniet ipsam nam, quo consequuntur, quia
                                perferendis inventore tempora, hic ut beatae
                                expedita repellat fugiat id ab amet? Saepe enim
                                nihil repellat, dolorem nisi nemo voluptates
                                consectetur laborum placeat. Sequi vero esse
                                voluptas atque sed quibusdam officia ratione
                                explicabo, odit, expedita sapiente fugiat beatae
                                dolorem ut consequuntur impedit facilis!
                                Repellat, exercitationem tempora doloremque
                                doloribus unde quasi, cum labore ipsa omnis
                                magnam rem autem reiciendis odio nulla, corporis
                                assumenda aliquid ipsam veniam. Unde rem culpa
                                quae accusamus facilis voluptatem beatae
                                ratione, cum, iste excepturi natus rerum dolore,
                                iure consequatur sint inventore alias voluptate
                                quaerat dicta sequi. Voluptatum corrupti
                                corporis repudiandae. Facere, atque quas
                                corporis ratione vitae quos totam est.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ProductBox
                itemCount={4}
                boxTitle={`Realated Product`}
                category={["1", "2"]}
            />
        </div>
    );
}
