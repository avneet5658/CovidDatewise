import "./App.css";
import Home from "./component/Home";
import ConfirmedGlobal from "./component/ConfirmedGlobal";
import { Fragment, useState } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./component/Navbar";
import Cowin from "./component/Cowin";
import HomePage from "./component/HomePage";

function App() {
  const [page, setPage] = useState(true);
  return (
    <Fragment>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/confirmedglobal" component={ConfirmedGlobal} />
          <Route path="/cowin" component={Cowin} />
        </Switch>
      </BrowserRouter>
    </Fragment>

    // <div className="position-sticky">
    //   <div className="pl-4">
    //     <button
    //       className="btn btn-warning mt-4 mb-3"
    //       onClick={() => setPage(!page)}
    //     >
    //       Switch page
    //     </button>
    //     {page ? <Home /> : <ConfirmedGlobal />}
    //   </div>
    // </div>
  );
}

export default App;
