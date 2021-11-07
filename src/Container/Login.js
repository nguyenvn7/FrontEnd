import Header from "../Component/Header";
import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { CartState } from "../context/context";
import { login, signup, validationName } from "../Api";
import Cookies from "js-cookie";

function Login() {
  const { auth, setAuth } = CartState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errvalidationName, setErrValidationName] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState(0);
  const [err, setErr] = useState(false);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Header />
      <main>
        {(toggle && (
          <section className="Form">
            <div className="wrap">
              <div className="Form-img">
                <img
                  src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
                  alt=""
                />
              </div>
              <form onSubmit={handleSubmit} method="POST">
                <p className="Form-tittle">Member Sign</p>
                <div className="Form-wrapIp">
                  <input
                    type="email"
                    className="Form-btnIp"
                    placeholder="Username"
                    name="email"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e)=>{
                      validationName(e.target.value)
                                    .then(data=> {
                                      console.log(data)
                                      if(data === 400){
                                        setErrValidationName(true);
                                        return;
                                      }
                                      setErrValidationName(false);
                                    });
                    }}
                    autoComplete="off"
                  />
                  <i className="fal fa-user-circle"></i>
                </div>
                {errvalidationName &&  <p className="Form-wrong">
                 Tên Người Dùng Đã Được Sử Dụng!
                </p>}
                <div className="Form-wrapIp">
                  <input
                    type="password"
                    className="Form-btnIp"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                  <i className="fas fa-lock lock"></i>
                </div>
                <div className="Form-wrapIp">
                  <input
                    type="password"
                    className="Form-btnIp"
                    placeholder="Confirm Password"
                    name="Confirm password"
                    onBlur={(e)=> {
                      if(password!==e.target.value){
                        setErr(true);
                      }else setErr(false);
                    }}
                    autoComplete="off"
                  />
                  <i className="fas fa-lock lock"></i>
                </div>
               {err &&  <p className="Form-wrong">
                 Mật Khẩu Đã Nhập Không Khớp!
                </p>}
                <button
                  className="Form-btnIp"
                  onClick={() => signup()
                  }
                >
                  Sign Up
                </button>
                <div className="Form-wrap">
                  <p onClick={() => setToggle(!toggle)}>Đăng Nhập</p>
                </div>
              </form>
            </div>
          </section>
        )) || (
          <section className="Form">
            <div className="wrap">
              <div className="Form-img">
                <img
                  src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
                  alt=""
                />
              </div>
              <form onSubmit={handleSubmit} method="POST">
                <p className="Form-tittle">Member Login</p>
                <div className="Form-wrapIp">
                  <input
                    type="text"
                    className="Form-btnIp"
                    placeholder="Username"
                    name="email"
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                  />
                  <i className="fal fa-user-circle"></i>
                </div>
                <div className="Form-wrapIp">
                  <input
                    type="password"
                    className="Form-btnIp"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                  <i className="fas fa-lock lock"></i>
                </div>
               {status===400 &&  <p className="Form-wrong">
                  Tên Đăng Nhập Hoặc Mật Khẩu Không Chính Xác
                </p>}
                <button className="Form-btnIp"
                   onClick={() => {      
                    login(name,password)
                    .then(data => data.json())
                    .then(value => console.log(value))
                      // .then(data=>{
                      //   console.log(data)
                      //     if(data===200){
                      //       history.push('/admin');
                      //     }else {
                            
                      //     }
                      // })
                  }}
                >LOGIN</button>
                <div className="Form-wrap">
                  <p onClick={() => setToggle(!toggle)}>Đăng Ký</p>
                </div>
              </form>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default Login;
