import React, { useState } from "react";
import { useEffect } from "react";
import { csv } from "d3";
import { CChart } from "@coreui/react-chartjs";
const Home = () => {
  const [covidData, setCovidData] = useState("");
  const [country, setCountry] = useState("");
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [covidUpdate, setCovidUpdate] = useState({
    provincedStates: [],
    confirmedCases: [],
    deaths: [],
    recovered: [],
    actives: [],
  });
  const initialState = {
    provincedState: "",
    confirmedCase: "",
    death: "",
    recover: "",
    active: "",
  };
  const [stateUpdate, setStateUpdate] = useState(initialState);

  useEffect(() => {
    var tempCountry = "";
    csv(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/12-31-2020.csv"
    )
      .then((data) => {
        setCovidData(data);
        tempCountry = new Set(data.map((d) => d.Country_Region));
        setCountry([...tempCountry]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCountry = (e) => {
    let countrySelected = e.target.value;
    let tempData = covidData.filter(
      (data) => data.Country_Region === countrySelected
    );
    setFilteredCountry(tempData);
    setStateUpdate(initialState);
    setCovidUpdate({
      provincedStates: [
        ...new Set(tempData.map((data) => data.Province_State)),
      ],
      confirmedCases: tempData.map((data) => data.Confirmed),
      deaths: tempData.map((data) => data.Deaths),
      recovered: tempData.map((data) => data.Recovered),
      actives: tempData.map((data) => data.Active),
    });
  };
  const handleProvincedStates = (e) => {
    const index = covidUpdate.provincedStates.indexOf(e.target.value);

    setStateUpdate({
      provincedState: [e.target.value],
      confirmedCase: covidUpdate.confirmedCases[index],
      death: covidUpdate.deaths[index],
      recover: covidUpdate.recovered[index],
      active: covidUpdate.actives[index],
    });
  };

  return (
    <div>
      <h1>Daily Report Data 31/12/2020</h1>
      <select onChange={(e) => handleCountry(e)}>
        {country &&
          country.map((countryName, index) => (
            <option key={index} value={countryName}>
              {countryName}
            </option>
          ))}
      </select>

      {covidUpdate.provincedStates.length > 1 && (
        <select onChange={(e) => handleProvincedStates(e)}>
          {covidUpdate.provincedStates.map((stateName, index) => (
            <option key={index} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>
      )}

      <div style={{ width: "70%", height: "80%" }}>
        {filteredCountry.length > 0 ? (
          <CChart
            type="bar"
            datasets={[
              {
                label: "Confirmed",
                backgroundColor: "blue",
                borderColor: "rgba(179,181,198,1)",
                tooltipLabelColor: "rgba(179,181,198,1)",

                // data: [...confirmedCases],
                data:
                  stateUpdate.provincedState.length > 0
                    ? [stateUpdate.confirmedCase]
                    : [...covidUpdate.confirmedCases],
              },

              {
                label: "Actives",
                backgroundColor: "yellow",
                borderColor: "rgba(255,99,132,1)",
                tooltipLabelColor: "rgba(255,99,132,1)",
                // data: [...actives],
                data:
                  stateUpdate.provincedState.length > 0
                    ? [stateUpdate.active]
                    : [...covidUpdate.actives],
              },
              {
                label: "Recovered",
                backgroundColor: "green",
                borderColor: "rgba(255,99,132,1)",
                tooltipLabelColor: "rgba(255,99,132,1)",
                // data: [...recovered],
                data:
                  stateUpdate.provincedState.length > 0
                    ? [stateUpdate.recover]
                    : [...covidUpdate.recovered],
              },
              {
                label: "Deaths",
                backgroundColor: "red",
                borderColor: "rgba(255,99,132,1)",
                tooltipLabelColor: "rgba(255,99,132,1)",
                // data: [...deaths],
                data:
                  stateUpdate.provincedState.length > 0
                    ? [stateUpdate.death]
                    : [...covidUpdate.deaths],
              },
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true,
              },
            }}
            labels={
              stateUpdate.provincedState.length > 0
                ? [stateUpdate.provincedState]
                : [...covidUpdate.provincedStates]
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
