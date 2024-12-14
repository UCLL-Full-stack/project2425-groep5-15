import Head from 'next/head';
import Header from '@components/header';
import MoviesOverviewTable from '@components/movies/MoviesOverviewTable';
import { Movie } from '@types';
import { useState, useEffect } from 'react';
import MovieService from '@services/movieService';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);

  const getMovies = async () => {
    const response = await MovieService.getAllMovies();
    const data = await response.json();
    setMovies(data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Head>
        <title>Shows - Cinematic</title>
        <meta name="description" content="Movies app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Discover our shows and buy your tickets!</h1>
        <p>Click on a movie to see available shows</p>

        <section>
          {movies && <MoviesOverviewTable movies={movies} />}
        </section>
      </main>
    </>
  );
};

export default Home;