import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addOrder, getAddress, getProducts } from "../Api";
import { formatPrice } from "../helper";
import { AuthState, CartState } from "../context/context";

function Order() {
  const { state } = useLocation();
  const { auth } = AuthState();
  const [products, setProducts] = useState();
  const [notice, setNotice] = useState();
  const [modal, setModal] = useState();
  const [listAddress, setListAddress] = useState();
  const [stateOfAddress, setStateOfAddress] = useState();
  const {
    cartqty: { quantity },
    setCartQty,
  } = CartState();
  const [user, setUser] = useState();
  let price = products?.reduce(
    (pre, curr) => pre + curr.price * curr.quantity,
    0
  );
  let totalPrice = price + 20000;
  const d = new Date();
  const OrderDate = (date, month) => `${date + 4} Th${month + 1}`;

  const handleSelect = (column, value, cb) => {
    getAddress(column, value)
      .then((data) => data.json())
      .then((data) => {
        cb(data);
        setModal(!modal);
      });
  };

  const handleOrder = () => {
    const listIdsp = products.map((value) => [
      value.idsp,
      value.quantity,
      value.price,
    ]);
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + "/" + month + "/" + day;

    setCartQty({ quantity: quantity - products.length });
    addOrder(auth.username, listIdsp, newdate, user[0]).then((data) =>
      console.log("order", data.status)
    );
  };

  useEffect(() => {
    if (state?.idsp && state.idsp.length >= 1) {
      async function fetchAPI() {
        let resSP = await getProducts(state.username, state.idsp);
        resSP = await resSP.json();
        let resU = await getAddress(["username", "state"], [state.username, 1]);
        resU = await resU.json();
        setProducts(resSP);
        setUser(resU);
      }
      fetchAPI();
    }
    //eslint-disable-next-line
  }, []);
  return (
    <main>
      {products && (
        <section className="Order">
          <section className="Order-header">
            <div className="Order-top">
              <p className="Order-header-tittle">Địa Chỉ Nhận Hàng</p>
              {modal || (
                <button
                  onClick={() =>
                      handleSelect(["username"], [auth.username], setListAddress)               
                  }
                >
                  Thay Đổi
                </button>
              )}
            </div>

            {(modal && (
              <>
              <div className="Order-listAddress">
                  {listAddress?.map((value, index) => (
                    <div className="Order-listAddress-item" key={value?.iddc}>
                      <input
                        type="radio"
                        name="state"
                        id={index}
                        defaultChecked={
                          value?.iddc === user[0]?.iddc ? true : false
                        }
                        onChange={() => setStateOfAddress(value?.iddc)}
                      />
                      <label htmlFor={index}>
                        <div className="Order-infor">
                          <div className="Order-NP">
                            <p>{value?.fullname}</p>
                            <p>{value?.sdt}</p>
                          </div>
                          <p className="Order-address">{value?.diachi}</p>
                          {value?.state === "1" && <p>Mặc Định</p>}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="Order-listAddress-btn">
                  <button
                    className="Order-listAddress-btn-x"
                    onClick={() =>
                      handleSelect(["iddc"], [stateOfAddress], setUser)
                    }
                  >
                    Xác Nhận
                  </button>
                  <button
                    className="Order-listAddress-btn-h"
                    onClick={() => setModal(!modal)}
                  >
                    Huỷ
                  </button>
                </div>
              </>
            )) || (
              <>
                {user && (
                  <div className="Order-infor">
                    <div className="Order-NP">
                      <p>{user[0]?.fullname}</p>
                      <p>{user[0]?.sdt}</p>
                    </div>
                    <p className="Order-address">{user[0]?.diachi}</p>
                    {user[0]?.state === "1" && <p>Mặc Định</p>}
                  </div>
                )}
              </>
            )}
          </section>
          <section className="Admin-List">
            <div className="Order-List-tittle">
              <p>Sản phẩm</p>
              <p>Đơn giá</p>
              <p>Số lượng</p>
              <p>Thành tiền</p>
            </div>
            {products.map((value) => (
              <div className="Admin-Item Order-item" key={value.idsp}>
                <div className="Order-name">
                  <p>{value.name}</p>
                  <div className="Order-img">
                    <img src={value.link} alt="anh" />
                  </div>
                </div>
                <p>{formatPrice(value.price)}</p>
                <p>{value.quantity}</p>
                <p>{formatPrice(+value.price * +value.quantity)}</p>
              </div>
            ))}
          </section>
          <section className="Order-footer">
            <div className="Order-footer-col1">
              <p className="pttt">Phương thức thanh toán</p>
              <p>Thanh toán khi nhận hàng</p>
            </div>
            <div className="Order-footer-col2">
              <p>
                Nhận hàng vào:{" "}
                {`${OrderDate(d.getDate(), d.getMonth())} - ${OrderDate(
                  d.getDate() + 3,
                  d.getMonth()
                )}`}
              </p>
              <p>Tổng tiền hàng: {formatPrice(price)}</p>
              <p>Phí vận chuyển: 20,000</p>
              <p>
                Tổng thanh toán:{" "}
                <span className="totalPrice">{formatPrice(totalPrice)}</span>{" "}
              </p>
            </div>
            <div className="Order-footer-col3">
              <button className="Order-btn" onClick={()=>{
                if(!user.length){
                  setNotice(!notice);
                }
                else handleOrder();
              }}>
                Đặt Hàng
              </button>
            </div>
          </section>
          {notice && (
            <section className="Order-notice">
              <i
                className="fas fa-times-circle close"
                onClick={() => setNotice(!notice)}
              ></i>
              <p>Vui Lòng Cài Đặt Địa Chỉ!</p>
            </section>
          )}
        </section>
      )}
    </main>
  );
}

export default Order;
