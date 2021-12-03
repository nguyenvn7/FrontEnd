import { useEffect, useState } from "react";
import { getOrder } from "../Api";
import { AuthState } from "../context/context";
import { formatPrice } from "../helper/index";
import Footer from "../Component/Footer";

function Purchase() {
  const [active, setActive] = useState("0");
  const { auth } = AuthState();
  const [products, setProducts] = useState();

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
    getOrder(auth.username)
      .then((data) => data.json())
      .then((data) => setProducts(data));
  }, []);

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
                                {value2.name}
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
                      <p className="Purchase-state">
                        {switchState(value.trangthai)}
                      </p>
                    </section>
                  );
                }
              })}
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Purchase;
