import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonialItems } from "../constants";

import "../styles/JoinLoversSection.css";

export function JoinLoversSection() {
  return (
    <section className="join-lovers-section">
      <div className="rating">
        <span className="stars">{[1, 2, 3, 4, 5].map(() => <i className="bi bi-star-fill" />)}</span>
        <span className="rating-text">4.9/5</span>
      </div>
      <h2>
        Join&nbsp;
        <span className="underline">
          12,000+ UBE Lovers
          <svg className="squiggle" viewBox="-400 -55 730 60" stroke="currentColor" fill="none" role="presentation" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path stroke-linecap="round" stroke-width="30" pathLength="1" d="m -383.25 -6 c 55.25 -22 130.75 -33.5 293.25 -38 c 54.5 -0.5 195 -2.5 401 15"></path>
          </svg>
        </span>
        &nbsp;Enjoying Their Daily Ritual
      </h2>
      <Swiper
        className="slideshow"
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        spaceBetween={30}
        loop
        navigation
        pagination={{ clickable: true }}
      >
        {testimonialItems.map((item) => (
          <SwiperSlide className="slide">
            <img src={item.img} />
            <div className="text">
              <span className="stars">{[1, 2, 3, 4, 5].map(() => <i className="bi bi-star-fill" />)}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <div className="testimonial-name">
              <i className="bi bi-patch-check-fill"></i>
              <span>{item.testimonialName}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}