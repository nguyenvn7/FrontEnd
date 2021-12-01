import { useState } from "react";
import AdminOrder from "../Component/AdminOrder";
import AdminProduct from "../Component/AdminProduct.";
import AdminUser from "../Component/AdminUser";
import Footer from "../Component/Footer";

function Admin() {
  const [state, setState] = useState("products");
  return (
    <>
      <main>
        <section className="Admin">
          <div className="Admin-select">
            <div
              className={`Admin-SP ${state==='products' && 'Admin-active'}`}
              onClick={() => setState("products")}
            >
              Sản Phẩm
            </div>
            <div className={`Admin-KH ${state==='users' && 'Admin-active'}`} onClick={() => setState("users")}>
              Khách Hàng
            </div>
            <div className={`Admin-KH ${state==='order' && 'Admin-active'}`} onClick={() => setState("order")}>
              Dơn Đặt Hàng
            </div>
          </div>
        
          {
            {
              "products": <AdminProduct />,
              "users": <AdminUser/>,
              "order": <AdminOrder/>
            }[state]
          }
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Admin;
