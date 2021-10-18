import React from "react";
import logo from "./logo.svg";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Bear from "assets/image/bear.png";
import Bull from "assets/image/bull.png";
import Swiper1 from "./container/Swiper1";
import Swiper2 from "./container/Swiper2";
import Swiper3 from "./container/Swiper3";
import Swiper4 from "./container/Swiper4";
import Swiper5 from "./container/Swiper5";
import Swiper6 from "./container/Swiper6";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Swiper3 /> */}
      {/* <Swiper4 /> */}
      <Swiper5
        list={[
          {
            no: "2481",
            title: "強茂",
            consumerate: "0.42",
            up: false,
            price: "95",
            consumeNum: "0.4",
            pic: Bear,
          },
          {
            no: "2330",
            title: "台積電",
            consumerate: "0.34",
            price: "588",
            up: true,
            consumeNum: "0.4",
            pic: Bull,
          },
          {
            no: "2317",
            title: "鴻海",
            consumerate: "0.40",
            price: "109.5",
            up: true,
            consumeNum: "0.2",
            pic: Bull,
          },
          {
            no: "2454",
            title: "聯發科",
            consumerate: "4.97",
            price: "857",
            up: true,
            consumeNum: "18.5",
            pic: Bull,
          },
          {
            no: "2303",
            title: "聯電",
            consumerate: "4.23",
            price: "59.10",
            up: true,
            consumeNum: "2.40",
            pic: Bull,
          },
          {
            no: "2303",
            title: "廣達",
            consumerate: "0.63",
            price: "78.40",
            up: false,
            consumeNum: "0.5",
            pic: Bear,
          },
          {
            no: "4938",
            title: "和碩",
            consumerate: "0.46",
            price: "67.70",
            up: true,
            consumeNum: "0.3",
            pic: Bull,
          },
        ]}
      />
      <Swiper5
        list={[
          {
            no: "0056",
            title: "元大高股息",
            consumerate: "0.42",
            up: false,
            price: "95",
            consumeNum: "0.4",
            pic: Bear,
          },
          {
            no: "0050",
            title: "0050",
            consumerate: "0.34",
            price: "588",
            up: true,
            consumeNum: "0.4",
            pic: Bull,
          },
          {
            no: "2603",
            title: "長榮",
            consumerate: "0.40",
            price: "93.30",
            up: true,
            consumeNum: "0.2",
            pic: Bear,
          },
          {
            no: "2886",
            title: "兆豐金",
            consumerate: "4.97",
            price: "857",
            up: true,
            consumeNum: "18.5",
            pic: Bull,
          },
          {
            no: "2882",
            title: "國泰金",
            consumerate: "4.23",
            price: "59.10",
            up: true,
            consumeNum: "2.40",
            pic: Bull,
          },
          {
            no: "2883",
            title: "開發金",
            consumerate: "0.63",
            price: "78.40",
            up: false,
            consumeNum: "0.5",
            pic: Bear,
          },
          {
            no: "2889",
            title: "國票金",
            consumerate: "0.46",
            price: "67.70",
            up: true,
            consumeNum: "0.3",
            pic: Bull,
          },
        ]}
      />
      {/* <Swiper6 /> */}
    </div>
  );
};

export default App;
