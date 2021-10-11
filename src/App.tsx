import React from "react";
import logo from "./logo.svg";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Swiper1 from "./container/Swiper1";
import Swiper2 from "./container/Swiper2";
import Swiper3 from "./container/Swiper3";
import Part4 from "./container/part4";

const App: React.FC = () => {
  return (
    <div className="App">
      <Swiper1 swipername={"Swiper1"} />
      <Swiper2 />
      <Swiper3 />
    </div>
  );
};

export default App;
