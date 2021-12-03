import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { addAddress, deleteAddress, getAddress, updateAddress } from "../Api";
import { AuthState } from "../context/context";
import ModaladdAddress from "./ModaladdAddress";
import ModalUpdateAddress from "./ModalUpdateAddress";

function AddressBook() {
  const { auth } = AuthState();
  const [modal, setModal] = useState();
  const [iddc, setIddc] = useState();
  const [listAddress, setListAddress] = useState();
  const [isLoad, setIsLoad] = useState(false);

  const handleAdd = ({ name, sdt, address }) => {
    addAddress(auth.username, name, sdt, address).then(()=> setIsLoad(!isLoad));
  };
  const handleUpdate = (value)=>{
      updateAddress(value).then(()=> setIsLoad(!isLoad));
  }
  const handleDelete = (iddc)=>{
      deleteAddress(iddc).then(() => setIsLoad(!isLoad));
  }

  useEffect(() => {
    getAddress(['username'],[auth.username])
      .then((data) => data.json())
      .then((data) => {
        setListAddress(data);
      });
    //eslint-disable-next-line
  }, [isLoad]);

  return (
    <>
      <section className="AddressBook">
        <div className="AddressBook-btn" onClick={() => setModal("add")}>
          Thêm Địa Chỉ Mới
        </div>
        <section className="AddressBook-list">
          {listAddress?.map((value) => (
            <div className="AddressBook-item" key={value.iddc}>
              <div className="left">
                <p className="AddressBook-name">
                  {value.fullname} {value.state === '1'? <span>Địa chỉ mặc định</span>:''}
                </p>
                <p className="AddressBook-add">
                  Địa Chỉ: {value.diachi}
                </p>
                <p className="AddressBook-sdt">SDT: {value.sdt}</p>
              </div>
              <div className="right">
                <button className="fas fa-edit edit" onClick={()=>{
                    setModal('update');
                    setIddc(value.iddc);
                }}></button>
                {value.state === '0' && <button className="fas fa-trash-alt delete" onClick={()=> handleDelete(value.iddc)}></button>}
              </div>
            </div>
          ))}
        </section>
      </section>
      {
        {
          add: <ModaladdAddress setModal={setModal} handleAdd={handleAdd} />,
          update : <ModalUpdateAddress setModal={setModal}  iddc={iddc} handle={handleUpdate}/>
        }[modal]
      }
    </>
  );
}

export default AddressBook;
