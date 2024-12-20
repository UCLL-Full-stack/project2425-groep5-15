import Link from 'next/link';
import Header from '@components/headerNoL';
import MoviesOverviewTable from '@components/movies/MoviesOverviewTable';
import AddNewMovie from '@components/movies/AddNewMovie';
import MovieService from '@services/movieService';
import { Movie, User } from '@types';
import Head from 'next/head';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import React from 'react';

const Movies: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const parsedUser: User = JSON.parse(user);
      setLoggedInUser(parsedUser);
    }
  }, []);

  const fetchMovies = async () => {
    const response = await MovieService.getAllMovies();
    if (Array.isArray(response)) {
      return response;
    }
    throw new Error('Failed to fetch movies');
  };

  const { data: movies, error, isLoading } = useSWR('movies', fetchMovies);

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
        <div className="content-container d-flex justify-content-center">
          <section className="movies-section">
            {error && <div className="text-red-800">{error.message}</div>}
            {isLoading && <p className="text-green-800">Loading...</p>}
            {movies && <MoviesOverviewTable movies={movies} />}
          </section>
          {loggedInUser && loggedInUser.role === 'admin' && (
            <section className="form-section">
              <AddNewMovie />
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Movies;