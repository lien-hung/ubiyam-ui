import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "../styles/AnnounceBar.css";

export function AnnounceBar() {
  return (
    <Swiper modules={[Autoplay]} className="announce-bar" loop autoplay={{ delay: 4500 }}>
      <SwiperSlide className="announce-bar-slide">
        <i className="bi bi-patch-check-fill"></i>
        <span>60-day Satisfaction Guarantee</span>
      </SwiperSlide>
      <SwiperSlide className="announce-bar-slide">
        <i className="bi bi-truck"></i>
        <span>Free Shipping on Orders $35+</span>
      </SwiperSlide>
    </Swiper>
  )
}