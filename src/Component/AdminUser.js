import { useEffect, useState } from "react";
import { addUser, deleteUser, getUsers, updateUser } from "../Api";
import ModalUpdate from "./ModalUpdate";
import ModalConfirm from "../Component/ModalConfirm";
import ModalAdd from "./ModalAdd";
import modalConfirm from "../Component/ModalConfirm";

function AdminUser() {
  const [users, setUsers] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [modalUpdate, setModalUpdate] = useState({
    isOpen: false,
    id: "",
  });
  const [stateModalConfirm, setStateModalConfirm] = useState();



  const handleUpdate = (value) => {
    updateUser(value).then(() => setIsLoad(!isLoad));
  };
  const handleAdd = (value) => {
    addUser(value).then(() => setIsLoad(!isLoad));
  };
  const handleDelete = ()=>{
   deleteUser(stateModalConfirm)
      .then(() => {
        setIsLoad(!isLoad);
        setStateModalConfirm();
      })
  }


  useEffect(() => {
    getUsers()
      .then((data) => data.json())
      .then((data) => setUsers(data));
  }, [isLoad]);

  return (
    <>
      <div className="Admin-header Admin-header-P-U">
        <p> Họ Tên </p>
        <p> Số Điện Thoại </p>
        <p> Ngày Lập </p>
        <p> Quyền </p>
        <button
          onClick={() =>
            setModalUpdate({
              isOpen: "Add",
              id: "",
            })
          }
        >
          Thêm Tài Khoản
        </button>
      </div>
      <div className="Admin-List Admin-List-P-U">
        {users?.map((value) => (
          <div className="Admin-Item Admin-Item-P-U" key={value.fullname}>
            <div className="Admin-fullname">
              <p>{value.fullname}</p>
              <div className="Users-img">
                <img src={value.img} alt="img" />
              </div>
            </div>
            <div className="Admin-sdt">{value.sdt}</div>
            <div className="Admin-address">{value.ngaylap}</div>
            <div className="Admin-role">{value.role}</div>
            <div className="Admin-btn">
              <button
                onClick={() =>
                  setModalUpdate({
                    isOpen: "Update",
                    id: value.username,
                  })
                }
                className="fas fa-edit edit"
              ></button>
              <button
                className="fas fa-trash-alt delete"
                onClick={() => {
                  setStateModalConfirm(value.username)
                }}
              ></button>
            </div>
          </div>
        ))}
      </div>
      {stateModalConfirm && (
        <ModalConfirm
          cb={handleDelete}
          setModal={setStateModalConfirm}
          title="Bạn Có Muốn Xoá User Này Không?"
          confirm="Xoá!"
          unConfirm="Huỷ!"
        />
      )}
      {
        {
          "Update": (
            <ModalUpdate
              id={modalUpdate.id}
              setModalUpdate={setModalUpdate}
              handle={handleUpdate}
            />
          ),
         "Add": <ModalAdd setModalUpdate={setModalUpdate} handle={handleAdd} />,
        }[modalUpdate.isOpen]
      }
    </>
  );
}

export default AdminUser;
