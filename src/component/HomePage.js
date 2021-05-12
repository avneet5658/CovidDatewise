import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="row main-background">
        <div className="col-lg-6 col-sm-12">
          <div className="w-100 h-100 p-2">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="3"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src="carousel3.jpeg"
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="carousel1.jpeg"
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="carousel2.jpeg"
                    alt="Third slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="carousel.jpeg"
                    alt="Fourth slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 w-100">
          <h1 className="main-head">TOGETHER WE CAN! </h1>
        </div>
      </div>
      <div className="hero-background">
        <div className="container-lg">
          <div className="p-5">
            <div className="row">
              <div className="col-md-4 text-center">
                <Link to="/home">
                  <img
                    src="diagram.png"
                    alt="hero1"
                    width="140"
                    height="140"
                    className="rounded bg-white"
                  />
                </Link>
                <h3 className="hero-heading">Datewise Cases</h3>
                <p>
                  Get the details of all corona cases from worldwide and on
                  particular dates. The rapid increment in worldwide cases will
                  show you how worsely this disease effect our world.
                </p>
              </div>
              <div className="col-md-4 text-center">
                <Link to="/confirmedglobal">
                  <img
                    src="line-graph.png"
                    alt="hero1"
                    width="140"
                    height="140"
                    className="rounded bg-white"
                  />
                </Link>
                <h3 className="hero-heading">
                  Globally <br />
                  Confirmed Cases
                </h3>
                <p>
                  Worldwide confirmed cases give you information about all the
                  confirmed cases from the beginning of Corona till now. A graph
                  which shows the deviation among the cases in a complete year
                </p>
              </div>
              <div className="col-md-4 text-center">
                <Link to="/cowin">
                  <img
                    src="syringe.png"
                    alt="hero1"
                    width="140"
                    height="140"
                    className="rounded bg-white"
                  />
                </Link>
                <h3 className="hero-heading">Covaccination</h3>
                <p>
                  Information about vaccination center in all over India by just
                  entring the pin code of your area
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
