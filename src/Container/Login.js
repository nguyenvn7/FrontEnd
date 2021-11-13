import Header from "../Component/Header";
import { useState } from "react";
import {  Link, useHistory } from "react-router-dom";
import { AuthState } from "../context/context";
import {  login } from "../Api";
import Load from "../Component/Load";

function Login() {
  const {auth,setAuth} = AuthState();
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <main>
       
      { ( load && <Load/>) || (    
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
                    className="Form-Inp"
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
                    className="Form-Inp"
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
                    setLoad(true);    
                    login(name,password)
                    .then(data => {
                      if(data.status === 400){
                        setLoad(false);
                        setStatus(data.status);
                        return '';
                      }
                      return data.json();
                    })
                    .then(data => {                    
                      if(data?.user){
                      setAuth(Object.assign({isLoad:false},...Object.values(data)));
                        history.push('/');
                      }
                    })
                  }}
                >LOGIN</button>
                <div className="Form-wrap">
                  <p> <Link to="/signup">Đăng Ký</Link> </p>
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
