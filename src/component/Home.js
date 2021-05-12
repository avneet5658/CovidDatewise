import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { csv } from "d3";
import { CChart } from "@coreui/react-chartjs";
import moment from "moment";
const Home = () => {
  const [date, setDate] = useState("05-02-2021");
  const [covidData, setCovidData] = useState("");
  const [country, setCountry] = useState("");
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [filteredState, setFilteredState] = useState([]);
  const initialState = useMemo(
    () => ({
      subStates: [],
      provincedStates: [],
      confirmedCases: [],
      deaths: [],
      recovers: [],
      actives: [],
    }),
    []
  );
  const [covidUpdate, setCovidUpdate] = useState(initialState);
  const [stateUpdate, setStateUpdate] = useState(initialState);
  const [subStateUpdate, setSubStateUpdate] = useState(initialState);
  const [currentCountry, setCurrentCountry] = useState("");

  useEffect(() => {
    var tempCountry = "";
    setCountry("");
    setCovidUpdate(initialState);
    csv(
      `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`
    )
      .then((data) => {
        console.log(data);
        setCovidData(data);
        tempCountry = new Set(data.map((d) => d.Country_Region));
        setCountry([...tempCountry]);
      })
      .catch((err) => console.log(err));
  }, [date, initialState]);

  const handleCountry = (e) => {
    let countrySelected = e.target.value;
    let tempData = covidData.filter(
      (data) => data.Country_Region === countrySelected
    );
    setFilteredCountry(tempData);
    setStateUpdate(initialState);
    setSubStateUpdate(initialState);
    setCurrentCountry(countrySelected);

    setCovidUpdate({
      ...covidUpdate,
      provincedStates: [
        ...new Set(tempData.map((data) => data.Province_State)),
      ],
      confirmedCases: tempData.map((data) => data.Confirmed),
      deaths: tempData.map((data) => data.Deaths),
      recovers: tempData.map((data) => data.Recovered),
      actives: tempData.map((data) => data.Active),
    });
  };
  const handleProvincedStates = (e) => {
    const stateSelected = e.target.value;
    const index = covidUpdate.provincedStates.indexOf(stateSelected);
    var tempState = filteredCountry.filter(
      (data) => data.Province_State === stateSelected
    );
    setFilteredState(tempState);

    setStateUpdate({
      subStates: tempState.map((data) => data.Admin2),
      provincedStates: [stateSelected],
      confirmedCases: covidUpdate.confirmedCases[index],
      deaths: covidUpdate.deaths[index],
      recovers: covidUpdate.recovers[index],
      actives: covidUpdate.actives[index],
    });
  };

  const handleSubStates = (e) => {
    const subStateSelected = e.target.value;
    const tempSubState = filteredState.filter(
      (data) => data.Admin2 === subStateSelected
    );
    setSubStateUpdate({
      subStates: subStateSelected,
      provincedStates: tempSubState[0].Province_State,
      confirmedCases: tempSubState[0].Confirmed,
      deaths: tempSubState[0].Deaths,
      recovers: tempSubState[0].Recovered,
      actives: tempSubState[0].Active,
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <h1 className="text-primary mb-3">Daily Report Data {date}</h1>
          <input
            type="date"
            className="form-control"
            onChange={(e) => {
              setFilteredCountry([]);
              setDate(moment(e.target.value).format("MM-DD-YYYY"));
            }}
            min="2020-01-22"
            max="2021-05-04"
          />
          <br />
          <select className="form-control" onChange={(e) => handleCountry(e)}>
            <option>Select</option>
            {country &&
              country.map((countryName, index) => (
                <option key={index} value={countryName}>
                  {countryName}
                </option>
              ))}
          </select>
          <br />
          {covidUpdate.provincedStates.length > 1 && (
            <select
              className="form-control"
              onChange={(e) => handleProvincedStates(e)}
            >
              <option>Select</option>
              {covidUpdate.provincedStates.map((stateName, index) => (
                <option key={index} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          )}
          <br />

          {stateUpdate.subStates.length > 1 && (
            <select
              className="form-control"
              onChange={(e) => handleSubStates(e)}
            >
              <option>Select</option>
              {stateUpdate.subStates.map((subStateName, index) => (
                <option key={index} value={subStateName}>
                  {subStateName}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="col-md-p-5 col-sm-p-2">
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
                      subStateUpdate.provincedStates.length > 0
                        ? [subStateUpdate.confirmedCases]
                        : stateUpdate.provincedStates.length > 0
                        ? [stateUpdate.confirmedCases]
                        : [...covidUpdate.confirmedCases],
                  },
                  {
                    label: "Actives",
                    backgroundColor: "yellow",
                    borderColor: "rgba(255,99,132,1)",
                    tooltipLabelColor: "rgba(255,99,132,1)",
                    // data: [...actives],
                    data:
                      subStateUpdate.provincedStates.length > 0
                        ? [subStateUpdate.actives]
                        : stateUpdate.provincedStates.length > 0
                        ? [stateUpdate.actives]
                        : [...covidUpdate.actives],
                  },
                  {
                    label: "Recovered",
                    backgroundColor: "green",
                    borderColor: "rgba(255,99,132,1)",
                    tooltipLabelColor: "rgba(255,99,132,1)",
                    // data: [...recovered],
                    data:
                      subStateUpdate.provincedStates.length > 0
                        ? [subStateUpdate.recovers]
                        : stateUpdate.provincedStates.length > 0
                        ? [stateUpdate.recovers]
                        : [...covidUpdate.recovers],
                  },
                  {
                    label: "Deaths",
                    backgroundColor: "red",
                    borderColor: "rgba(255,99,132,1)",
                    tooltipLabelColor: "rgba(255,99,132,1)",
                    // data: [...deaths],
                    data:
                      subStateUpdate.provincedStates.length > 0
                        ? [subStateUpdate.deaths]
                        : stateUpdate.provincedStates.length > 0
                        ? [stateUpdate.deaths]
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
                  subStateUpdate.provincedStates.length > 0
                    ? [subStateUpdate.subStates]
                    : stateUpdate.provincedStates.length > 0
                    ? [...stateUpdate.provincedStates]
                    : covidUpdate.provincedStates.length > 1
                    ? [...covidUpdate.provincedStates]
                    : [currentCountry]
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
