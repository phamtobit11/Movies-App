import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=f5a43681d0bf8befde9029e07f8ec821

const WatchNow = () => {
  const [movie, setMovie] = useState([]);
  const { data, error, isLoading } = useSWR(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=f5a43681d0bf8befde9029e07f8ec821",
    fetcher
  );
  useEffect(() => {
    if (data && data.results) setMovie(data.results);
  }, [data]);
  console.log(movie)
  return (
    <div className="slide-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default WatchNow;
