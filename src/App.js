import "./App.css";
import Home from "./component/Home";
import ConfirmedGlobal from "./component/ConfirmedGlobal";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(true);
  return (
    <div className="App">
      <button onClick={() => setPage(!page)}>Switch page</button>
      {page ? <Home /> : <ConfirmedGlobal />}
    </div>
  );
}

export default App;
