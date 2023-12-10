import ProductBox from "../ProductBox";
import ProductSlider from "../ProductSlider";

import SliderArea from "../SliderArea";

export default function Home() {
    return (
        <div className="">
            <SliderArea />
            <ProductSlider />
            <ProductBox itemCount={6} boxTitle={`All Product`} boxSize="big" />
        </div>
    );
}
