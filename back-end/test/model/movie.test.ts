
import { Movie } from '../../model/movie';

test('given valid values, when creating a movie, then it creates a movie with those values', () => {
    const movie = new Movie({
        id: 1,
        title: 'The Shawshank Redemption',
        releaseDate: new Date('1994-10-14'),
        duration: 142,
        genres: ['Drama']
    });

    expect(movie.getId()).toEqual(1);
    expect(movie.getTitle()).toEqual('The Shawshank Redemption');
    expect(movie.getReleaseDate()).toEqual(new Date('1994-10-14'));
    expect(movie.getDuration()).toEqual(142);
    expect(movie.getGenres()).toEqual(['Drama']);
});

test('given a movie without an id, when getting the id, then it returns undefined', () => {
    const movie = new Movie({
        title: 'The Shawshank Redemption',
        releaseDate: new Date('1994-10-14'),
        duration: 142,
        genres: ['Drama']
    });

    expect(movie.getId()).toBeUndefined();
});

test('given a movie without a title, when creating a movie, then it throws an error', () => {
    const movie = () => new Movie({
        title: '',
        releaseDate: new Date('1994-10-14'),
        duration: 142,
        genres: ['Drama']
    });
    expect(movie).toThrow("The movie must have a title");
    
});
test('given a movie with a duration longer than 900 minutes, when creating a movie, then it throws an error', () => {
    const movie = () => new Movie({
        title: 'The Longest Movie Ever',
        releaseDate: new Date('2023-01-01'),
        duration: 901,
        genres: ['Drama']
    });
    expect(movie).toThrow('The movie duration must be between 1 and 900 minutes');
});

test('given a movie with a duration of 0 minutes, when creating a movie, then it throws an error', () => {
    const movie = () => new Movie({
        title: 'The Shortest Movie Ever',
        releaseDate: new Date('2023-01-01'),
        duration: 0,
        genres: ['Drama']
    });
    expect(movie).toThrow('The movie must have a duration');
});

test('given a movie without a release date, when creating a movie, then it throws an error', () => {
    const movie = () => new Movie({
        title: 'No Release Date Movie',
        releaseDate: undefined as unknown as Date,
        duration: 120,
        genres: ['Drama']
    });
    expect(movie).toThrow('The movie must have a release date');
});

test('given a movie without genres, when creating a movie, then it throws an error', () => {
    const movie = () => new Movie({
        title: 'No Genre Movie',
        releaseDate: new Date('2023-01-01'),
        duration: 120,
        genres: []
    });
    expect(movie).toThrow('The movie must have genres');
});


