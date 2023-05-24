import React, { Fragment } from 'react';
import MovieList from '../components/movie/MovieList';

const HomaPage = () => {
    return (
        <Fragment>
            {/* Now Playing */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-5 font-bold text-2xl">
          Now Playing
        </h2>
        {/* Vì bên MovieList đã gọi "now_playing" rồi nên bên App ko cần gọi */}
        <MovieList></MovieList>
      </section>

      {/* Top Reted */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-5 font-bold text-2xl">
          Top Reted
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>

      {/* Trending */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-5 font-bold text-2xl">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
        </Fragment>
    );
};

export default HomaPage;