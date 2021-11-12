import { useEffect, useState } from "react";
import { GetInfor } from "../Api";
import { AuthState } from "../context/context";
import Load from "./Load";
import Header from "./Header";
import Footer from "./Footer";

function SettingsAccount() {
  const [auth, setAuth] = AuthState();
  const [infor, setInfor] = useState();
  useEffect(() => {
    GetInfor(auth)
      .then((data) => data.json())
      .then((data) => {
        setInfor(data);
      });
  }, []);
  return (
    <>
      <Header />

      <main>
        {(infor && (
          <>
            <section className="Account">
              <div className="Account-wrap">
                <div className="Account-tittle">
                  <h1>Cài Đặt</h1>
                  <h2>Thông Tin Cá Nhân</h2>
                </div>

                <div className="Account-ListInfor">
                  <div className="Account-ItemInfor">
                    <div className="Account-left">
                      <h3>Họ Tên</h3>
                      <p>
                        {infor.lastname} {infor.firstname}
                      </p>
                    </div>
                    <div className="Account-right">
                      <button className="Account-btn">Chỉnh Sửa</button>
                    </div>
                  </div>

                  <div className="Account-ItemInfor">
                    <div className="Account-left">
                      <h3>Avatar</h3>
                      <div className="Account-wrapimg">
                        <p>
                          Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc
                          GIF.
                        </p>
                        <div className="Account-wrapimg-img">
                          <img
                            src="https://fullstack.edu.vn/assets/images/nobody_m.256x256.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="Account-right">
                      <button className="Account-btn">Chỉnh Sửa</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )) || <Load />}
      </main>

      <Footer />
    </>
  );
}

export default SettingsAccount;
