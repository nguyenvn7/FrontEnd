function Footer() {
  return (
    <footer>
      <div className="wrap">
        <section className="left">
          <div className="left-img">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3296/3296230.png"
              alt=""
            />
          </div>
          <div className="left-address">
            Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCMCông Ty Cổ Phần Phát Hành
            Sách TP HCM - FAHASA60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
          </div>
          <div className="left-social">
            <i className="fab fa-facebook fb"></i>
            <i className="fab fa-github-alt gh"></i>
            <i className="fab fa-youtube ytb"></i>
          </div>
        </section>
        <section className="right">
          <div className="right-grcol">
            <div className="right-col1">
              <p className="right-tittle">DỊCH VỤ</p>
              <div className="right-infor">
                <p>Điều khoản sử dụng</p>
                <p>Chính sách bảo mật</p>
                <p>Hệ thống trung tâm - nhà sách</p>
              </div>
            </div>
            <div className="right-col2">
              <p className="right-tittle">HỖ TRỢ</p>
              <div className="right-infor">
                <p>Chính sách đổi - trả - hoàn tiền</p>
                <p>Chính sách khách sỉ</p>
                <p>Phương thức vận chuyển</p>
                <p>Phương thức thanh toán và xuất HĐ</p>
              </div>
            </div>
            <div className="right-col3">
              <p className="right-tittle">TÀI KHOẢN CỦA TÔI</p>
              <div className="right-infor">
                <p>Đăng nhập/Tạo mới tài khoản</p>
                <p>Thay đổi địa chỉ khách hàng</p>
                <p>Chi tiết tài khoản</p>
                <p>Lịch sử mua hàng</p>
              </div>
            </div>
          </div>
          <div className="right-contact">
            <p className="right-tittle">LIÊN HỆ</p>
            <div className="right-address">
              <div className="right-wrap">
                <i className="fas fa-map-marker-alt"></i>
                <p>60-62 Lê Lợi, Q.1, TP. HCM</p>
              </div>
              <div className="right-wrap">
                <i className="fas fa-phone-alt"></i>
                <p>0123456789</p>
              </div>
            </div>
            <div className="right-cooperator">
              <div className="item">
                <img
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo.png"
                  alt=""
                />
              </div>
              <div className="item">
                <img
                  src="https://www.fahasa.com/media/wysiwyg/Logo-NCC/icon_giao_hang_nhanh.png"
                  alt=""
                />
              </div>
              <div className="item">
                <img
                  src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
