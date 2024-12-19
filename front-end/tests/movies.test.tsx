import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoviesOverviewTable from '@components/movies/MoviesOverviewTable';
import { Movie } from '@types';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    releaseDate: new Date('2010-07-16'),
    duration: 148,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
  },
  {
    id: 2,
    title: 'The Matrix',
    releaseDate: new Date('1999-03-31'),
    duration: 136,
    genres: ['Action', 'Sci-Fi'],
  },
  {
    id: 3,
    title: 'Interstellar',
    releaseDate: new Date('2014-11-07'),
    duration: 169,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
  },
];

describe('MoviesOverviewTable', () => {
  test('renders the movies table with correct data', () => {
    render(<MoviesOverviewTable movies={mockMovies} />);

    // Check if the table header is rendered
    expect(screen.getByText('Movies')).toBeInTheDocument();

    // Check if the movie titles are rendered
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });

    // Check if the movie genres are rendered
    mockMovies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        expect(screen.getByText((content, element) => {
          return element?.textContent === genre;
        })).toBeInTheDocument();
      });
    });
  });

  test('renders the movie details when a movie is clicked', () => {
    render(<MoviesOverviewTable movies={mockMovies} />);

    // Click on the first movie
    fireEvent.click(screen.getByText('Inception'));

    // Check if the movie details are rendered
    expect(screen.getByText('Details for Inception')).toBeInTheDocument();
    expect(screen.getByText('Genres: Action, Sci-Fi, Thriller')).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return !!element?.textContent?.includes('Release Date:') && !!element?.textContent?.includes('2010');
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return !!element?.textContent?.includes('Duration:') && !!element?.textContent?.includes('148');
    })).toBeInTheDocument();
  });
});