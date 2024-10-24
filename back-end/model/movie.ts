export class Movie {
    private id: number;
    private title: string;
    private releaseDate: Date;
    private duration: number;
    private genres: string[];

    constructor(movie: {id: number, title: string, releaseDate: Date, duration: number, genres: string[]}) {
        this.id = movie.id;
        this.title = movie.title;
        this.releaseDate = movie.releaseDate;
        this.duration = movie.duration;
        this.genres = movie.genres;
    }

    public getId(): number {
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

    
}