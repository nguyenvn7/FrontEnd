import { useEffect, useState } from "react";
import { getUsers, updateUser } from "../Api";
import ModalUpdate from "./ModalUpdate";
import ModalAdd from "./ModalAdd";

function AdminUser() {
  const [users, setUsers] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [modalUpdate, setModalUpdate] = useState({
    isOpen: false,
    id: "",
  });
  const handleUpdate = (value) => {
    updateUser(value)
              .then(data => console.log(data.status))
  };
  const handleAdd = ()=>{
    console.log("Add");
  }
  useEffect(() => {
    getUsers()
      .then((data) => data.json())
      .then((data) => setUsers(data));
  }, [isLoad]);
  
  return (
    <>
      <div className="Admin-header">
        <p> Họ Tên </p>
        <p> Địa Chỉ </p>
        <p> Số Điện Thoại </p>
        <p> Quyền </p>
        <button
          onClick={() =>
            setModalUpdate({
              isOpen: 'Add',
              id: "",
            })
          }
        >
          Thêm Tài Khoản
        </button>
      </div>
      <div className="Admin-List">
        {users?.map((value) => (
          <div className="Admin-Item" key={value.username}>
            <div className="Admin-fullname">
              <p>{value.fullname}</p>
              <div className="Users-img">
                <img src={value.img} alt="img" />
              </div>
            </div>
            <div className="Admin-address">{value.diachi}</div>
            <div className="Admin-sdt">{value.sdt}</div>
            <div className="Admin-role">{value.role}</div>
            <div className="Admin-btn">
              <button
                onClick={() =>
                  setModalUpdate({
                    isOpen: 'Update',
                    id: value.username,
                  })
                }
                className="fas fa-edit edit"
              ></button>
              <button className="fas fa-trash-alt delete"></button>
            </div>
          </div>
        ))}
      </div>
      {
        {
          'Update': (
        <ModalUpdate
          id={modalUpdate.id}
          setModalUpdate={setModalUpdate}
          handle={handleUpdate}
        />
      ),
      'Add':(
        <ModalAdd 
          setModalUpdate={setModalUpdate}
          handle={handleAdd}
        />
      )
        }[modalUpdate.isOpen]
      }
    </>
  );
}

export default AdminUser;
