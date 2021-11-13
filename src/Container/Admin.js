import Header from "../Component/Header";
import Footer from "../Component/Footer";
import {  CartState } from "../context/context";

function Admin() {
  const formatPrice = (price) => {
    return ("" + price).replace(/(\d)(?=(?:\d{3})+(?:\.|$))/g, (m, p) => {
      return p + ",";
    });
  };
  const {state} = CartState();
  return (
    <>
      <Header />
      <main>
        <section className="Admin">
          <div className="Admin-select">
            <div className="Admin-SP Admin-active">Sản Phẩm</div>
            <div className="Admin-KH">Khách Hàng</div>
          </div>
          <div className="Admin-header">
            <p> Sản Phẩm </p> <p> Thể Loại </p> <p> Số Lượng </p>
            <p> Đơn Giá </p> <button> Thêm Sản Phẩm </button>
          </div>
          <div className="Admin-List">
            
            {state.products.map((value) => (
              <div className="Admin-Item" key={value.id}>
                <div className="Admin-product">
                  <div className="Admin-img">
                    <img src={value.link} alt="" />
                  </div>
                  <p className="Admin-name"> {value.name} </p>
                </div>
                <p> {value.genre} </p> <div className="Admin-qty">200 </div>
                <div className="Admin-price"> {formatPrice(100000)} </div>
                <div className="Admin-btn">
                  <button> Cập Nhật SP </button> <button> Xoá </button>
                </div>
              </div>
            ))}
           
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Admin;
