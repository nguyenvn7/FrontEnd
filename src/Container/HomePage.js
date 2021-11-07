
import Banner from "../Component/Banner";
import Products from "../Component/Products";  
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import FakeProduct from "../Component/FakeProduct";
import {useState,useCallback,useEffect} from 'react';
import {getProduct,queryProduct} from "../Api";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function HomePage (){
    const [Product, setProduct] = useState([]);
    const searchParams = useLocation().search;
    const page = useQuery().get('page') || '1';
    useEffect(() => {
       getProduct(searchParams)
       .then(data => setProduct({
            results:data.results,
            ...Object.assign({},...data.total)
       }))
       .catch(err => console.log(err))
    }, [searchParams])
    const handleSort = useCallback(
        (nameSort,value) => {
            queryProduct(nameSort,value)
                       .then(data => setProduct(data))
                       .catch(err => console.log(err))
        },
        [Product],
    )
    

    return(
    <>
        <Header/>
        
        <main>
            <Banner Products={FakeProduct}/>
            {Product?.results && <Products Products={Product.results} total={Product.total} page={page} handleSort={handleSort} params={searchParams}/> || ''}
        </main>
        <Footer/>
    </>
    )
}

export default HomePage;


