import axios from "axios";
import moment from "moment";
import React, { useState } from "react";

const Cowin = () => {
  const [pincode, setpincode] = useState("");
  const [cowinCenters, setCowinCenters] = useState([]);

  const handleFind = (e) => {
    e.preventDefault();
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${moment().format(
      "DD-MM-YYYY"
    )}`;
    axios
      .get(url)
      .then((data) => (console.log(data), setCowinCenters(data.data.centers)))
      .catch((err) => (alert("Enter valid Pincode"), console.log(err)));
  };
  return (
    <div>
      <div className="row bg-light">
        <div className="container">
          <div className="col-sm-12 p-2">
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
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src="vaccine1.jpg"
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="vaccine2.jpg"
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="vaccine3.jpg"
                    alt="Third slide"
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
      </div>
      <form className="row bg-dark">
        <div className="container">
          <div className="col-md-6 col-sm-12 px-2 mt-4 p-0">
            <input
              type="number"
              className="form-control"
              placeholder="Enter your pin"
              onChange={(e) => setpincode(e.target.value)}
            />
          </div>
          <button className="btn btn-primary m-2" onClick={handleFind}>
            Find
          </button>
        </div>
      </form>
      <div className="row bg-dark ">
        <div className="container">
          <div className="row">
            {cowinCenters.length > 0 ? (
              cowinCenters.map((data) => (
                <div
                  key={data.center_id}
                  className="col-md-4 col-sm-12 mh-100 p-2"
                >
                  <div className="card ">
                    <div className="card-body bg-warning">
                      <h4 className="card-title">
                        {data.sessions[0].vaccine}-{data.name}
                      </h4>
                      <span className="font-weight-bold pb-2">Address: </span>
                      <span>
                        {data.address}, {data.state_name}, {data.district_name},
                        {data.pincode}
                      </span>
                      <br />
                      <div className="row pb-2">
                        <div className="col-6 p-0">
                          <span className="font-weight-bold">Date: </span>
                          <span>{data.sessions[0].date}</span>
                        </div>
                        <div className="col-6">
                          <span className="font-weight-bold">Min Age: </span>
                          <span>{data.sessions[0].min_age_limit}</span>
                        </div>
                      </div>
                      <select className="form-control">
                        {data.sessions[0].slots.map((timeSlots, innerindex) => (
                          <option key={innerindex} value={timeSlots}>
                            {timeSlots}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="px-2">No Data Found :(</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cowin;
