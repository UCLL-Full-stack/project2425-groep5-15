import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoviesOverviewTable from '@components/movies/MoviesOverviewTable';
import { Movie } from '@types';

jest.mock('@services/movieService', () => ({
  getAllMovies: jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue([]),
  }),
}));

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
  test('renders the movies table with correct data', async () => {
    render(<MoviesOverviewTable movies={mockMovies} />);

    await waitFor(() => {
      expect(screen.getByText('Movies')).toBeInTheDocument();
    });

    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  test('renders the movie details when a movie is clicked', async () => {
    render(<MoviesOverviewTable movies={mockMovies} />);
  
    fireEvent.click(screen.getByText('Inception'));
  
    screen.debug();
  
    await waitFor(() => {
      expect(screen.getByText('Details for Inception')).toBeInTheDocument();
    });
  
    await waitFor(() => {
      expect(screen.getByText(/Genres:/)).toBeInTheDocument();
      expect(screen.getByText(/Action, Sci-Fi, Thriller/)).toBeInTheDocument();
    });
  
    const releaseDateElement = screen.getByText((content, element) =>
      content.includes('Release Date:') && content.includes('2010')
    );
    expect(releaseDateElement).toBeInTheDocument();
  
    const durationElement = screen.getByText((content, element) =>
      content.includes('Duration:') && content.includes('148')
    );
    expect(durationElement).toBeInTheDocument();
  });

  test('shows a message if no movies are available', async () => {
    render(<MoviesOverviewTable movies={[]} />);

    await waitFor(() => {
      expect(screen.getByText('No movies available.')).toBeInTheDocument();
    });
  });
});
