import { useState } from "react";

function AddAddress({setModal,handleAdd}) {
  const [state, setState] = useState();
  return (
    <div className="addAddress-wrap">
      <div className="addAddress">
        <div className="addAddress-list">
          <div className="addAddress-item">
            <label>Họ tên: </label>
            <input type="text" onChange={(e)=> setState({
              ...state,
              name: e.target.value
            })}/>
          </div>
          <div className="addAddress-item">
            <label>SDT : </label>
            <input type="text"  onChange={(e)=> setState({
              ...state,
              sdt: e.target.value
            })} />
          </div>
          <div className="addAddress-item">
            <label>Địa Chỉ : </label>
            <textarea cols="30" rows="10" onChange={(e)=> setState({
              ...state,
              address: e.target.value
            })}></textarea>
          </div>
        </div>
        <div className="addAddress-btn">
            <button className="u" onClick={()=> handleAdd(state)} >Thêm</button>
            <button className="c" onClick={()=> setModal(false)}>Huỷ</button>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
