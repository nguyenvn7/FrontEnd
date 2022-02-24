import Banner from "../Component/Banner";
import Products from "../Component/Products";
import Footer from "../Component/Footer";
import FakeProduct from "../Component/FakeProduct";
import { useState, useCallback, useEffect } from "react";
import { getProduct, queryProduct } from "../Api";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function HomePage() {
  const [Product, setProduct] = useState([]);
  const searchParams = useLocation().search;
  const page = useQuery().get("page") || "1";
  useEffect(() => {
    getProduct(searchParams)
      .then((data) => {
        setProduct({
          results: data.results,
          ...Object.assign({}, ...data.total),
        })
      }
      )
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const handleSort = (nameSort, value) => {
    // console.log(nameSort,value);
    queryProduct(nameSort, value)
      .then((data) => {
        setProduct({
          results: data.results,
          ...Object.assign({}, ...data.total),
        })
      })
      .catch((err) => console.log(err));
  }


  // console.log(Product)
  return (
    <>
      {/* <Header /> */}

      <main>
        <Banner Products={FakeProduct} />
        {(Product?.results && (
          <Products
            Products={Product.results}
            total={Product.total}
            page={page}
            handleSort={handleSort}
            params={searchParams}
          />
        )) ||
          ""}
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
