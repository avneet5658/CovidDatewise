import React, { div } from "react";
import { Link } from "react-router-dom";
import "../style/custom.css";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-light navbackground justify-content-between">
        <div className="container-lg">
          <div className="navbar-brand w-25">
            <Link to="/" className="nav-link">
              <img
                src="virus.png"
                alt="label"
                width="65px"
                height="45px"
                className="pr-3"
              />
              <span className="navtitle">COVID-19</span>
            </Link>
          </div>
          <div className="nav-horizontal">
            <div className=" form-inline">
              <Link to="/home" className="pr-sm-4 nav-link ">
                <div className="navlink">Datewise</div>
              </Link>
              <Link to="/confirmedglobal" className="pr-sm-4 nav-link">
                <div className="navlink">Global </div>
              </Link>
              <Link to="/cowin" className="nav-link">
                <div className="navlink">Cowin</div>
              </Link>
            </div>
          </div>
          <div className="btn-group dropleft nav-dropdown">
            <button
              className="btn btn-primary dropdown-toggle "
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
            >
              {/* <img src="menu.png" width="5%" height="5%" alt="menu" /> */}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to="/home">
                Datewise
              </Link>
              <Link className="dropdown-item" to="/confirmedglobal">
                Global
              </Link>
              <Link className="dropdown-item" to="/cowin">
                Cowin
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
