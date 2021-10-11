import React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

const cx = classNames.bind(styles);
SwiperCore.use([Autoplay, Pagination, Navigation]);

interface swiperprops {
  swipername?: string;
}

const Part1: React.FC<swiperprops> = ({ swipername }) => {
  const slides = [];
  for (let i = 0; i < 10; i++) {
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <img src={`https://picsum.photos/id/${i + 1}/200/100`} alt={"pic"} />
      </SwiperSlide>
    );
  }
  return (
    <div>
      <div className={cx("swiper-box-wrap")}>
        <Swiper
          direction={"horizontal"}
          loop={true}
          spaceBetween={0}
          centeredSlides={false}
          speed={6000}
          autoplay={{ delay: 1, reverseDirection: true }}
          slidesPerView={5}
          allowTouchMove={false}
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
          className={cx("swiper-container")}
        >
          {slides}
        </Swiper>
      </div>
      <div className={cx("swiper-box-wrap")}>
        <Swiper
          direction={"horizontal"}
          loop={true}
          spaceBetween={0}
          centeredSlides={true}
          speed={1000}
          autoplay={{ delay: 0 }}
          slidesPerView={5}
          allowTouchMove={false}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          className={cx("swiper-container")}
        >
          {slides}
        </Swiper>
      </div>
    </div>
  );
};

export default Part1;
