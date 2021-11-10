import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartState } from "../context/context";
import { queryProduct } from "../Api/index";
import {AuthState} from "../context/context"; 

function Item(props) {
  return (
    <Link className="Item" to={`/Details/${props.name}`}>
      <div className="img">
        <img src={props.src} alt="" />
      </div>
      <div className="details">
        <div className="name">{props.name}</div>
        <div className="des">{props.des}</div>
        <div className="price">{props.price}</div>
      </div>
    </Link>
  );
}

function Header() {
  const [search, setSearch] = useState([]);
  const {
    state: { cart },
  } = CartState();
  const [auth,setAuth] = AuthState();
  const [isStopped, setIsStopped] = useState(true);

  // const handleClickWindow = (e) => {
  //   console.log('window click')
  // }
  useEffect(() => {
    // window.addEventListener('click',handleClickWindow);
    // window.removeEventListener('click',handleClickWindow); 
    return () => {};
  }, []);
  const handleSearch = (nameSearch) => {
    if (nameSearch) queryProduct('name',nameSearch).then(data => setSearch(data.results));    
  };
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setSearch([]);
  };

  return (
    <header>
      <Link to="/" className="logo">
        <div className="img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3296/3296230.png"
            alt=""
          />
        </div>
        <p>BOOK STORE</p>
      </Link>
      <div className="Search" onBlur={handleBlur}>
        <i className="far fa-search Search__icon "></i>
        <input
          type="text"
          className="Search__inp"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={(e) => handleSearch(e.target.value)}
        />

        {search.length !== 0 && (
          <div className="Search__Output">
            {search.map((value) => (
              <Item
                src={value.link}
                name={value.name}
                des={value.description}
                price={value.price}
                key={value.id}
              />
            ))}
          </div>
        )}
      </div>

      <nav>
        <Link to="/">HOME</Link>     
      </nav>
      <div className="Cart">
        <Link to="/Cart">
          <i className="fad fa-cart-plus icon"></i>
          {(cart.length && <div className="Cart-total">{cart.length} </div>) ||
            ""}
        </Link>
      </div>
      {(auth?.username && <div className="Avartar">Avatar</div>) || (<div className="log_sign">
        <div className="login l-s"><Link to="/login">Đăng Nhập</Link></div>
        <div className="signup l-s"><Link to="/signup">Đăng Ký</Link></div>
      </div>) }
    </header>
  );
}

export default React.memo(Header);
