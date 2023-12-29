import classes from "../../Style/Buyer/ProductSlider.module.css";
import Slider from "react-slick";
import { demoProducts } from "../../demoData/demoProducts";
import SingleProduct from "./SingleProduct";
import { useEffect, useRef, useState } from "react";
import { useGetProduct } from "../../hooks/useGetProduct";
const ProductSlider = ({ itemCount, category }) => {
    const sliderRef = useRef(null);
    const { productList, productLoading, productError } =
        useGetProduct(category);

    const [discountedProductList, setDiscountedProductList] = useState([]);
    useEffect(() => {
        const discountedProductList = productList.filter(
            (product) => product.discount > 0
        );
        const sortedDiscountedProductList = discountedProductList.sort(
            (a, b) => b.discount - a.discount
        );
        setDiscountedProductList(sortedDiscountedProductList);
    }, [productList]);
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };
    return (
        <div className={classes.ProductSlider}>
            <div className={`container`}>
                <div className={`${classes["section-header"]}`}>
                    <p className={`fs-4 m-0 fw-bold`}>
                        <i className="fa-solid fa-bolt"></i> Flash Sell
                    </p>
                </div>
                <div className={`${classes["slider-container"]}`}>
                    <i
                        onClick={() => sliderRef.current.slickPrev()}
                        className={`${classes["prev-btn"]} fa-solid fa-circle-chevron-left`}
                    ></i>
                    <Slider {...settings} ref={sliderRef}>
                        {discountedProductList
                            ?.slice(0, itemCount)
                            .map((product, index) => (
                                <div
                                    className={`${classes["single-product"]}`}
                                    key={index}
                                >
                                    <SingleProduct product={product} />
                                </div>
                            ))}
                    </Slider>
                    <i
                        onClick={() => sliderRef.current.slickNext()}
                        className={`${classes["next-btn"]} fa-solid fa-circle-chevron-right`}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default ProductSlider;
