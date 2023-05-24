import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=f5a43681d0bf8befde9029e07f8ec821


// type = "now_playing" là trong API có key là now_playing
const MovieList = ({type = "now_playing"}) => {
  const { data} = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=f5a43681d0bf8befde9029e07f8ec821`,
    fetcher
  );
  const movie = data?.results || [];
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

export default MovieList;
