import React, { useState } from "react";
import { useEffect } from "react";
import { csv } from "d3";
import { CChart } from "@coreui/react-chartjs";
const ConfirmedGlobal = () => {
  const initialState = {
    date: "",
    confirmedCases: "",
  };

  const [covidData, setCovidData] = useState([]);
  const [country, setCountry] = useState("");
  const [filteredCountry, setFilteredCountry] = useState(initialState);
  const [provincedState, setProvincedState] = useState([]);
  const [dates, setDates] = useState([]);
  const [filteredState, setFilteredState] = useState();
  const [result, setResult] = useState(initialState);

  const [loc, setLoc] = useState({
    lat: "",
    lng: "",
  });
  useEffect(() => {
    csv(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    )
      .then((data) => {
        setCovidData(data);
        setCountry([...new Set(data.map((d) => d["Country/Region"]))]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLoc({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      });
    });
  }, []);

  const handleCountryChange = (e) => {
    let selectedCountry = e.target.value;
    let tempFilter = covidData.filter(
      (data) => data["Country/Region"] === selectedCountry
    );
    setResult(initialState);
    setProvincedState(tempFilter.map((data) => data["Province/State"]));
    console.log(tempFilter);

    let tempDates = [],
      tempConfirmedCase = [];

    if (tempFilter.length === 1) {
      setFilteredState(tempFilter);
      for (let data in tempFilter[0]) {
        if (
          data === "Province/State" ||
          data === "Country/Region" ||
          data === "Lat" ||
          data === "Long"
        ) {
          continue;
        }
        tempDates.push(data);
        tempConfirmedCase.push(tempFilter[0][data]);
      }
    }

    setFilteredCountry({
      date: tempDates,
      confirmedCases: tempConfirmedCase,
    });

    setDates(covidData.columns.slice(4, covidData.columns.length));
  };
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    if (filteredState.length === 1) {
      for (let d in filteredState[0]) {
        if (d === selectedDate) {
          setResult({
            date: selectedDate,
            confirmedCases: filteredState[0][d],
          });
          console.log(filteredState[0][d]);
        }
      }
    }
  };

  const handleProvincedStateChange = (e) => {
    const selectedProvincedState = e.target.value;

    const tempFilter = covidData.filter(
      (data) => data["Province/State"] === selectedProvincedState
    );
    setFilteredState(tempFilter);
    let tempDates = [],
      tempConfirmedCase = [];
    for (let data in tempFilter[0]) {
      if (
        data === "Province/State" ||
        data === "Country/Region" ||
        data === "Lat" ||
        data === "Long"
      ) {
        continue;
      }
      tempDates.push(data);
      tempConfirmedCase.push(tempFilter[0][data]);
    }

    setFilteredCountry({
      date: tempDates,
      confirmedCases: tempConfirmedCase,
    });
  };
  return (
    <div>
      <h1 className="text-primary">Global Data</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="p-2">
            <select
              className="form-control"
              onChange={(e) => handleCountryChange(e)}
            >
              <option>Select</option>
              {country &&
                country.map((countryName, index) => (
                  <option key={index} value={countryName}>
                    {countryName}
                  </option>
                ))}
            </select>
            {loc.lat > 0 && (
              <div>
                <b>Latitude: {loc.lat}</b>
                <br />
                <b>Longitude:{loc.lng}</b>
              </div>
            )}
          </div>
        </div>
        &nbsp;
        {provincedState.length > 1 && (
          <div className="col-md-3">
            <div className="p-2">
              <select
                className="form-control"
                onChange={(e) => handleProvincedStateChange(e)}
              >
                <option>Select</option>
                {provincedState.map((stateName, index) => (
                  <option key={index} value={stateName}>
                    {stateName}
                  </option>
                ))}
                &nbsp;
              </select>
            </div>
          </div>
        )}
        &nbsp;
        <div className="col-md-3">
          <div className="p-2">
            {dates.length > 1 && (
              <select
                className="form-control"
                onChange={(e) => handleDateChange(e)}
              >
                {dates.map((currentDate, index) => (
                  <option key={index} value={currentDate}>
                    {currentDate}
                  </option>
                ))}
                &nbsp;
              </select>
            )}
          </div>
        </div>
      </div>
      <div className="row p-2">
        <div className="col-md-6 col-sm-12">
          {filteredCountry.date.length > 0 && (
            <CChart
              type="line"
              datasets={[
                {
                  label: "Confirmed Global",
                  backgroundColor: "red",
                  borderColor: "rgba(179,181,198,1)",
                  data: [...filteredCountry.confirmedCases],
                },
              ]}
              options={{
                aspectRatio: 1.5,
                tooltips: {
                  enabled: true,
                },
              }}
              labels={[...filteredCountry.date]}
            />
          )}
        </div>
        <div className="col-md-6 col-sm-12">
          {result.date.length > 0 && (
            <CChart
              type="bar"
              datasets={[
                {
                  label: "Confirmed Global",
                  backgroundColor: "red",
                  borderColor: "rgba(179,181,198,1)",
                  data: [result.confirmedCases, 0],
                },
              ]}
              options={{
                aspectRatio: 1.5,
                tooltips: {
                  enabled: true,
                },
              }}
              labels={[result.date, ""]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmedGlobal;
