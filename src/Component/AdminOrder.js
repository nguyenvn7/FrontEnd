import { useEffect, useState } from "react";
import {
  adminGetOrder,
  deleteOrder,
  getOrderToUpdate,
  updateOrder,
} from "../Api";
import { formatPrice } from "../helper/index";
import ModalConfirm from "./ModalConfirm";

function UpdateOrder({ iddh, setModalUpdate, handle, tt }) {
  const [value, setValue] = useState();
  useEffect(() => {
    getOrderToUpdate(iddh)
      .then((data) => data.json())
      .then((data) => setValue(data));
  }, []);
  return (
    <section className="ModalUpdate">
      <div className="ModalUpdate-wrap">
        <div className="ModalUpdate-col1">
          <i
            onClick={() => setModalUpdate()}
            className="fas fa-times-circle close"
          ></i>
        </div>
        <div className="ModalUpdate-col2">
          <div className="ModalUpdate-fullName item ">
            <div className="ModalUpdate-fullName-wrap UpdateOrder">
              <p>Mã Đơn Hàng: </p>
              <p>{value?.idDH}</p>
            </div>
          </div>
          <div className="ModalUpdate-check item UpdateOrder">
            <p>Trạng Thái Đơn Hàng: </p>
            <select
              name=""
              id=""
              defaultValue={tt}
              onChange={(e) =>
                setValue({
                  ...value,
                  trangthai: e.target.value,
                })
              }
            >
              <option value="1">Chờ Duyệt</option>
              <option value="2">Đang Giao</option>
              <option value="3">Đã Giao</option>
            </select>
          </div>
        </div>
        <div className="ModalUpdate-col">
          <div className="Admin-modal-btn">
            <button className="update" onClick={() => handle(value)}>
              Cập Nhật
            </button>
            <button
              className="cancel"
              onClick={() =>
                setModalUpdate({
                  iddh: "",
                  name: "",
                })
              }
            >
              Huỷ Bỏ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminOrder() {
  const [products, setProducts] = useState();
  const [select, setSelect] = useState("0");
  const [isLoad, setIsLoad] = useState();
  const [modal, setModal] = useState({
    iddh: "",
    name: "",
  });

  const handleUpdate = (value) => {
    if (value?.trangthai) {
      updateOrder(value.idDH, value.trangthai).then(() => {
        setModal({
          iddh: "",
          name: "",
        });
        setIsLoad(!isLoad);
      });
    }
  };
  const handleDelete = () => {
    deleteOrder(modal.iddh).then(() => {
      setIsLoad(!isLoad);
      setModal({
        iddh: "",
        name: "",
      });
    });
  };
  const switchState = (trangthai) => {
    switch (trangthai) {
      case "1":
        return "Chờ Duyệt";
      case "2":
        return "Đang Giao";
      case "3":
        return "Đã Giao";
      default:
        break;
    }
  };
  useEffect(() => {
    adminGetOrder()
      .then((data) => data.json())
      .then((data) => {
        setProducts(data);
      });
  }, [isLoad]);

  return (
    <>
      <div className="Admin-select-order">
        <div
          className={`Admin-select-item ${select === "0" && "Purchase-active"}`}
          onClick={() => setSelect("0")}
        >
          Tất Cả
        </div>
        <div
          className={`Admin-select-item ${select === "1" && "Purchase-active"}`}
          onClick={() => setSelect("1")}
        >
          Chờ Duyệt
        </div>
        <div
          className={`Admin-select-item ${select === "2" && "Purchase-active"}`}
          onClick={() => setSelect("2")}
        >
          Đang Giao
        </div>
        <div
          className={`Admin-select-item ${select === "3" && "Purchase-active"}`}
          onClick={() => setSelect("3")}
        >
          Đã Giao
        </div>
      </div>
      <div className="Admin-header Admin-header-O">
        <p> Mã Đơn Hàng </p>
        <p> Người Đặt </p>
        <p> Số Điện Thoại </p>
        <p> Địa Chỉ </p>
        <p> Sản Phẩm </p>
        <p> Giá </p>
        <p>Tổng thanh toán</p>
        <p>Ngày Đặt</p>
      </div>
      <div className="Admin-List">
        {products?.map((value) => {
          if ( select === value.trangthai || select === "0" ) {
            return (
              <div className="Admin-Item Admin-Item-O" key={value.idDH}>
            <p className="Admin-billCodes">{value.idDH}</p>
            <p className="Admin-name">{value.hoten}</p>
            <p className="Admin-phone">{value.sdt}</p>
            <p> {value.diachi} </p>
            <div className="Admin-listProducts-O">
              {value.listDH?.map((value2) => (
                <p className="Admin-item-O" key={value2.idsp}>
                  {value2.name} x{value2.quantity}
                </p>
              ))}
            </div>
            <div className="Admin-listPrice-O">
              {value.listDH?.map((value2) => (
                <p key={value2.idsp}>{formatPrice(value2.price)}</p>
              ))}
            </div>
            <div className="Admin-price">
              {formatPrice(
                value.listDH?.reduce(
                  (pre, curr) => pre + curr.price * curr.quantity,
                  0
                )
              )}
            </div>
            <p>{value.ngay}</p>
            <div className="Admin-btn">
              <p>{switchState(value.trangthai)}</p>
              <button
                className="fas fa-edit edit"
                onClick={() =>
                  setModal({
                    iddh: value.idDH,
                    name: "update",
                    tt: value.trangthai,
                  })
                }
              ></button>
              <button
                className="fas fa-trash-alt delete"
                onClick={() => {
                  setModal({
                    iddh: value.idDH,
                    name: "confirm",
                  });
                }}
              ></button>
            </div>
          </div>
            )
          }
        })}
        {
          {
            confirm: (
              <ModalConfirm
                cb={handleDelete}
                setModal={setModal}
                title="Bạn Có Muốn Xoá Đơn Hàng Này Không?"
                confirm="Xoá!"
                unConfirm="Huỷ!"
              />
            ),
            update: (
              <UpdateOrder
                iddh={modal.iddh}
                setModalUpdate={setModal}
                handle={handleUpdate}
                tt={modal.tt}
              />
            ),
          }[modal?.name]
        }
      </div>
    </>
  );
}

export default AdminOrder;
