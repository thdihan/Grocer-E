import ProductBox from "../ProductBox";
import ProductSlider from "../ProductSlider";

import SliderArea from "../SliderArea";
import AllProducts from "./AllProducts";
import FrequentlyBoughtProducts from "./FrequentlyBoughtProducts";
import PopularProducts from "./PopularProducts";

export default function Home() {
    return (
        <div className="">
            <SliderArea />
            <ProductSlider />
            {/* <ProductBox itemCount={6} boxTitle={`All Product`} boxSize="big" /> */}
            <PopularProducts />
            <FrequentlyBoughtProducts />
            <AllProducts />
        </div>
    );
}
