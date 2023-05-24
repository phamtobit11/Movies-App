import { Fragment } from "react";
import "swiper/scss";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
import HomaPage from "./pages/HomaPage";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";


function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomaPage></HomaPage>
                </>
              }
            ></Route>

            <Route path="/moviepage" element={<MoviePage></MoviePage>}></Route>
            <Route path="/movie/:movieId" element={<MovieDetailsPage></MovieDetailsPage>}></Route>
          </>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
