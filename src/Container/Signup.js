import { Link,useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { signup, validationName } from "../Api";

function Signup() {
    const [fullname, setFullName] = useState("");
    const [nameaccount, setNameAccount] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [errvalidationName, setErrValidationName] = useState(false);
    const [err, setErr] = useState(false);
    const [errempty, setErrEmpty] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
      };

      return ( 
          <>
          <main>

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
                <div className="Form-infor">
                  <input type="text" name=""  className="Form-infor-inp Form-Inp" placeholder="Full Name" 
                    onChange = {(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="Form-wrapIp">
                  <input
                    type="text"
                    className="Form-Inp"
                    placeholder="Username"
                    name="text"
                    onBlur={(e)=>{
                      if(e.target.value !== nameaccount){
                        setNameAccount(e.target.value);
                        validationName(e.target.value)
                                    .then(data=> {
                                      if(data === 400){
                                        setErrValidationName(true);
                                        return;
                                      }
                                      setErrValidationName(false);
                                    });
                      }
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
                    className="Form-Inp"
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
                    className="Form-Inp"
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
                {errempty &&  <p className="Form-wrong">
                 Vui Lòng Nhập Đầy Đủ Thông Tin
                </p>}
                <button
                  className="Form-btnIp"
                  onClick={() => {
                    if(!nameaccount || !password || !fullname ){
                      setErrEmpty(true);
                    }else
                    {
                      signup(nameaccount,password,fullname).then(data => {
                      if(data.status === 200){
                        history.push('/login');
                      }else {
                        console.log('loi',data.status)
                      }
                    })
                    }
                  }
                  }
                >
                  Sign Up
                </button>
                <div className="Form-wrap">
                  <p><Link to="/login">Đăng Nhập</Link></p>
                </div>
              </form>
            </div>
          </section>
             
          </main>
          
        </>

     );
}

export default Signup;