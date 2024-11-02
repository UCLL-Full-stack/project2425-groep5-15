export class Movie {
    private id?: number;
    private title: string;
    private releaseDate: Date;
    private duration: number;
    private genres: string[];

    constructor(movie: {id?: number, title: string, releaseDate: Date, duration: number, genres: string[]}) {
        this.validate(movie);

        this.id = movie.id;
        this.title = movie.title;
        this.releaseDate = movie.releaseDate;
        this.duration = movie.duration;
        this.genres = movie.genres;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getReleaseDate(): Date {
        return this.releaseDate;
    }

    public getDuration(): number {
        return this.duration;
    }

    public getGenres(): string[] {
        return this.genres;
    }

    private validate(movie: {title: string, releaseDate: Date, duration: number, genres: string[]}) {
        
        if (!movie.title) {
            throw new Error('The movie must have a title');
        }

        if (!movie.releaseDate) {
            throw new Error('The movie must have a release date');
        }

        if (!movie.duration) {
            throw new Error('The movie must have a duration');
        }
        if (movie.duration < 1 || movie.duration > 900) {
            throw new Error('The movie duration must be between 1 and 900 minutes');
        }

        if (movie.genres.length === 0) {
            throw new Error('The movie must have genres');
        }
    }

    
}