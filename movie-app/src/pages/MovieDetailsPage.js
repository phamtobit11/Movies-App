import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { apiKey, fetcher } from "../config";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  // console.log(data);
  if (!data) {
    return null;
  }
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <Fragment>
      <div className="w-full h-[500px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 mb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          className="w-full h-full object-cover bg-no-repeat rounded-xl"
          alt=""
        />
      </div>
      <h1 className="font-bold text-white text-center text-3xl mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center gap-x-5 mb-10 justify-center text-white">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary border rounded-lg"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-white leading-relaxed max-w-[600px] mx-auto text-center pb-10">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </Fragment>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  if (!data) {
    return null;
  }
  const { cast } = data;
  // console.log(data);
  if (!cast || cast.length <= 0) {
    return null;
  }

  return (
    <Fragment>
      <h2 className="text-white font-bold mb-10 text-3xl text-center">Casts</h2>
      <div className="grid grid-cols-4 gap-5 mb-10">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              className="w-full h-[350px] object-cover rounded-lg mb-3"
              alt=""
            />
            <h3 className="text-2xl text-white text-center">{item.name}</h3>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );
  if (!data) {
    return null;
  }
  const { results } = data;
  // console.log(data);
  if (!results || results.length <= 0) {
    return null;
  }
  return (
    <div className="py-10">
      <div className="gird grid-cols">
        {results.slice(0, 1).map((item) => (
          <div className="" key={item.id}>
            <div key={item.id} className="w-full aspect-video">
              <h2 className="text-white font-bold text-3xl text-center">
                Trailer
              </h2>
              <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Type"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="mx-auto rounded-lg mb-10 w-[1280px] h-full"
              ></iframe>
              <h3 className="text-white text-center text-xl font-bold mt-2">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    fetcher
  );
  if (!data) {
    return null;
  }
  const { results } = data;
  console.log(data);
  if (!results || results.length <= 0) {
    return null;
  }
  return (
    <div className="py-10">
      <h2 className="text-3xl text-white text-center font-bold">
        Similar Movies
      </h2>
      <div className="slide-list mt-10">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
