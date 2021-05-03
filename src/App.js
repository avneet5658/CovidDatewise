import "./App.css";
import Home from "./component/Home";
import ConfirmedGlobal from "./component/ConfirmedGlobal";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(true);
  return (
    <div>
      <div className="pl-4">
        <button
          className="btn btn-warning mt-4 mb-3"
          onClick={() => setPage(!page)}
        >
          Switch page
        </button>
        {page ? <Home /> : <ConfirmedGlobal />}
      </div>
    </div>
  );
}

export default App;
