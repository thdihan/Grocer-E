import classes from "../../Style/Buyer/SliderArea.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from "../Common/Button";
const SliderArea = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className={`${classes.SliderArea} py-5 mb-5`}>
            <div className={`container`}>
                {/* <div className="row">
                    <div className="col-12 col-md-4">
                        <ul
                            className={`shadow py-4  px-0 ${classes["category-list"]}`}
                        >
                            <h5>
                                <i className="fa-solid fa-border-all"></i>
                                &nbsp; &nbsp; Top Categories
                            </h5>
                            <li>
                                <i className="bi bi-tags-fill"></i> Dairy and
                                Eggs
                            </li>
                            <li>
                                <i className="bi bi-tags-fill"></i> Meat and
                                Poultry
                            </li>
                            <li>
                                <i className="bi bi-tags-fill"></i> Frozen Foods
                            </li>
                            <li>
                                <i className="bi bi-tags-fill"></i> Canned Goods
                            </li>
                            <li>
                                <i className="bi bi-tags-fill"></i> Bakery
                            </li>
                            <li>
                                <i className="bi bi-tags-fill"></i> Beverages
                            </li>
                            <li>
                                <i className="bi bi-tags-fill"></i> Snacks
                            </li>
                            <li>
                                <i className="bi bi-tags-fill"></i> Condiments
                                and Sauces
                            </li>
                            <li>
                                <i className="bi bi-tags-fill"></i> Grains and
                                Pasta
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-8 py-5">
                        <Slider {...settings}>
                            <div
                                className={`${classes["single-slide"]} d-flex flex-md-row flex-column py-5 `}
                            >
                                <div
                                    className={`${classes["slider-info"]} d-flex flex-column px-3 justify-content-center py-3 py-md-0`}
                                >
                                    <h1>20% Discount In First Order</h1>
                                    <p className={`py-3`}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Consequuntur doloribus
                                        labore ratione? Optio accusamus
                                        repudiandae libero esse debitis ipsam
                                        aperiam.
                                    </p>
                                    <div>
                                        <Button text={`Click Here`} />
                                    </div>
                                </div>

                                <div>
                                    <img src={rice} alt="" />
                                </div>
                            </div>
                            <div
                                className={`${classes["single-slide"]} d-flex flex-md-row flex-column py-5 `}
                            >
                                <div
                                    className={`${classes["slider-info"]} d-flex flex-column px-3 justify-content-center py-3 py-md-0`}
                                >
                                    <h1>20% Discount In First Order</h1>
                                    <p className={`py-3`}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Consequuntur doloribus
                                        labore ratione? Optio accusamus
                                        repudiandae libero esse debitis ipsam
                                        aperiam.
                                    </p>
                                    <div>
                                        <Button text={`Click Here`} />
                                    </div>
                                </div>

                                <div>
                                    <img src={rice} alt="" />
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default SliderArea;
