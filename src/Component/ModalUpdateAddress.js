import { useEffect, useState } from "react";
import { getAds } from "../Api";

function UpdateAddress({ setModal, iddc, handle }) {
  const [state, setState] = useState();
  const [check, setCheck] = useState();
  useEffect(() => {
    getAds(iddc)
      .then((data) => data.json())
      .then((data) => setState(data));
  }, []);
  return (
    <>
      {state?.username && (
        <div className="addAddress-wrap">
          <div className="addAddress">
            <div className="addAddress-list">
              <div className="addAddress-item">
                <label>Họ tên: </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setState({
                      ...state,
                      fullname: e.target.value,
                    })
                  }
                  value={state?.fullname}
                />
              </div>
              <div className="addAddress-item">
                <label>SDT : </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setState({
                      ...state,
                      sdt: e.target.value,
                    })
                  }
                  value={state?.sdt}
                />
              </div>
              <div className="addAddress-item">
                <label>Địa Chỉ : </label>
                <textarea
                  cols="30"
                  rows="10"
                  onChange={(e) =>
                    setState({
                      ...state,
                      diachi: e.target.value,
                    })
                  }
                  value={state?.diachi}
                ></textarea>
              </div>

              {state?.state === "0" && (
                <div className="addAddress-item state">
                  <label>Địa Chỉ Mặc Định : </label>
                  <input
                    type="checkbox"
                    onChange={(e) => setCheck((e.target.checked && "1") || "0")}
                  />
                </div>
              )}
            </div>
            <div className="addAddress-btn">
              <button
                className="u"
                onClick={() => {
                  handle({
                    ...state,
                    state: check,
                  });
                }}
              >
                Cập Nhật
              </button>
              <button className="c" onClick={() => setModal(false)}>
                Huỷ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateAddress;
