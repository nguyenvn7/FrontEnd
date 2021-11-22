import { useEffect, useRef, useState } from "react";
import { GetInfor, updateAvatar, updateInformationUser } from "../Api";
import { AuthState } from "../context/context";
import Load from "./Load";
import Header from "./Header";
import Footer from "./Footer";

function SettingsAccount() {
  const { auth } = AuthState();
  const inputRef = useRef({});
  const [infor, setInfor] = useState();
  useEffect(() => {
    GetInfor(auth)
      .then((data) => data.json())
      .then((data) => {
        setInfor(data);
      });
    //eslint-disable-next-line
  }, []);
  const [update, setUpdate] = useState();
  useEffect(() => {
    if (update !== "img" && update) {
      inputRef.current[update].focus();
    }
  }, [update]);
  const handleUpdate = (e, column) => {
    if (infor[column] !== e.target.value) {
      const newInfor = {
        ...infor,
        [column]: e.target.value,
      };
      setInfor(newInfor);
    }
  };
  const handleSave = (column) => {
    updateInformationUser(auth.username,infor[column], column);
    setUpdate();
  };
  const [avatar, setAvatar] = useState();
  const handleSaveAvatar = ()=>{
    updateAvatar(avatar.formData)
        . then(response => response.text())
        .then(data => setInfor(
          {
            ...infor,
            img: data
          }
        ))
      setAvatar();
      setUpdate();
  }
  const handlePreviewAvatar = (e)=>{
    const formData = new FormData();
    let preview;
    if(e.target.files[0]){
      formData.append("avatar",e.target.files[0]);
      preview = URL.createObjectURL(e.target.files[0])   
    }
    setAvatar({
      formData,
      preview
    });
  }
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
                      <input
                        type="text"
                        disabled={update === "name" ? false : true}
                        ref={(e) => (inputRef.current.name = e)}
                        className="Account-name"
                        onBlur={(e) => {
                          handleUpdate(e, "fullname");
                        }}
                        defaultValue={infor.fullname}
                      />
                    </div>
                    <div className="Account-right">
                      {update === "name" ? (
                        <div className="Account-btn-update">
                          <button className="save" onClick={()=>handleSave('fullname')}>
                            Lưu
                          </button>
                          <button
                            className="cancel"
                            onClick={() => setUpdate()}
                          >
                            Huỷ
                          </button>
                        </div>
                      ) : (
                        <button
                          className="Account-btn"
                          onClick={() => {
                            setUpdate("name");
                          }}
                        >
                          Chỉnh Sửa
                        </button>
                      )}
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
                        <div
                          className="Account-wrapimg-img"
                          onClick={() => {
                            setUpdate("img");
                          }}
                        >
                          {update === "img" ? (
                            <label htmlFor="avatar" className="label-avatar">
                              <img
                                src="https://fullstack.edu.vn/assets/icon/camera.png"
                                alt=""
                              />
                              <input
                                type="file"
                                id="avatar"
                                className="avatar"
                                onChange={(e)=>handlePreviewAvatar(e)}
                              />
                            </label>
                          ) : (
                            ""
                          )}
                          <img
                            src={
                              avatar?.preview ||
                              (infor.img || "https://img.favpng.com/1/4/11/portable-network-graphics-computer-icons-google-account-scalable-vector-graphics-computer-file-png-favpng-HScCJdtkakJXsS3T27RyikZiD.jpg")
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="Account-right">
                      {update === "img" ? (
                        <div className="Account-btn-update">
                          <button 
                          className="save"
                          onClick={handleSaveAvatar}
                          >Lưu</button>
                          <button
                            className="cancel"
                            onClick={() => {
                              setUpdate();
                              setAvatar();
                            }}
                          >
                            Huỷ
                          </button>
                        </div>
                      ) : (
                        <button
                          className="Account-btn"
                          onClick={() => {
                            setUpdate("img");
                          }}
                        >
                          Chỉnh Sửa
                        </button>
                      )}
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
