

function ModalUpdate({ id, setModalUpdate, handle }) {
//   const [state, setState] = useState();

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
                <input type="text" />
              </div>           
            </div>
            <div className="ModalUpdate-address item flex">
              <label htmlFor="">Địa Chỉ: </label>
              <input type="text"  />
            </div>
            <div className="ModalUpdate-sdt item flex">
              <label htmlFor="">Số Điện Thoại: </label>
              <input type="text" />
            </div>
            <div className="ModalUpdate-role item flex">
              <label htmlFor="">Quyền: </label>
              <select name="role" >
                <option value="1">Admin</option>
                <option value="3">Khách Hàng</option>
              </select>
            </div>
          </div>
          <div className="ModalUpdate-col">
            <div className="Admin-modal-btn">
              <button
                className="update"
                onClick={()=> handle()}
              >
               Thêm
              </button>
              <button
                className="cancel"
                onClick={()=> setModalUpdate(false)}  
              >
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
