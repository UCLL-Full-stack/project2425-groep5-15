import Link from 'next/link';
import Header from '@components/headerNoL';
import MoviesOverviewTable from '@components/movies/MoviesOverviewTable';
import AddNewMovie from '@components/movies/AddNewMovie';
import MovieService from '@services/movieService';
import { Movie } from '@types';
import Head from 'next/head';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Movies: React.FC = () => {
  const fetchMovies = async () => {
    const response = await MovieService.getAllMovies();
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Failed to fetch movies');
  };

  const { data: movies, error, isLoading } = useSWR('movies', fetchMovies);

  useInterval(() => {
    mutate('movies', fetchMovies());
  }, 1000);

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
            {error && <div className="text-red-800">{error.message}</div>}
            {isLoading && <p className="text-green-800">Loading...</p>}
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

export default Movies;