type MovieInput = {
    id?: number;
    title: string;
    releaseDate: Date;
    duration: number;
    genres: string[];
};

type Genre= 'Action' | 'Adventure' | 'Animation' | 'Biography' | 'Comedy' | 'Crime' | 'Drama' | 'Family' | 'Fantasy' | 'History' | 'Horror' | 'Music' | 'Mystery' | 'Romance' | 'Sci-Fi' | 'Sport' | 'Thriller' | 'War' | 'Western';

export {
    MovieInput,
    Genre,
}