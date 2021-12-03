import { useEffect, useState } from "react";
import { getUser } from "../Api";

function ModalUpdate({ id, setModalUpdate, handle }) {
  const [state, setState] = useState();
  useEffect(() => {
    getUser(id)
      .then((data) => data.json())
      .then((data) => {
        setState(...data)
      });
    //eslint-disable-next-line
  }, []);

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
                  defaultValue={state?.fullname}
                  onChange={(e) =>
                    setState({
                      ...state,
                      fullname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="ModalUpdate-img">
                <img src={state?.img} alt="" />
              </div>
            </div>
            
            <div className="ModalUpdate-sdt item flex">
              <label htmlFor="">Số Điện Thoại: </label>
              <input
                type="text"
                defaultValue={state?.sdt}
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
              <select name="role" value={state?.role} onChange={(e) =>
                  setState({
                    ...state,
                    role: e.target.value,
                  })
                }>
                <option value="1">Admin</option>
                <option value="3">Khách Hàng</option>
              </select>
            </div>
          </div>
          <div className="ModalUpdate-col">
            <div className="Admin-modal-btn">
              <button className="update" onClick={() => handle(state)}>
                Cập Nhật
              </button>
              <button className="cancel" onClick={() => setModalUpdate(false)}>
                Huỷ Bỏ
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ModalUpdate;
