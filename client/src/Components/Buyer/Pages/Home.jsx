import ProductBox from "../ProductBox";

export default function Home() {
    return (
        <div className="py-5" style={{ background: "#dddddd8d" }}>
            <ProductBox itemCount={8} boxTitle={`All Product`} />
        </div>
    );
}
