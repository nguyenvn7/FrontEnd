import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <section className="SideBar">
      <div className="SideBarTop">
        <Link className="wrap" to="/">
          <i  className="fad fa-book-reader"></i>
          <p to="/">BOOK</p>
        </Link>
      </div>
      <div className="SideBarWrap">
        <div className="Wrap">
          <Link to="/">Home</Link>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
          <li>ASD</li>
        </div>
      </div>
      <div className="SideBarBottom">
        <div className="SideBarBottom__icon">
          <i className="fad fa-sun"></i>
          <i className="fas fa-moon-stars"></i>
        </div>
        <div className="SideBarBottom__Switch"></div>
      </div>
    </section>
  );
}

export default React.memo(SideBar);
