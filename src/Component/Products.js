import { Link, useLocation,useHistory } from "react-router-dom";
import { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import animAdd from "../lottie/4914-cart-checkout-fast";
import Lottie from "react-lottie";
import { CartState } from "../context/context";
import { formatPrice } from "../helper";
import { addCart, checkLogged } from "../Api";

function Item(props) {
  return <img src={props.link} alt="" />;
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Products({ Products, total, page, handleSort, params }) {
  const endPage = Math.ceil(+total / 15);
  let genre = useQuery().get("genre");
  let order = useQuery().get("order");
  genre = (genre && `&genre=${genre}`) || "";
  order = (order && `&order=${order}`) || "";

  const [toggle, setToggle] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(false);
  const history = useHistory();

  const {  dispatch } = CartState();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animAdd,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleAdd = () => {
    setToggleAdd(!toggleAdd);
    setTimeout(() => {
      setToggleAdd(toggleAdd);
    }, 1400);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };
  // const [stopped,setStopped] = useState(-1);
  // const defaultOptions1 = {
  //   loop: false,
  //   autoplay: false,
  //   animationData: animAdd,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // };
  // const handleStopped = (id)=>{
  //   setStopped(id);
  //   setTimeout(() => {
  //     setStopped(-1);
  //   }, 2000);
  // }

  return (
    <section className="Products">
      <div className="Products-select">
        <div className="Products-Genres Products-Item" onClick={handleToggle}>
          <p className="Products-TittleGenres">Thể Loại</p>
          {toggle && (
            <div className="Products-ListGenres">
              <div className="Products-ItemGenres">
                <Link to="/" className="Products-TittleGenres">
                  Văn Học
                </Link>
                <ul>
                  <Link
                    to={`/?genre=Tiểu Thuyết`}
                    onClick={() => handleSort("genre", "Tiểu Thuyết")}
                  >
                    Tiểu Thuyết
                  </Link>
                  <Link
                    to={`/?genre=Light Novel`}
                    onClick={() => handleSort("genre", "Light Novel")}
                  >
                    Light Novel
                  </Link>
                  <Link
                    to={`/?genre=Truyện Trinh Thám - Kiếm Hiệp`}
                    onClick={() =>
                      handleSort("genre", "Truyện Trinh Thám - Kiếm Hiệp")
                    }
                  >
                    Truyện Trinh Thám - Kiếm Hiệp
                  </Link>
                  <Link
                    to={`/?genre=Hài Hước - Truyện Cười`}
                    onClick={() =>
                      handleSort("genre", "Hài Hước - Truyện Cười")
                    }
                  >
                    Hài Hước - Truyện Cười
                  </Link>
                  <Link
                    to={`/?genre=horror`}
                    onClick={() => handleSort("genre", "horror")}
                  >
                    Kinh Dị
                  </Link>
                </ul>
              </div>

              <div className="Products-ItemGenres">
                <Link to="/" className="Products-TittleGenres">
                  Ngoại Ngữ
                </Link>
                <ul>
                  <Link
                    to={`/?genre=English Book`}
                    onClick={() => handleSort("genre", "English Book")}
                  >
                    Tiếng Anh
                  </Link>
                </ul>
              </div>
              <div className="Products-ItemGenres">
                <Link to="/" className="Products-TittleGenres">
                  Tâm Lý - Kỹ Năng Sống
                </Link>
                <ul>
                  <Link
                    to={`/?genre=Tâm Lý`}
                    onClick={() => handleSort("genre", "Tâm Lý")}
                  >
                    Tâm Lý
                  </Link>
                  <Link
                    to={`/?genre=Rèn Luyện Nhân Cách`}
                    onClick={() => handleSort("genre", "Rèn Luyện Nhân Cách")}
                  >
                    Rèn Luyện Nhân Cách
                  </Link>
                  <Link to="/" className="Products-TittleGenres">
                    Tất Cả
                  </Link>
                </ul>
              </div>
            </div>
          )}
        </div>
        <p className="Products-Item Products-TittleGenres">Hàng Mới</p>
        <Link
          to={`/?${(page && `page=${page}`) || ""}${
            (genre && `${genre}&`) || "&"
          }order=ASC`}
          className="Products-Item Products-TittleGenres"
        >
          Giá Thấp
        </Link>
        <Link
          to={`/?${(page && `page=${page}`) || ""}${
            (genre && `${genre}&`) || "&"
          }order=DESC`}
          className="Products-Item Products-TittleGenres"
        >
          Giá Cao
        </Link>
      </div>

      <div className="Products__List">
        {Products.map((value, index) => (
          <div className="Item" key={value.id}>
            <Link to={`/Details/${value.name}`} className="img">
              <div className="Rote">
                <Item link={value.link} />
              </div>
            </Link>
            <div className="details">
              <div>
                <p className="details__name">{value.name}</p>
                <p className="details__genre">{value.genre}</p> 
              </div>
            </div>
            <p className="price">{formatPrice(value.price)}</p>
            <div className="details-add">
              <MdOutlineAddShoppingCart
                onClick={() => {
                  checkLogged().then((data) => {
                    if (data?.user) {
                      addCart(data.user.username,value.id);
                      handleAdd();
                    }else {
                      history.push('/login');
                    }
                  });
                }}
              />
              {/* <Lottie
              options={defaultOptions1}
              height={100}
              width={100}
              isClickToPauseDisabled={true}
              isStopped={stopped === index? false:true}             
        /> */}
            </div>
          </div>
        ))}
        <div className="Products-pag">
          <ul className="Products-pagList">
            <Link className="Products-pagItem" to={`/?page=1${genre}${order}`}>
              1
            </Link>
            {+page > 2 ? (
              <>
                <li className="Products-pagItem">...</li>
              </>
            ) : (
              endPage >= 4 && (
                <>
                  <Link
                    className="Products-pagItem"
                    to={`/?page=${endPage - (endPage - 2)}${genre}${order}`}
                  >
                    {endPage - (endPage - 2)}
                  </Link>
                  <Link
                    className="Products-pagItem"
                    to={`/?page=${endPage - (endPage - 3)}${genre}${order}`}
                  >
                    {endPage - (endPage - 3)}
                  </Link>
                </>
              )
            )}
            {+page > 2 && +page <= endPage - 2 && (
              <>
                <Link
                  className="Products-pagItem"
                  to={`/?page=${+page - 1}${genre}${order}`}
                >
                  {+page - 1}
                </Link>
                <Link
                  className="Products-pagItem"
                  to={`/?page=${+page}${genre}${order}`}
                >
                  {page}
                </Link>
                <Link
                  className="Products-pagItem"
                  to={`/?page=${+page + 1}${genre}${order}`}
                >
                  {+page + 1}
                </Link>
              </>
            )}
            {endPage >= 4 && (
              <>
                {+page >= endPage - 1 ? (
                  <>
                    <Link
                      className="Products-pagItem"
                      to={`/?page=${endPage - 2}${genre}${order}`}
                    >
                      {endPage - 2}
                    </Link>
                    <Link
                      className="Products-pagItem"
                      to={`/?page=${endPage - 1}${genre}${order}`}
                    >
                      {endPage - 1}
                    </Link>
                  </>
                ) : (
                  endPage > 4 && (
                    <>
                      <li className="Products-pagItem">...</li>
                    </>
                  )
                )}
                <Link
                  className="Products-pagItem"
                  to={`/?page=${endPage}${genre}${order}`}
                >
                  {endPage}
                </Link>
              </>
            )}
          </ul>
        </div>
        {toggleAdd && (
          <div className="Products-Toast">
            <div className="wrap">
              <Lottie
                options={defaultOptions}
                height={100}
                width={100}
                isClickToPauseDisabled={true}
              />
              <p>Thêm Vào Giỏ Hàng Thành Công</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
