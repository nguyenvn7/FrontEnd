import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CartState } from "../context/context";
import { queryProduct,getLengthCart } from "../Api/index";
import { AuthState } from "../context/context";
import Avatar from "./Avatar";

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
    cartqty: { quantity },
    setCartQty
  } = CartState();
  const {auth} = AuthState();
  useEffect(()=>
  {
             console.log('effect Header');
             getLengthCart((auth?.username || '')).then(data => data.json()).then(data => {
               if(data){  
                setCartQty(...data)
               }else setCartQty({quantity:0});
             });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth.username])

  const handleSearch = (nameSearch) => {
    if (nameSearch)
      queryProduct("name", nameSearch).then((data) => setSearch(data.results));
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
        <Link to="/">TRANG CHỦ</Link>
        {(auth?.role === '1' && <Link to='/admin'>QUẢN LÝ</Link>)}
      </nav>
      <div className="Cart">
        <Link to="/Cart">
          <i className="fad fa-cart-plus icon"></i>
          {(quantity && <div className="Cart-total">{quantity} </div>) ||
            ""}
        </Link>
      </div>
      {(auth?.username && (
        <Avatar />
      )) || (
        <div className="log_sign">
          <div className="login l-s">
            <Link to="/login">Đăng Nhập</Link>
          </div>
          <div className="signup l-s">
            <Link to="/signup">Đăng Ký</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default React.memo(Header);
