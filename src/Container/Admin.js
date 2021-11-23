import Footer from "../Component/Footer";
import FakeProduct from "../Component/FakeProduct";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { getProductUpdate } from "../Api";

// function genres(){
//   return()
// }

function Item({ modal, setModal }) {

    const [productModal,setProductModal] = useState("");
  useEffect(() => { 
    getProductUpdate(modal.idProduct)
      .then( ({product,genres}) => setProductModal({
        product: Object.assign({},...product),
        genres 
      }))
    }, []);
    const handleUpdate = (e,nameUpdate)=>{
      if(e.target.textContent !== (productModal.product[nameUpdate]+'')){
        console.log('update');
        const newP = {
          ...productModal.product,
          [nameUpdate]: e.target.textContent
        }
        setProductModal({
          ...newP,
          ...productModal.genres
        });
      }
    }
  return (
    <>
      {(productModal && (
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
                <p contentEditable  suppressContentEditableWarning={true} className="name" onBlur={(e)=>{
                  handleUpdate(e,'name');
                }}>{productModal.product.name}</p>
              </div>
              <div className="Admin-modal-item">
                <p>Loại:</p>
                <select name="genres" id="" defaultValue={productModal.product.genre}>
                  {productModal.genres.map(value => (
                    <option 
                    key={value.genre} value={value.genre}
                    >{value.genre}</option>
                  ))}
                </select>
              </div>
              <div className="Admin-modal-item">
                <p>Số Lượng:</p>
                <p contentEditable  suppressContentEditableWarning={true} className="qty" 
                onBlur={(e)=> handleUpdate(e,'quantity')}
                >{productModal.product.quantity}</p>
              </div>
              <div className="Admin-modal-item">
                <p>Đơn Giá:</p> 
                <p contentEditable  suppressContentEditableWarning={true} className="price"
                  onBlur={(e)=> handleUpdate(e,'price')}
                >{productModal.product.price}</p>
              </div>
              <div className="Admin-modal-item">
                <p>Hình Ảnh</p>
                <div className="Admin-modal-img">
                  <img src={productModal.product.link} alt="" />
                </div>
              </div>
            </div>
            <div className="Admin-modal-btn">
              <button className='update'>Cập Nhật</button>
              <button className='cancel'
                onClick={()=> setModal({
                    idProduct: "",
                    toggle: false,
                  })}
              >Huỷ Bỏ</button>
            </div>
          </div>
        </div>
      )) ||
        ""}
    </>
  );
}

function Admin() {
  const [modal, setModal] = useState({
    idProduct: "",
    toggle: false,
  });
  const formatPrice = (price) => {
    return ("" + price).replace(/(\d)(?=(?:\d{3})+(?:\.|$))/g, (m, p) => {
      return p + ",";
    });
  };
  return (
    <>
      <main>
        <section className="Admin">
          <div className="Admin-select">
            <div className="Admin-SP Admin-active">Sản Phẩm</div>
            <div className="Admin-KH">Khách Hàng</div>
          </div>
          <div className="Admin-header">
            <p> Sản Phẩm </p> <p> Thể Loại </p> <p> Số Lượng </p>
            <p> Đơn Giá </p> <button> Thêm Sản Phẩm </button>
          </div>
          <div className="Admin-List">
            {FakeProduct.map((value) => (
              <div className="Admin-Item" key={value.id}>
                <div className="Admin-product">
                  <div className="Admin-img">
                    <img src={value.link} alt="" />
                  </div>
                  <p className="Admin-name"> {value.name} </p>
                </div>
                <p> {value.genre} </p> <div className="Admin-qty">200 </div>
                <div className="Admin-price"> {formatPrice(100000)} </div>
                <div className="Admin-btn">
                  <button
                    onClick={() =>
                      setModal({
                        idProduct: value.id,
                        toggle: !modal.toggle,
                      })
                    }
                    className="fas fa-edit edit"
                  >
                  </button>
                  <button className="fas fa-trash-alt delete"> </button>
                </div>
              </div>
            ))}
          </div>
          {modal.toggle && <Item modal={modal} setModal={setModal} />}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Admin;
