import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1600",
    title: "Live Concerts",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600",
    title: "Standup Comedy",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1600",
    title: "Workshops & Events",
  },
];

const HeroCarousel = () => {
  return (
    <div className="w-full h-[250px] md:h-[400px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="h-full"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="h-full w-full bg-cover bg-center flex items-end"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="bg-black/50 w-full p-6 text-white">
                <h2 className="text-2xl md:text-4xl font-bold">{item.title}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
