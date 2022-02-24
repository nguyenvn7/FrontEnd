import { useEffect, useState } from "react";
import { deleteOrder, getOrder } from "../Api";
import { AuthState } from "../context/context";
import { formatPrice } from "../helper/index";
import Footer from "../Component/Footer";
import ModalConfirm from "../Component/ModalConfirm";

function Purchase() {
  const [active, setActive] = useState("0");
  const { auth } = AuthState();
  const [products, setProducts] = useState();
  const [confirm, setConfirm] = useState({
    open: false,
  });
  const [isLoad, setIsLoad] = useState(false);

  const handleDelete = (iddh) => {
    deleteOrder(iddh).then(()=> {
      setConfirm({open: false});
      setIsLoad(!isLoad);
    })
  };
  const switchState = (trangthai) => {
    switch (trangthai) {
      case "1":
        return "Chờ Duyệt";
      case "2":
        return "Đang Giao";
      case "3":
        return "Đã Giao";
      default:
        break;
    }
  };

  useEffect(() => {
    console.log("Effect purchase")
    getOrder(auth?.username)
      .then((data) => data.json())
      .then((data) => setProducts(data));
      //eslint-disable-next-line
  }, [isLoad]);

  return (
    <>
      <main>
        <section className="Purchase-wrap">
          <section className="Purchase">
            <section className="Purchase-header">
              <p
                className={`${active === "0" ? "Purchase-active" : ""}`}
                onClick={() => setActive("0")}
              >
                Tất Cả
              </p>
              <p
                className={`${active === "1" ? "Purchase-active" : ""}`}
                onClick={() => setActive("1")}
              >
                Chờ Duyệt
              </p>
              <p
                className={`${active === "2" ? "Purchase-active" : ""}`}
                onClick={() => setActive("2")}
              >
                Đang Giao
              </p>
              <p
                className={`${active === "3" ? "Purchase-active" : ""}`}
                onClick={() => setActive("3")}
              >
                Đã Giao
              </p>
            </section>
            <section className="Purchase-list">
              {products?.map((value) => {
                if (value.trangthai === active || active === "0") {
                  return (
                    <section className="Purchase-item" key={value.idDH}>
                      <div className="Purchase-item-list">
                        {value.listProducts?.map((value2) => (
                          <div className="Purchase-item-item" key={value2.idsp}>
                            <div className="Purchase-name">
                              <div className="Purchase-img">
                                <img src={value2.link} alt="" />
                              </div>
                              <p>
                                {value2.tenSach}
                                <span className="Purchase-qty">
                                  x{value2.quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="Purchase-price">
                        Tổng số tiền:
                        <span>
                          {formatPrice(
                            value.listProducts.reduce(
                              (curr, pre) => curr + pre.price * pre.quantity,
                              0
                            )
                          )}
                        </span>
                      </p>
                      <div className="Purchase-state">
                        <p>{switchState(value.trangthai)}</p>
                        {
                          {
                            1: (
                              <p
                                onClick={() =>
                                  setConfirm({
                                    open: true,
                                    cb: () => handleDelete(value.idDH),
                                    setModal: setConfirm,
                                    title: "Bạn Có Muốn Huỷ Đơn Hàng Không?",
                                    confirm: "Huỷ Đơn",
                                    unConfirm: "Trở Về",
                                  })
                                }
                              >
                                Huỷ Đơn Hàng
                              </p>
                            ),
                            3: (
                              <i
                                className="fas fa-trash-alt delete"
                                onClick={() =>
                                  setConfirm({
                                    open: true,
                                    cb:() => handleDelete(value.idDH),
                                    setModal: setConfirm,
                                    title: "Bạn Có Muốn Xoá Đơn Hàng Không?",
                                    confirm: "Xoá",
                                    unConfirm: "Huỷ",
                                  })
                                }
                              ></i>
                            ),
                          }[value.trangthai]
                        }
                      </div>
                    </section>
                  );
                }
              })}
            </section>
          </section>
        </section>
        {confirm?.open && (
          <ModalConfirm
            cb={confirm.cb}
            setModal={confirm.setModal}
            title={confirm.title}
            confirm={confirm.confirm}
            unConfirm={confirm.unConfirm}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Purchase;
