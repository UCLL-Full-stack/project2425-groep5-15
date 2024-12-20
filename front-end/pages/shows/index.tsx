import Head from 'next/head';
import Header from '@components/headerNoL';
import MoviesOverviewTable from '@components/movies/MoviesOverviewTable';
import { Movie, User } from '@types';
import { useState, useEffect } from 'react';
import MovieService from '@services/movieService';
import React from 'react';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const getMovies = async () => {
    const response = await MovieService.getAllMovies();
    const data = await response.json();
    setMovies(data);
  };

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const parsedUser: User = JSON.parse(user);
      setLoggedInUser(parsedUser);
      getMovies();
    } else {
      getMovies(); // Fetch movies even if the user is not logged in
    }
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
        {!loggedInUser ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Unauthorized</h1>
            <p>You must be logged in to view this page.</p>
          </div>
        ) : (
          <>
            <h1>Discover our shows and buy your tickets!</h1>
            <p>Click on a movie to see available shows</p>
            <section>
              {movies && <MoviesOverviewTable movies={movies} />}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Home;