import { useEffect, useRef, useState } from "react";
import { GetInfor, updateAvatar, updateInformationUser } from "../Api";
import { AuthState, AvatarState } from "../context/context";
import Load from "./Load";
import Footer from "./Footer";

function SettingsAccount() {
  const { auth } = AuthState();
  const inputRef = useRef({});
  const [infor, setInfor] = useState();
  const [tmpInfor,setTmpInfor] = useState();
  useEffect(() => {
    GetInfor(auth)
      .then((data) => data.json())
      .then((data) => {
        setTmpInfor(data);
        setInfor(data);
      });
    //eslint-disable-next-line
  }, []);
  const [update, setUpdate] = useState();
  useEffect(() => {
    if (inputRef.current && Object.keys(inputRef.current).length) {
        inputRef.current.focus();
    }
  }, [update]);
  const handleChange = (e, column) => {
   
      const newInfor = {
        ...infor,
        [column]: e.target.value,
      };
      setInfor(newInfor);
  };
  const handleCancel = (column)=>{
    const newTemp = {
      ...infor,
      [column]: ''
    }
    
    setInfor(newTemp);
  }
  const handleSave = (key,column) => {
    updateInformationUser(auth.username,infor[column], column);
    setTmpInfor(infor)
    setUpdate({
      ...update,
      [key]: ''
    });
  };
  const [settingAvatar, setSettingAvatar] = useState();
  const {setAvatar} = AvatarState();
  const handleSaveAvatar = ()=>{
    updateAvatar(settingAvatar.formData)
        . then(response => response.text())
        .then(data => {
          setAvatar(data);
          setInfor(
            {
              ...infor,
              img: data
            }
          );
        })
      setSettingAvatar();
      setUpdate();
  }
  const handlePreviewAvatar = (e)=>{
    const formData = new FormData();
    let preview;
    if(e.target.files[0]){
      formData.append("type",'img');
      formData.append("nameUser",auth.username);
      formData.append("action","UPDATE_IMG_USER");
      formData.append("avatar",e.target.files[0]);
      preview = URL.createObjectURL(e.target.files[0])   
    }
    setSettingAvatar({
      formData,
      preview
    });
  }
  return (
    <>

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
                        disabled={update?.name? false : true}                       
                        className="Account-name"
                        ref={(e) => (update?.name && (inputRef.current=e))}
                        onChange={(e) => {
                          handleChange(e, "fullname");
                        }}
                        value={infor.fullname}
                      />
                    </div>
                    <div className="Account-right">
                      {update?.name ? (
                        <div className="Account-btn-update">
                          <button className="save" onClick={()=>handleSave('name','fullname')}>
                            Lưu
                          </button>
                          <button
                            className="cancel"
                            onClick={() => {                         
                              setUpdate({
                              ...update,
                              name: ''
                            });
                            handleCancel("fullname");
                            }}
                            
                          >
                            Huỷ
                          </button>
                        </div>
                      ) : (
                        <button
                          className="Account-btn"
                          onClick={() => {
                            setUpdate({
                              ...update,
                              name: 'name'
                            });
                          }}
                        >
                          Chỉnh Sửa
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="Account-ItemInfor">
                    <div className="Account-left">
                      <h3>Số Điện Thoại</h3>
                      <input
                        type="text"
                        autoFocus
                        disabled={update?.sdt? false : true}
                        ref={(e) => (update?.sdt && (inputRef.current=e))}
                        className="Account-name" //fix scss
                        onChange={(e) => {
                          handleChange(e, "sdt");
                        }}
                        value={infor?.sdt || ' '}
                      />
                    </div>
                    <div className="Account-right">
                      {update?.sdt ? (
                        <div className="Account-btn-update">
                          <button className="save" onClick={()=>handleSave('sdt','sdt')}>
                            Lưu
                          </button>
                          <button
                            className="cancel"
                            onClick={() => {
                              setUpdate({
                              ...update,
                              sdt: ''
                            });
                            handleCancel('sdt');
                            }}
                          >
                            Huỷ
                          </button>
                        </div>
                      ) : (
                        <button
                          className="Account-btn"
                          onClick={() => {
                            setUpdate({
                              ...update,
                              sdt: 'sdt'
                            });
                          }}
                        >
                          Chỉnh Sửa
                        </button>
                      )}
                    </div>
                  </div>

                  
                  <div className="Account-ItemInfor">
                    <div className="Account-left">
                      <h3>Địa Chỉ</h3>
                      <input
                        type="text"
                        disabled={update?.diachi? false : true}                       
                        className="Account-name"
                        ref={(e) => (update?.diachi && (inputRef.current=e))}
                        onChange={(e) => {
                          handleChange(e, "diachi");
                        }}
                        value={infor.diachi || ' '}
                      />
                    </div>
                    <div className="Account-right">
                      {update?.diachi ? (
                        <div className="Account-btn-update">
                          <button className="save" onClick={()=>handleSave('diachi','diachi')}>
                            Lưu
                          </button>
                          <button
                            className="cancel"
                            onClick={() => {                         
                              setUpdate({
                              ...update,
                              diachi: ''
                            });
                            handleCancel('diachi');
                            }}
                            
                          >
                            Huỷ
                          </button>
                        </div>
                      ) : (
                        <button
                          className="Account-btn"
                          onClick={() => {
                            setUpdate({
                              ...update,
                              diachi: 'diachi'
                            });
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
                            setUpdate({
                              ...update,
                              img: 'img'
                            });
                          }}
                        >
                          {update?.img? (
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
                                ref = {()=> inputRef.current = {}}
                              />
                            </label>
                          ) : (
                            ""
                          )}
                          <img
                            src={settingAvatar?.preview || infor.img}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="Account-right">
                      {update?.img ? (
                        <div className="Account-btn-update">
                          <button 
                          className="save"
                          onClick={handleSaveAvatar}
                          >Lưu</button>
                          <button
                            className="cancel"
                            onClick={() => {
                              setUpdate({
                                ...update,
                                img: ''
                              });
                              setSettingAvatar();
                            }}
                          >
                            Huỷ
                          </button>
                        </div>
                      ) : (
                        <button
                          className="Account-btn"
                          onClick={() => {
                            setUpdate({
                              ...update,
                              img: 'img'
                            });
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
