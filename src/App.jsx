import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "./components/Topbar";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <div className="App warncolor">
      <BrowserRouter>
        <Topbar brand={"EpiWeather"} claim={"The goofiest weather app"} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:lat/:lon" element={<WeatherDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
