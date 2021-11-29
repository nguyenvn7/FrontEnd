import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import {
  addProduct,
  deleteProduct,
  getGenres,
  getProductPage,
  getProductUpdate,
  updateProduct,
} from "../Api";
import { Link, useLocation } from "react-router-dom";
import ModalConfirm from "../Component/ModalConfirm";
// function genres(){
//   return()
// }
//Update all - need fix
function Modal({ modal, setModal, isLoadEffect, setIsLoadEffect }) {
  const [productModal, setProductModal] = useState({
    name: "",
    price: "",
    quantity: "",
    genre: "",
    img: "",
  });
  const [genres, setGenres] = useState();
  const [check, setCheck] = useState();
  const [previewImg, setPreviewImg] = useState();
  const [status, setStatus] = useState();
  useEffect(() => {
    if (modal?.idProduct) {
      getProductUpdate(modal.idProduct).then((data) => {
        setProductModal(...data);
      });
    }
    getGenres().then((data) => setGenres(data));
    //eslint-disable-next-line
  }, []);
  const handleUpdate = () => {
    const { name, price, quantity, genre, img, id } = productModal;
    const formData = new FormData();
    formData.append("type", "products");
    formData.append("action", "UPDATE_IMG_PRODUCT");
    formData.append("id", id);
    formData.append("nameProduct", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("genre", genre);
    if(img){
      formData.append("product", img);
    }
    updateProduct(formData).then((data) => setIsLoadEffect(!isLoadEffect));
    
  };
  const handleAdd = () => {
    const { name, price, quantity, genre, img } = productModal;
    if (!name || !price || !quantity || !genre || !img) {
      setCheck(true);
    } else {
      setCheck(false);
      const formData = new FormData();
      formData.append("type", "products");
      formData.append("action", "ADD_NEW_PRODUCT");
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("genre", genre);
      formData.append("product", img);
      addProduct(formData)
        .then((data) => data.text())
        .then((data) => setStatus(data));
    }
  };
  const handleImg = (e) => {
    let preview;
    if (e.target.files[0]) {
      preview = URL.createObjectURL(e.target.files[0]);
    }
    setPreviewImg(preview);
    setProductModal({
      ...productModal,
      img: e.target.files[0],
    });
  };
  return (
    <>
      <div className="wrap-modal">
        <div className="Admin-modal">
          <div className="Admin-modal-close">
            <i
              onClick={() =>
                setModal({
                  idProduct: "",
                  toggle: false,
                })
              }
              className="fas fa-times-circle"
            ></i>
          </div>
          <div className="Admin-modal-list">
            <div className="Admin-modal-item">
              <p>Tên:</p>
              <input
                className="name"
                onChange={(e) =>
                  setProductModal({
                    ...productModal,
                    name: e.target.value,
                  })
                }
                defaultValue={productModal?.name}
              />
            </div>
            <div className="Admin-modal-item">
              <p>Thể Loại:</p>
              <select
                onChange={(e) =>
                  setProductModal({
                    ...productModal,
                    genre: e.target.value,
                  })
                }
                name="genres"
                id=""
                value={productModal?.genre}
              >
                {productModal?.genre || <option> Chọn Thể Loại </option>}
                {genres?.map((value) => (
                  <option key={value.genre} value={value.genre}>
                    {value.genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="Admin-modal-item">
              <p>Số Lượng:</p>
              <input
                className="qty"
                onChange={(e) =>
                  setProductModal({
                    ...productModal,
                    quantity: e.target.value,
                  })
                }
                defaultValue={productModal?.quantity}
              />
            </div>
            <div className="Admin-modal-item">
              <p>Đơn Giá:</p>
              <input
                className="price"
                onChange={(e) =>
                  setProductModal({
                    ...productModal,
                    price: e.target.value,
                  })
                }
                defaultValue={productModal?.price}
              />
            </div>
            <div className="Admin-modal-item">
              <p>Hình Ảnh</p>
              <input type="file" onChange={(e) => handleImg(e)} />

              <div className="Admin-modal-img">
                <img src={previewImg || productModal?.link} alt="" />
              </div>
            </div>
          </div>
          <div className="Admin-modal-btn">
            <button
              className="update"
              onClick={modal.action === "Cập Nhật" ? handleUpdate : handleAdd}
            >
              {modal.action}
            </button>
            <button
              className="cancel"
              onClick={() =>
                setModal({
                  idProduct: "",
                  toggle: false,
                })
              }
            >
              Huỷ Bỏ
            </button>
          </div>
          {check && (
            <div className="Admin-notice">Vui Lòng Nhập Đầy Đủ Thông Tin!</div>
          )}
          {status && <div className="Admin-notice">{status}</div>}
        </div>
      </div>
    </>
  );
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Pag({ page, total }) {
  const pag = [];
  page = page === 1 ? 1 : page - 1;
  for (let i = page; i < page + 3 && i <= total; i++) {
    pag.push(
      <Link key={i} to={`/admin/?page=${i}`}>
        {i}
      </Link>
    );
  }
  return pag;
}
function AdminProduct() {
  const [modal, setModal] = useState({
    idProduct: "",
    action: "",
    toggle: false,
  });
  const formatPrice = (price) => {
    return ("" + price).replace(/(\d)(?=(?:\d{3})+(?:\.|$))/g, (m, p) => {
      return p + ",";
    });
  };
  const page = useQuery().get("page") || "1";
  const [products, setProducts] = useState();
  const [isLoadEffect, setIsLoadEffect] = useState(false);
  const [stateModalConfirm, setStateModalConfirm] = useState();
  const handleDelete  = ()=>{
    deleteProduct(stateModalConfirm)
    .then(res => {
      if(res.status === 200){
        setIsLoadEffect(!isLoadEffect);
        setStateModalConfirm();
      }
    })
  }
  useEffect(() => {
    console.log("EFFECT ADMINNNNNNNNNN");
    getProductPage(page)
    .then((response) => response.json())
      .then((data) => {
        setProducts({
          ...data,
          total: Math.ceil(data.total[0].total / 15),
        });
      });
  }, [page, isLoadEffect]);
  return (
    <>

          <div className="Admin-header">
            <p> Sản Phẩm </p>
            <p> Thể Loại </p>
            <p> Số Lượng </p>
            <p> Đơn Giá </p>
            <button
              onClick={() =>
                setModal({
                  idProduct: "",
                  action: "Thêm Sản Phẩm",
                  toggle: !modal.toggle,
                })
              }
            >
              Thêm Sản Phẩm
            </button>
          </div>
          <div className="Admin-List">
            {products?.results.map((value) => (
              <div className="Admin-Item" key={value.id}>
                <div className="Admin-product">
                  <div className="Admin-img">
                    <img src={value.link} alt="" />
                  </div>
                  <p className="Admin-name"> {value.name} </p>
                </div>
                <p> {value.genre} </p> <div className="Admin-qty">200 </div>
                <div className="Admin-price"> {formatPrice(value.price)} </div>
                <div className="Admin-btn">
                  <button
                    onClick={() =>
                      setModal({
                        idProduct: value.id,
                        action: "Cập Nhật",
                        toggle: !modal.toggle,
                      })
                    }
                    className="fas fa-edit edit"
                  ></button>
                  <button 
                  className="fas fa-trash-alt delete"
                  onClick={()=> {
                    setStateModalConfirm(value.id);
                  }}
                  > </button>
                </div>
              </div>
            ))}
            <div className="Admin-pag">
              {+page > 2 && (
                <>
                  <Link to="/admin/?page=1">1</Link>
                  <li>...</li>
                </>
              )}
              <Pag page={+page} total={products?.total} />
              {+page < products?.total - 1 && (
                <>
                  <li>...</li>
                  <Link to={`/admin/?page=${products?.total}`}>
                    {products?.total}
                  </Link>
                </>
              )}
            </div>
          </div>

          {modal.toggle && (
            <Modal
              modal={modal}
              setModal={setModal}
              isLoadEffect={isLoadEffect}
              setIsLoadEffect={setIsLoadEffect}
            />
          )}
         {
           stateModalConfirm &&  <ModalConfirm 
            cb={handleDelete}
            setModal   = {setStateModalConfirm}
            title='Bạn Có Muốn Xoá Sản Phẩm Này Không?'
            confirm='Xoá!'
            unConfirm='Huỷ!'
            />
            }

    </>
  );
}

export default AdminProduct;
