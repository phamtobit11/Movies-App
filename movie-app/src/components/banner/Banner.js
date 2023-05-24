import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=f5a43681d0bf8befde9029e07f8ec821`,
    fetcher
  );
  const movie = data?.results || [];
  console.log(movie);
  return (
    <section className="banner h-screen page-container pb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({item}) {
  const { title, poster_path} = item;

  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute rounded-lg inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] "></div>
      <img
      // CHÚ Ý: nếu ảnh bị vỡ thay vì dùng witdh thì dùng original trong đường dẫn src img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full rounded-lg object-cover object-top"
      />
      <div className="absolute w-full text-white left-5 bottom-5 ">
        <h2 className="font-bold text-3xl mb-8">{title}</h2>
        <div className="flex items-center gap-x-3">
          <span className="py-2 px-4 border border-white rounded-md">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Drama
          </span>
        </div>
        <button className="py-3 px-6 bg-primary rounded-lg mt-10 w-64 font-medium">
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
