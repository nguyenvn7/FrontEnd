import React,{ useState } from "react";
import { Link } from 'react-router-dom'


function Item(props) {
  return <img src={props.link} alt="" />;
}

function Banner(props) {
  const [toggle, setToggle] = useState(0);
  const handleClickNext = () => {
    if (toggle === 2) {
      setToggle(0);
      return;
    }
    setToggle(toggle + 1);
  };
  const handleClickPrev = () => {
    if (toggle === 0) {
      setToggle(2);
      return;
    }
    setToggle(toggle - 1);
  };
  const handleClickImg = (id) => {
    setToggle(id);
  };

  return (
    <section className="Banner">
      <div
        className="Banner__Slide"
        style={{ transform: `translate(${toggle * -100}%)` }}
      >
        {props.Products.map((value, index) => {
          if (index <= 2) {
            return ( <div className="Slide__Details" key={value.id}>
              <div className="warp">
                <div className="detail">
                  <div className="detail_content">
                    <p className="Name">{value.name}</p>
                    <p className="genre">{value.genre}</p>
                  </div>
                  <Link to={`/Details/${value.name}`} className="link">Xem Them</Link>
                </div>
              </div>
              <Item link={value.link_background} />
            </div>)  
          } 
           return '';
        })}
      </div>
      <div className="Banner__SubSlide">
        <div className="SubSlide__arrow">
          <i className="fas fa-chevron-left left" onClick={handleClickPrev}></i>
          <i
            className="fas fa-chevron-right right"
            onClick={handleClickNext}
          ></i>
        </div>
        <div className="SubSlide__Wrap">
          {props.Products.map((value, index) => {
            if (index <= 2) {
             return ( <div
                className = {`${toggle === index ? "Img_shadow" : ""} Wrap__img`}
                onClick={() => handleClickImg(index)}
                key={value.id}
              >
                <Item link={value.link_background}  />
              </div>)
            }
            return '';
          })}
        </div>
      </div>
    </section>
  );
}

export default React.memo(Banner);
