import { Link, useLocation } from "react-router-dom";
import classes from "../../Style/Buyer/SingleProductDetails.module.css";
import {
    formatDateAndTimeFromString,
    makeSourceURL,
} from "../../utilities/utilities";
import ProductBox from "./ProductBox";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
export default function SingleProductDetails() {
    const location = useLocation();
    const { newUser } = useAuthContext();
    console.log("New User : ", newUser);
    const {
        product_id,
        product_name,
        description,
        base_price,
        discount,
        unit,
        stock,
        product_image,
        category_ids,
        category_names,
    } = location.state;
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const addReview = (e) => {
        e.preventDefault();
        console.log("Review Added");
        const singleReview = {
            rating,
            review,
            reviewer: newUser,
            review_date: new Date().toISOString(),
        };
        console.log(review);
        setReviews([...reviews, singleReview]);
        // Write API HERE
    };

    const randerStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(
                    <i
                        key={i}
                        className={`fa-solid fa-star text-warning`}
                        onClick={() => setRating(i + 1)}
                    ></i>
                );
            } else {
                stars.push(
                    <i
                        key={i}
                        className={`fa-regular fa-star text-warning`}
                        onClick={() => setRating(i + 1)}
                    ></i>
                );
            }
        }
        return stars;
    };

    return (
        <div className={`py-5`}>
            <div className={`${classes["single-product-details"]} pb-5`}>
                <div
                    className={`${classes["product-basic-info"]} container bg-white border py-5`}
                >
                    <div className={`row`}>
                        <div
                            className={`${classes["product-image"]} col-12 d-flex justify-content-center`}
                        >
                            <img
                                src={makeSourceURL(product_image)}
                                alt=""
                                className={`img-fluid`}
                            />
                        </div>
                        <div
                            className={`${classes["basic-info"]} col-12 pt-5 row`}
                        >
                            <div
                                className={`${classes["title-category"]} col-12 text-center`}
                            >
                                <h3 className={`${classes["product-title"]}`}>
                                    {product_name}
                                </h3>
                                <p className={`${classes["product-category"]}`}>
                                    {category_names?.map((category, index) => (
                                        <Link key={index}>{category}, </Link>
                                    ))}
                                </p>

                                <p
                                    className={`${classes["product-price"]} m-0 my-3`}
                                >
                                    <del
                                        className={`${classes["fade-base-price"]}`}
                                    >
                                        {base_price}
                                    </del>{" "}
                                    <span
                                        className={`${classes["discounted-price"]}`}
                                    >
                                        {base_price -
                                            base_price *
                                                (discount / 100.0)}{" "}
                                        tk
                                    </span>
                                </p>
                            </div>

                            <div
                                className={`${classes["order-button"]} col-12 justify-content-center d-flex align-items-center`}
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
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                        />
                                        <span>KG</span>
                                    </label>
                                </div>
                                <div className={`${classes["add-to-cart"]} `}>
                                    <i className="fa-solid fa-plus"></i>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${classes["product-details"]} py-5 px-5`}
                        >
                            <h4 className={`text-center`}>
                                Product Description
                            </h4>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${classes["review-box"]} pb-5 bg-white`}>
                <div className={`container border `}>
                    <div className={`row`}>
                        <div
                            className={`col-12 px-4 py-3 border-bottom d-flex justify-content-between align-items-center`}
                        >
                            <h5 className={`m-0`}>
                                <i className="fa-solid fa-message"></i> Reviews
                            </h5>
                        </div>

                        {/* Previous Reviews  */}
                        {reviews?.length > 0 &&
                            reviews?.map((review, index) => (
                                <div
                                    className={`col-12 px-4 py-3 border-bottom`}
                                    key={index}
                                >
                                    <div className={`row`}>
                                        <div className={`col-12`}>
                                            <div className={`row`}>
                                                <div
                                                    className={`col-12 col-md-6 d-flex align-items-center`}
                                                >
                                                    <div>
                                                        <h5 className={`mb-2`}>
                                                            {
                                                                review?.reviewer
                                                                    ?.fullname
                                                            }
                                                        </h5>
                                                        <p
                                                            className={`mb-1 fst-italic fs-6 text-secondary`}
                                                        >
                                                            {formatDateAndTimeFromString(
                                                                review.review_date
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`col-12 col-md-6 d-flex justify-content-end`}
                                                >
                                                    <div
                                                        className={`me-3 d-flex`}
                                                    >
                                                        <div
                                                            className={`${classes["ratings"]} pe-2 text-warning`}
                                                        >
                                                            {randerStars(
                                                                review.rating
                                                            )}
                                                        </div>

                                                        <p className={`m-0`}>
                                                            {review.rating}/5
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`col-12`}>
                                                    <p>{review.review}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {/* Review Input Area */}

                        <div className={`col-12 px-4 py-3 border-bottom`}>
                            <form
                                className={`${classes["review-input"]}`}
                                onSubmit={addReview}
                            >
                                <div>
                                    <textarea
                                        name="review"
                                        id=""
                                        className={`w-100 p-2`}
                                        placeholder="Write your review here."
                                        value={review}
                                        onChange={(e) => {
                                            setReview(e.target.value);
                                        }}
                                    ></textarea>
                                </div>
                                <div>
                                    <span className={`pe-2`}>
                                        Rate the product
                                    </span>{" "}
                                    {randerStars(rating)}
                                </div>
                                <div className={`text-end`}>
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className={`btn px-4 py-2`}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ProductBox
                itemCount={4}
                boxTitle={`Related Product`}
                category={category_ids[0]}
            />
        </div>
    );
}
