import { Link, useLocation,useHistory } from "react-router-dom";
import { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import animAdd from "../lottie/4914-cart-checkout-fast";
import Lottie from "react-lottie";
import { formatPrice } from "../helper";
import { addCart, checkLogged } from "../Api";
import { CartState } from "../context/context";

function Item(props) {
  return <img src={props.link} alt="" />;
}
function Pag({endPage,page,genre,order}){
  let listPags = [];
  if(page >= endPage - 2 && endPage > 3){
    page = endPage - 3;
    for(let i = page ; i <= endPage; i++){
      listPags.push(<Link 
      className="Products-pagItem" 
      to={`/?page=${i}${genre}${order}`}
      key={i}
      >{i}</Link>)
    }
  }else
  { page = (page<3? 1:page);
    for(let i = page ; i < page+3 && i <= endPage; i++){
      listPags.push(<Link 
      to={`/?page=${i}${genre}${order}`}
      className="Products-pagItem" 
      key={i}>{i}</Link>);
    }}
  return(
    listPags
  )
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


  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animAdd,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const {
    cartqty: { quantity },
    setCartQty
  } = CartState();

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
          <div className="Item" key={value.idsp}>
            <Link to={{
              pathname: `/Details/${value.tenSach}`,
              query: {idsp: value.idsp}
            }} className="img">
              <div className="Rote">
                <Item link={value.link} />
              </div>
            </Link>
            <div className="details">
              <div>
                <p className="details__name">{value.tenSach}</p>
                <p className="details__genre">{value.theLoai}</p> 
              </div>
            </div>
            <p className="price">{formatPrice(value.gia)}</p>
            <div className="details-add">
              <MdOutlineAddShoppingCart
                onClick={() => {
                  checkLogged().then((data) => {
                    if (data?.user) {
                      addCart(data.user.username,value.idsp,1)
                          .then(data => data.text())
                          .then(data => {
                            if(data !== 'update'){
                                setCartQty({quantity: quantity + 1});
                            }
                          })
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
            {+page >= 3 &&(
              <>
              <Link className="Products-pagItem" to={`/?page=1${genre}${order}`} >1</Link>
              <li className="Products-pagItem"  >...</li>
              </>
            )}
              <Pag endPage={endPage} page={+page} genre={genre} order={order}/>
            {+page < (endPage - 2) && (
              <>
              <li className="Products-pagItem"  >...</li>
              <Link className="Products-pagItem"  to={`/?page=${endPage}${genre}${order}`} >{endPage}</Link>
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
