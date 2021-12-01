import { useState } from "react";
import { validationName } from "../Api";

function ModalUpdate({ id, setModalUpdate, handle }) {
  const [state, setState] = useState();
  const [check, setCheck] = useState(false);

  return (
    <>
      <section className="ModalUpdate">
        <div className="ModalUpdate-wrap">
          <div className="ModalUpdate-col1">
            <i
              onClick={() => setModalUpdate(false)}
              className="fas fa-times-circle close"
            ></i>
          </div>
          <div className="ModalUpdate-col2">
            <div className="ModalUpdate-fullName item ">
              <div className="ModalUpdate-fullName-wrap flex">
                <label htmlFor="">Họ Tên: </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setState({
                      ...state,
                      fullname: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="ModalUpdate-sdt item flex">
              <label htmlFor="">Tài Khoản: </label>
              <input
                type="text"
                onChange={(e) =>
                  setState({
                    ...state,
                    username: e.target.value,
                  })
                }
                onBlur={() =>
                  validationName(state.username).then((data) => {
                    if (data !== 200) {
                      setCheck("isset");
                    } else setCheck(false);
                  })
                }
              />
            </div>
            <div className="ModalUpdate-sdt item flex">
              <label htmlFor="">Mật Khẩu: </label>
              <input
                type="password"
                onChange={(e) =>
                  setState({
                    ...state,
                    pass: e.target.value,
                  })
                }
              />
            </div>
            <div className="ModalUpdate-address item flex">
              <label htmlFor="">Địa Chỉ: </label>
              <input
                type="text"
                onChange={(e) =>
                  setState({
                    ...state,
                    diachi: e.target.value,
                  })
                }
              />
            </div>
            <div className="ModalUpdate-sdt item flex">
              <label htmlFor="">Số Điện Thoại: </label>
              <input
                type="text"
                onChange={(e) =>
                  setState({
                    ...state,
                    sdt: e.target.value,
                  })
                }
              />
            </div>
            <div className="ModalUpdate-role item flex">
              <label htmlFor="">Quyền: </label>
              <select
                name="role"
                onChange={(e) =>
                  setState({
                    ...state,
                    role: e.target.value,
                  })
                }
                defaultValue="default"  
              >
                <option value="default" disabled hidden>
                  Chọn Quyền
                </option>
                <option value="1">Admin</option>
                <option value="3">Khách Hàng</option>
              </select>
            </div>
          </div>
          <div className="ModalUpdate-col">
            <div className="Admin-modal-btn">
              <button className="update" onClick={() => {
                if(!state.username || !state.pass){
                  setCheck("Empty");
                }else handle(state);
              }}>
                Thêm
              </button>
              <button className="cancel" onClick={() => setModalUpdate(false)}>
                Huỷ Bỏ
              </button>
            </div>
          </div>
          {
            {
              "isset": (
                <div className="ModalUpdate-err">
                  <p>Tài Khoản Đã Tồn Tại!</p>
                </div>
              ),
              "Empty": (
                <div className="ModalUpdate-err">
                  <p>Vui Lòng Nhập Đầy Đủ TK MK!</p>
                </div>
              ),
            }[check]
          }
        </div>
      </section>
    </>
  );
}

export default ModalUpdate;
