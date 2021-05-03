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
  useEffect(() => {
    csv(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    )
      .then(
        (data) => (
          setCovidData(data),
          setCountry([...new Set(data.map((d) => d["Country/Region"]))])
        )
      )
      .catch((err) => console.log(err));
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
    // if (tempFilter.length > 1) {
    // } else {
    //   for( const date in tempFilter[0]){

    //   }
    // }
    // setFilteredCountry();
    // console.log(e);
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
      // } else {
      //   for (let d in filteredState[0]) {
      //     if (d === selectedDate) {
      //       setResult({
      //         date: selectedDate,
      //         confirmedCases: filteredState[0][d],
      //       });
      //       console.log(filteredState[0][d]);
      //     }
      //   }
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
      <div className="d-flex w-50">
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
        &nbsp;
        {console.log(filteredCountry)}
        {provincedState.length > 1 && (
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
        )}
        &nbsp;
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

      <div style={{ display: "flex" }}>
        {filteredCountry.date.length > 0 && (
          <div style={{ width: "50%" }}>
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
          </div>
        )}
        {result.date.length > 0 && (
          <div style={{ width: "50%" }}>
            <CChart
              type="bar"
              datasets={[
                {
                  label: "Confirmed Global",
                  backgroundColor: "red",
                  borderColor: "rgba(179,181,198,1)",
                  data: [result.confirmedCases],
                },
              ]}
              options={{
                aspectRatio: 1.5,
                tooltips: {
                  enabled: true,
                },
              }}
              labels={[result.date]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmedGlobal;
