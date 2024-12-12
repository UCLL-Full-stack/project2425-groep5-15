import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@components/header';
import MoviesOverviewTable from '@components/movies/MoviesOverviewTable';
import AddNewMovie from '@components/movies/AddNewMovie';
import MovieService from '@services/movieService';
import { Movie } from '@types';

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
        <title>Movies - Cinematic</title>
        <meta name="description" content="Movies app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Discover our movies!</h1>
        <p>Click on a movie to see more details</p>
        <Link href="/shows">Click here to buy a ticket</Link>
        <div className="content-container">
          <section className="movies-section">
            {movies && <MoviesOverviewTable movies={movies} />}
          </section>
          <section className="form-section">
            <AddNewMovie />
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;