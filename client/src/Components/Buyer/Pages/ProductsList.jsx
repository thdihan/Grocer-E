import { useLocation } from "react-router-dom";
import ProductBox from "../ProductBox";
import classes from "../../Style/Buyer/ProductBox.module.css";
import { useEffect, useState } from "react";
const ProductsList = () => {
    const location = useLocation();
    const { productList, boxTitle } = location.state;

    const [filterProductList, setFilterProductList] = useState(productList);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        if (search) {
            const filteredProductList = productList.filter((product) =>
                product.product_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
            setFilterProductList(filteredProductList);
        } else {
            setFilterProductList(productList);
        }
    }, [search, productList]);

    useEffect(() => {
        if (sort === "low-to-high") {
            const sortedProductList = [...filterProductList].sort(
                (a, b) => a.base_price - b.base_price
            );
            setFilterProductList(sortedProductList);
        } else if (sort === "high-to-low") {
            const sortedProductList = [...filterProductList].sort(
                (a, b) => b.base_price - a.base_price
            );
            setFilterProductList(sortedProductList);
        }
    }, [sort, filterProductList]);
    console.log("ALL PRODUCT LIST: ", productList);
    return (
        <div>
            <div className={`container`}>
                <form className={`${classes["filter-form"]} mt-5`}>
                    <div>
                        <input
                            type="text"
                            name="search"
                            id=""
                            placeholder="Search With Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="sort-by-price">
                            Sort By Price
                            <select
                                className={`ms-3`}
                                name=""
                                id="sort-by-price"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="low-to-high">Low to High</option>
                                <option value="high-to-low">High to Low</option>
                            </select>
                        </label>
                    </div>
                </form>
            </div>
            <ProductBox
                itemCount={productList.length}
                boxTitle={boxTitle}
                boxSize="big"
                productList={filterProductList}
            />
        </div>
    );
};

export default ProductsList;
