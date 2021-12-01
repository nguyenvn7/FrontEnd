import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../Api";
function Order() {
  const { state } = useLocation();
  const [products, setProducts] = useState();
  useEffect(() => {
    if (state?.username) {
      getProducts(state.username, state.idsp)
        .then((data) => data.json())
        .then((data) => setProducts(data));
    }
    //eslint-disable-next-line
  }, []);
  return (
    <main>
      {products && (
        <section className="Order">
          <section className="Order-header">
            <p className="Order-header-tittle">Địa Chỉ Nhận Hàng</p>
            <div className="Order-infor">
              <div className="Order-NP">
                <p>Nguyễn Trung Nguyên</p>
                <p>0368896743</p>
              </div>
              <p className="Order-address">
                hẻm số đỏ , Đường Nguyễn Văn Cừ, Cái Khế, Ninh Kiều, Cần Thơ,
                Việt Nam, Phường Cái Khế, Quận Ninh Kiều, Cần Thơ
              </p>
            </div>
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
                <p>{value.price}</p>
                <p>{value.quantity}</p>
                <p>{(+value.price * +value.quantity)}</p>
              </div>
            ))}
          </section>
          <section className="Admin-footer">
              
          </section>
        </section>
      )}
    </main>
  );
}

export default Order;
