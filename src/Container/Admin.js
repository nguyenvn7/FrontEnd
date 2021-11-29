import { useState } from "react";
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
            <div className={`Admin-KH ${state==='Users' && 'Admin-active'}`} onClick={() => setState("Users")}>
              Khách Hàng
            </div>
          </div>
          {state === "products" ? <AdminProduct /> : <AdminUser/>}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Admin;
