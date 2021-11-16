import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { AuthState, CartState } from "../context/context";
import { formatPrice } from "../helper";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import { getCart, updateQtyCart } from "../Api";


function Cart() {
  const { state, dispatch } = CartState();
  const [productCart,setProductCart] = useState([]);
  const [modal, setModal] = useState(false);
  const {auth} = AuthState();
  const checkedAll = productCart.length && productCart.every(value => value.select);

  const handleChange = (e, value) => {
    value.quantity = +e.target.value;
    if (e.target.value === "" || e.target.value === "0") {
      window.alert("Muon Xoa");
    }
    // dispatch({
    //   type: "CHANGE_CART_QTY",
    //   payload: value,
    // });
    
  };
  const handleIncreaseValue = (value) => {
    value.quantity += 1;
    // dispatch({
    //   type: "CHANGE_CART_QTY",
    //   payload: value,
    // });
    // updateQtyCart(value.quantity).then(data => console.log(data.status))
  };
  const handleReduceValue = (value) => {
    if (value.quantity === 1) {
      window.alert("Muon xoa");
      value.quantity -= 1;
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: value,
      });
    } else {
      value.quantity -= 1;
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: value,
      });
    }
  };
  const handleCheckInp = (index) => {
    const newP = [...productCart.map(value => Object.assign({},value))];
    newP[index].select = !newP[index].select;
    setProductCart(newP);
  };
  const handleCheckInpAll = (stateSelect) => {
    const newP = [...productCart.map(value => {
      const newSelect = Object.assign({},value);
      newSelect.select = stateSelect;
      return newSelect;
    })];
    setProductCart(newP);
  };
  useEffect(()=>{
    if(auth?.username){
      getCart(auth.username)
      .then(data => data.json())
      .then(data => {
        setProductCart(data.map(value => ({...value,select: false})));
      } );
    }
    return ()=>setProductCart();
    //eslint-disable-next-line
  },[])
  return (
    <>
      <Header />
      <main>
        <div className="Cart-wrap">         
          {(productCart?.length && (
            <>
              <div className="Cart-header">
                <div className="Cart-btn">
                  <input
                    type="checkbox"
                    checked={checkedAll}
                    onChange={(e) => {
                      handleCheckInpAll(e.target.checked)
                    }}
                  />
                  <label htmlFor=""> Sản Phẩm </label>
                </div>
                <div className="Cart-tittle">
                  <p> Đơn Giá </p> <p> Số Lượng </p> <p> Số Tiền </p>
                  <p> Thao Tác </p>
                </div>
              </div>
              <div className="Cart-Products">
                {(productCart?.length &&
                  productCart.map((value,index) => (
                    <div className="Cart-item" key={value.id}>
                      <input
                        type="checkbox"
                        className="Cart-itemBtn"
                        checked={value.select}
                        onChange={() => handleCheckInp(index)}                         
                      />
                      <div className="Cart-itemDes">
                        <div className="Cart-itemImg">
                          <img src={value.link} alt="" />
                        </div>
                        <p className="Cart-itemName"> {value.name} </p>
                      </div>
                      <div className="Cart-itemWrap">
                        <p className="Cart-itemPrice">
                          {formatPrice(value.price)}
                        </p>
                        <div className="Cart-inp">
                          <label
                            onClick={() =>
                              handleReduceValue({
                                ...value,
                              })
                            }
                            className="Cart-label"
                          >
                            -
                          </label>
                          <input
                            type="number"
                            min="0"
                            onChange={(e) => handleChange(e, value)}
                            value={value.quantity}
                          />
                          <label
                            onClick={() =>
                              handleIncreaseValue({
                                ...value,
                              })
                            }
                            className="Cart-label"
                          >
                            +
                          </label>
                        </div>
                        <p className="Cart-itemTotal">
                          {formatPrice(value.quantity * value.price)}
                        </p>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: value,
                            })
                          }
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  ))) ||
                  ""}
              </div>
              <div className="Cart-footer">
                <div className="Cart-btn">
                  <input
                    type="checkbox"
                    id="cbAll"
                    checked={checkedAll}
                    onChange={(e) => {
                      handleCheckInpAll(e.target.checked)
                    }}
                  />
                  <label htmlFor="cbAll"> Chọn Tất Cả({state.cart.length}) </label>
                  <button 
                  className="footer-del"
                  onClick={()=>{
                    if(!state.cart.some(value => value.select)){
                      setModal(true);
                      setTimeout(()=> setModal(false),1000);
                    }else {
                      dispatch({
                        type: 'REMOVE_SELECT_FROM_CART',
                        payload: state.cart.filter(value => value.select)
                      });
                    }
                  }}
                  > Xoá </button>
                </div>
                <div className="Cart-right">
                  <div className="Cart-right-wrap">
                    <p> Tổng thanh toán({state.cart.filter(value => value.select).length} Sản Phẩm): </p> 
                    <p>{formatPrice(state.cart.reduce((prev,curr) => {
                        if(curr.select){
                          return prev+(curr.price*curr.quantity)
                        }
                        return prev;
                    } ,0))}</p>
                  </div>
                  <button className="Cart-buy"> MUA HÀNG </button>
                </div>
              </div>
            </>
          )) || (
            <>
              <div className="Cart-empty">
                <div className="Cart-img">
                  <img
                    src="https://chicken1000.com/images/img-empty.png"
                    alt=""
                  />
                </div>
                <p>Giỏ Hàng Của Bạn Còn Trống</p>
                <Link to="/" className="Cart-buy">Mua Ngay</Link>
              </div>
            </>
          )}
        </div>
       {modal &&  
       <div className="Cart-modal">
          <p>Vui Lòng Chọn Sản Phẩm</p>
        </div>}
      </main>
      <Footer />
    </>
  );
}

export default Cart;
