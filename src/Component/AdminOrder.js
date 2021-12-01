import {formatPrice} from "../helper/index"; 

function AdminOrder() {

  return (
    <>
      <div className="Admin-header Admin-header-O">
        <p> Mã Đơn Hàng </p>
        <p> Người Đặt </p>
        <p> Số Điện Thoại </p>
        <p> Địa Chỉ </p>
        <p> Sản Phẩm </p>
        <p> Số Lượng </p>
        <p> Giá </p>
        <div className="Admin-state-O">
          <p> Trạng Thái ĐH </p>
          <select name="" id="">
            <option value="">Đang Chờ Duyệt</option>
            <option value="">Đang Giao</option>
            <option value="">Đã Nhận</option>
          </select>
        </div>
      </div>
      <div className="Admin-List">

        <div className="Admin-Item Admin-Item-O">
            <p className="Admin-billCodes">109213615</p>
            <p className="Admin-name">Nguyên</p>
            <p className="Admin-phone">0368896743</p>
            <p> Ấp Định An, Xã Đông Hải, Huyện Duyên Hải, Tỉnh Trà Vinh </p> 
            <div className="Admin-listProducts-O">
              <p className="Admin-item-O">
                Đề Thi Đẫm Máu
              </p>
              <p className="Admin-item-O">
                Đề Thi Đẫm Máu
              </p>
              <p className="Admin-item-O">
                Đề Thi Đẫm Máu
              </p>
            </div>
            <div className="Admin-listPrice-O">
                <p>2</p>
                <p>200</p>
                <p>3</p>
            </div>
            <div className="Admin-price"> {formatPrice(100000)} </div>
           
            <div className="Admin-btn">
            <p>Đang Chờ Duyệt</p>
              <button
                className="fas fa-edit edit"
              ></button>
              <button
                className="fas fa-trash-alt delete"
              ></button>
            </div>
        </div>

        <div className="Admin-Item Admin-Item-O">
            <p className="Admin-billCodes">109213615</p>
            <p className="Admin-name">Nguyên</p>
            <p className="Admin-phone">0368896743</p>
            <p> Ấp Định An, Xã Đông Hải, Huyện Duyên Hải, Tỉnh Trà Vinh </p> 
            <div className="Admin-listProducts-O">
              <p className="Admin-item-O">
                Đề Thi Đẫm Máu
              </p>
              <p className="Admin-item-O">
                Đề Thi Đẫm Máu
              </p>
              <p className="Admin-item-O">
                Đề Thi Đẫm Máu
              </p>
            </div>
            <div className="Admin-listPrice-O">
                <p>2</p>
                <p>200</p>
                <p>3</p>
            </div>
            <div className="Admin-price"> {formatPrice(100000)} </div>
            
            <div className="Admin-btn">
            <p>Đang Giao</p>
              <button
               
                className="fas fa-edit edit"
              ></button>
              <button
                className="fas fa-trash-alt delete"
              
              ></button>
            </div>
        </div>

      </div>
    </>
  );
}

export default AdminOrder;
