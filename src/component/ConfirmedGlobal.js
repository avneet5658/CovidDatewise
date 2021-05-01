import React, { useState } from "react";
import { useEffect } from "react";
import { csv, filter } from "d3";
import { CChart } from "@coreui/react-chartjs";
const ConfirmedGlobal = () => {
  const [covidData, setCovidData] = useState([]);
  const [country, setCountry] = useState("");
  const [filteredCountry, setFilteredCountry] = useState("");
  const [provincedState, setProvincedState] = useState([]);
  const [dates, setDates] = useState([]);
  const [filteredState, setFilteredState] = useState();
  const [result, setResult] = useState({
    date: "",
    confirmedCases: "",
  });

  useEffect(() => {
    var tempCountry = "";
    csv(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    )
      .then(
        (data) => (
          setCovidData(data),
          console.log(data),
          (tempCountry = new Set(data.map((d) => d["Country/Region"]))),
          setCountry([...tempCountry])
        )
      )
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    let selectedCountry = e.target.value;
    let tempFilter = [];
    console.log(
      covidData.filter((data) => data["Country/Region"] === selectedCountry)
    );
    tempFilter = covidData.filter(
      (data) => data["Country/Region"] === selectedCountry
    );
    setFilteredCountry(tempFilter);
    setDates(covidData.columns.slice(4, covidData.columns.length));
    setProvincedState(tempFilter.map((data) => data["Province/State"]));
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

    if (filteredCountry.length === 1) {
      for (let d in filteredCountry[0]) {
        if (d === selectedDate) {
          setResult({
            date: selectedDate,
            confirmedCases: filteredCountry[0][d],
          });
          console.log(filteredCountry[0][d]);
        }
      }
    } else {
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
    // for (let x in filteredCountry) {
    //   for (let d in x) {
    //     if (d === selectedDate) {
    //       console.log(filteredCountry[0][d]);
    //     }
    //   }
    // }
    const selectedProvincedState = e.target.value;
    setFilteredState(
      filteredCountry.filter(
        (data) => data["Province/State"] === selectedProvincedState
      )
    );
  };
  return (
    <div>
      <h1>Global Data</h1>
      <select onChange={(e) => handleChange(e)}>
        {country &&
          country.map((countryName, index) => (
            <option key={index} value={countryName}>
              {countryName}
            </option>
          ))}
      </select>
      {provincedState.length > 1 && (
        <select onChange={(e) => handleProvincedStateChange(e)}>
          {provincedState.map((stateName, index) => (
            <option key={index} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>
      )}
      {dates.length > 1 && (
        <select onChange={(e) => handleDateChange(e)}>
          {dates.map((currentDate, index) => (
            <option key={index} value={currentDate}>
              {currentDate}
            </option>
          ))}
        </select>
      )}
      {filteredCountry && (
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
      )}
    </div>
  );
};

export default ConfirmedGlobal;
