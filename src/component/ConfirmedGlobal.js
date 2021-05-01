import React, { useState } from "react";
import { useEffect } from "react";
import { csv } from "d3";
import { CChart } from "@coreui/react-chartjs";
const ConfirmedGlobal = () => {
  const [covidData, setCovidData] = useState("");
  const [country, setCountry] = useState("");

  const changeState = (tempData, state, setState) => {
    let tempState = state;
    tempState.push(tempData);
    setState(tempState);
  };

  useEffect(() => {
    var tempCountry = "";
    var tempCol = "";
    csv(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/12-31-2020.csv"
    )
      .then((data) => {
        tempCountry = new Set(data.map((d) => d.Country_Region));
        setCountry([...tempCountry]);
      })
      .catch((err) => console.log(err));
    csv(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    )
      .then((data) => (setCovidData(data), console.log()))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    console.log(e);
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

      <CChart
        type="bar"
        datasets={[
          {
            label: "Confirmed",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            tooltipLabelColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40],
          },
          {
            label: "Deaths",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            tooltipLabelColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100],
          },
        ]}
        options={{
          aspectRatio: 1.5,
          tooltips: {
            enabled: true,
          },
        }}
      />
    </div>
  );
};

export default ConfirmedGlobal;
