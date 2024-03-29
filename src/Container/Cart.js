import Footer from "../Component/Footer";
import { AuthState, CartState } from "../context/context";
import { formatPrice } from "../helper";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteItemCart,
  deleteItemsCart,
  getCart,
  updateQtyCart,
} from "../Api";

function Cart() {
  const [productCart, setProductCart] = useState([]);
  const [modal, setModal] = useState(false);
  const { auth } = AuthState();
  const history = useHistory();
  const {
    cartqty: { quantity },
    setCartQty,
  } = CartState();
  const checkedAll =
    productCart.length && productCart.every((value) => value.select);

  const handleBlur = (e, index, value) => {
    const regex = new RegExp("\\D");
    const newQty = +e.target.value;
    if (regex.test(e.target.value)) {
      e.target.value = value.quantity;
      alert("vui Long Chi Nhap So");
    } else {
      if (newQty === 0) {
        alert("xoa sp");
        handleDelete([[value.idsp, auth.username]]);
        setCartQty({ quantity: quantity - 1 });
      } else {
        updateQtyCart(value.idsp, newQty, auth.username).then((data) =>
          console.log(data.status)
        );
        const newP = [...productCart.map((value) => Object.assign({}, value))];
        newP[index].quantity = newQty;
        setProductCart(newP);
      }
    }
  };
  const handleDelete = (value) => {
    const newP = [
      ...productCart.filter(
        (data) => !value.some((data2) => data.idsp === data2[0])
      ),
    ];
    if (value.length === 1) {
      const newArr = value[0];
      deleteItemCart(newArr[1], newArr[0]).then((data) =>
        console.log(data.status)
      );
    } else deleteItemsCart(value).then((data) => console.log(data.status));
    setProductCart(newP);
  };
  const handleUpdateQty = ({ idsp }, index, qty) => {
    const newP = [...productCart.map((value) => Object.assign({}, value))];
    newP[index].soLuong = qty;
    updateQtyCart(idsp, newP[index].soLuong, auth.username).then((data) =>
      setProductCart(newP)
    );
  };

  const handleCheckInp = (index) => {
    const newP = [...productCart.map((value) => Object.assign({}, value))];
    newP[index].select = !newP[index].select;
    setProductCart(newP);
  };
  const handleCheckInpAll = (stateSelect) => {
    const newP = [
      ...productCart.map((value) => {
        const newSelect = Object.assign({}, value);
        newSelect.select = stateSelect;
        return newSelect;
      }),
    ];
    setProductCart(newP);
  };
  useEffect(() => {
    console.log("effect page Cart");
    if (auth?.username) {
      getCart(auth.username)
        .then((data) => data.json())
        .then((data) => {
          setProductCart(data.map((value) => ({ ...value, select: false })));
        });
    }
    return () => setProductCart();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {/* <Header /> */}
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
                      handleCheckInpAll(e.target.checked);
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
                  productCart.map((value, index) => (
                    <div className="Cart-item" key={value.idsp}>
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
                        <p className="Cart-itemName"> {value.tenSach} </p>
                      </div>
                      <div className="Cart-itemWrap">
                        <p className="Cart-itemPrice">
                          {formatPrice(value.gia)}
                        </p>
                        <div className="Cart-inp">
                          <label
                            onClick={() => {
                              if (value.soLuong > 1) {
                                const qty = value.soLuong - 1;
                                handleUpdateQty(
                                  {
                                    ...value,
                                  },
                                  index,
                                  qty
                                );
                              } else {
                                alert("xoa sp");
                                handleDelete([[value.idsp, auth.username]]);
                                setCartQty({ quantity: quantity - 1 });
                              }
                            }}
                            className="Cart-label"
                          >
                            -
                          </label>
                          <input
                            type="text"
                            min="0"
                            onBlur={(e) => handleBlur(e, index, value)}
                            onChange={(e) => {
                              const newP = [
                                ...productCart.map((value) =>
                                  Object.assign({}, value)
                                ),
                              ];
                              newP[index].soLuong = e.target.value;
                              setProductCart(newP);
                            }}
                            value={value?.soLuong}
                          />
                          <label
                            onClick={() => {
                              const qty = value.soLuong + 1;
                              handleUpdateQty(
                                {
                                  ...value,
                                },
                                index,
                                qty
                              );
                            }}
                            className="Cart-label"
                          >
                            +
                          </label>
                        </div>
                        <p className="Cart-itemTotal">
                          {formatPrice(value.soLuong * value.gia)}
                        </p>
                        <button
                          onClick={() => {
                            handleDelete([[value.idsp, auth.username]]);
                            setCartQty({ quantity: quantity - 1 });
                          }}
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
                      handleCheckInpAll(e.target.checked);
                    }}
                  />
                  <label htmlFor="cbAll">
                    Chọn Tất Cả({productCart.length})
                  </label>
                  <button
                    className="footer-del"
                    onClick={() => {
                      if (!productCart.some((value) => value.select)) {
                        setModal(true);
                        setTimeout(() => setModal(false), 1000);
                      } else {
                        const arr = [];
                        productCart.map((value) => {
                          if (value.select) {
                            arr.push([value.idsp, auth.username]);
                          }
                          return 0;
                        });
                        setCartQty({ quantity: quantity - arr.length });
                        handleDelete(arr);
                      }
                    }}
                  >
                    Xoá
                  </button>
                </div>
                <div className="Cart-right">
                  <div className="Cart-right-wrap">
                    <p>
                      Tổng thanh toán(
                      {productCart.filter((value) => value.select).length} Sản
                      Phẩm):
                    </p>
                    <p>
                      {formatPrice(
                        productCart.reduce((prev, curr) => {
                          if (curr.select) {
                            return prev + curr.gia * curr.soLuong;
                          }
                          return prev;
                        }, 0)
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      let listIdsp = [];
                      productCart.map((value) => {
                        if (value.select) listIdsp.push(value.idsp);
                      });
                      if (!listIdsp.length) {
                        setModal(!modal)
                      } else {
                        history.push("/Order", {
                          username: auth.username,
                          idsp: listIdsp
                        });
                      }
                    }}
                    className="Cart-buy"
                  >
                    MUA HÀNG
                  </button>
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
                  <Link to="/" className="Cart-buy">
                    Mua Ngay
                  </Link>
                </div>
              </>
            )}
        </div>
        {modal && (
          <div className="Cart-modal settingAccModal">
            <div className="close-s">
            <i
              onClick={() => setModal(!modal)}
              className="fas fa-times-circle "
            ></i>
            </div>
            <p>Vui Lòng Chọn Sản Phẩm</p>
          </div>
        )}
      
      </main>
      <Footer />
    </>
  );
}

export default Cart;
