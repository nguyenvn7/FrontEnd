import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartState } from "../context/context";
import { queryProduct } from "../Api";
import Lottie from "react-lottie";
import animAdd from "../lottie/4914-cart-checkout-fast";
import { formatPrice } from "../helper";

function Details() {
  const [toggleBtn, setToggleBtn] = useState(true);
  const { state, dispatch } = CartState();
  const [toggleLottie, setToggleLottie] = useState(false);
  const nameProduct = useParams();
  const [qty,setQty] = useState(1);
  const [product, setProduct] = useState({});
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animAdd,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    queryProduct("name", nameProduct.name).then((data) => setProduct(...data.results));
  }, [nameProduct.name]);
  const handleLottie = () => {
    setToggleLottie(!toggleLottie);
    setTimeout(() => {
      setToggleLottie(toggleLottie);
    }, 1400);
  };
  return (
    <>
      <Header />
      <main>
        <div className="Details-wrap">
          <section className="Product">
            <div className="Product-img">
              <div className="img">
                <img src={product.link} alt="" />
              </div>
              <div className="Product-btnCart">
                <button
                  className="Add"
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: {
                        ...product,
                        quantity: qty,
                        select:false
                      }
                    });
                    handleLottie();
                  }}
                >
                  Thêm Vào Giỏ Hàng
                </button>
                <button className="Buy">Mua Ngay</button>
              </div>
            </div>
            <div className="Product-detail">
              <div className="Product-tittle">
                <h1>{product.name}</h1>
                <div className="Product-infor">
                  <p>Nhà Cung Cấp: Nhã Nam</p>
                  <p>Nhà Xuất Bản: NXB Kim Đồng</p>
                  <p>Tác Giả: Json</p>
                </div>
                <div className="Product__wrap">
                  <p className="Product-price">{formatPrice(product.price)}</p>
                  <div className="Product-count">
                    <label htmlFor="">Số Lượng: </label>
                    <div className="Product-qty">
                      <label
                        htmlFor=""
                        className="Cart-label"
                        onClick={() => {
                          if (qty > 1) {
                           setQty(qty-1);
                          }
                        }}
                      >
                        -
                      </label>

                      <input
                        type="text"
                        min="1"
                        value={qty || 1}
                        onChange={(e) => {
                          const regex = new RegExp("\\D+");
                          if (!regex.test(e.target.value)) {
                            setQty(+e.target.value);
                          }
                        }}
                        onPaste={(e) => e.preventDefault()}
                      />
                      <label
                        htmlFor=""
                        className="Cart-label"
                        onClick={() => {
                          setQty(qty+1);
                        }}
                      >
                        +
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Product-content">
                <p>
                  “Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám
                  phá ra những điều khiến cuộc đời này đáng sống... một tác phẩm
                  kinh điển của Brazil.” - Booklist
                </p>
              </div>
            </div>
            {toggleLottie && (
              <div className="Product-Modal">
                <Lottie
                  options={defaultOptions}
                  height={100}
                  width={100}
                  isClickToPauseDisabled={true}
                />
                <p>Thêm Vào Giỏ Hàng Thành Công</p>
              </div>
            )}
          </section>
          <section className={`Details ${(toggleBtn && "mh7") || ""}`}>
            <p className="Details-tittle">Thông Tin Sản Phẩm</p>
            <div className="Details-table">
              <table>
                <colgroup>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th className="Details-label">Mã hàng</th>
                    <td>8935235228351</td>
                  </tr>
                  <tr>
                    <th className="Details-label">Tên Nhà Cung Cấp</th>
                    <td>Nhã Nam</td>
                  </tr>
                  <tr>
                    <th className="Details-label">Tác giả</th>
                    <td>José Mauro de Vasconcelos</td>
                  </tr>
                  <tr>
                    <th className="Details-label">Người Dịch</th>
                    <td>Nguyễn Bích Lan, Tô Yến Ly</td>
                  </tr>
                  <tr>
                    <th className="Details-label">NXB </th>
                    <td>NXB Hội Nhà Văn</td>
                  </tr>
                  <tr>
                    <th className="Details-label">Năm XB</th>
                    <td>2020</td>
                  </tr>
                  <tr>
                    <th className="Details-label">Trọng lượng (gr)</th>
                    <td>280</td>
                  </tr>
                  <tr>
                    <th className="Details-label">Thước Bao Bì</th>
                    <td>20 x 14.5 cm</td>
                  </tr>
                  <tr>
                    <th className="Details-label">Số trang</th>
                    <td>244</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="Details-content">
              “Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá
              ra những điều khiến cuộc đời này đáng sống... một tác phẩm kinh
              điển của Brazil.” - Booklist “Một cách nhìn cuộc sống gần như hoàn
              chỉnh từ con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi
              lòng, dù người đọc ở lứa tuổi nào.” - The National Hãy làm quen
              với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc
              nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng
              phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái
              xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta
              trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu
              bé con năm tuổi. Có hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì
              Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt
              nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một
              ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là
              trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu. Mở
              đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong
              những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ
              đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa
              trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu
              thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này
              bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn
              thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil. TÁC GIẢ: JOSÉ
              MAURO DE VASCONCELOS (1920-1984) là nhà văn người Brazil. Sinh ra
              trong một gia đình nghèo ở ngoại ô Rio de Janeiro, lớn lên ông
              phải làm đủ nghề để kiếm sống. Nhưng với tài kể chuyện thiên bẩm,
              trí nhớ phi thường, trí tưởng tượng tuyệt vời cùng vốn sống phong
              phú, José cảm thấy trong mình thôi thúc phải trở thành nhà văn nên
              đã bắt đầu sáng tác năm 22 tuổi. Tác phẩm nổi tiếng nhất của ông
              là tiểu thuyết mang màu sắc tự truyện Cây cam ngọt của tôi. Cuốn
              sách được đưa vào chương trình tiểu học của Brazil, được bán bản
              quyền cho hai mươi quốc gia và chuyển thể thành phim điện ảnh.
              Ngoài ra, José còn rất thành công trong vai trò diễn viên điện ảnh
              và biên kịch. Mã hàng 8935235228351 Tên Nhà Cung Cấp Nhã Nam Tác
              giả José Mauro de Vasconcelos Người Dịch Nguyễn Bích Lan, Tô Yến
              Ly NXB NXB Hội Nhà Văn Năm XB 2020 Trọng lượng (gr) 280 Kích Thước
              Bao Bì 20 x 14.5 cm Số trang 244 Hình thức Bìa Mềm Sản phẩm bán
              chạy nhất Top 100 sản phẩm Tiểu thuyết bán chạy của tháng “Vị chua
              chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những
              điều khiến cuộc đời này đáng sống... một tác phẩm kinh điển của
              Brazil.” - Booklist “Một cách nhìn cuộc sống gần như hoàn chỉnh từ
              con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi lòng, dù
              người đọc ở lứa tuổi nào.” - The National Hãy làm quen với Zezé,
              cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với
              ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng phải ai
              cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái xóm
              ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta
              trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu
              bé con năm tuổi. Có hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì
              Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt
              nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một
              ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là
              trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu. Mở
              đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong
              những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ
              đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa
              trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu
              thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này
              bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn
              thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil. TÁC GIẢ: JOSÉ
              MAURO DE VASCONCELOS (1920-1984) là nhà văn người Brazil. Sinh ra
              trong một gia đình nghèo ở ngoại ô Rio de Janeiro, lớn lên ông
              phải làm đủ nghề để kiếm sống. Nhưng với tài kể chuyện thiên bẩm,
              trí nhớ phi thường, trí tưởng tượng tuyệt vời cùng vốn sống phong
              phú, José cảm thấy trong mình thôi thúc phải trở thành nhà văn nên
              đã bắt đầu sáng tác năm 22 tuổi. Tác phẩm nổi tiếng nhất của ông
              là tiểu thuyết mang màu sắc tự truyện Cây cam ngọt của tôi. Cuốn
              sách được đưa vào chương trình tiểu học của Brazil, được bán bản
              quyền cho hai mươi quốc gia và chuyển thể thành phim điện ảnh.
              Ngoài ra, José còn rất thành công trong vai trò diễn viên điện ảnh
              và biên kịch.
            </p>

            {(toggleBtn && (
              <button
                className="Details-btn"
                onClick={() => setToggleBtn(!toggleBtn)}
              >
                Xem Thêm
              </button>
            )) || (
              <button
                className="Details-btn"
                onClick={() => setToggleBtn(!toggleBtn)}
              >
                Rút Gọn
              </button>
            )}

            {toggleBtn && <div className="Details-gardient"></div>}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Details;
