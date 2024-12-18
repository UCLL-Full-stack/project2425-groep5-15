import {
    Show as ShowPrisma, 
    Movie as MoviePrisma, 
    Room as RoomPrisma,} from '@prisma/client';

import {Movie} from './movie';
import {Room} from './room';
import {User} from './user';

export class Show {
    readonly id?: number;
    readonly start: Date;
    readonly end: Date;
    readonly movie: Movie;
    readonly room: Room;
    private availableSeats: number;

    constructor(show: {id?: number, start: Date, end?: Date, movie: Movie, room: Room, availableSeats?: number}) {
        this.validate(show);

        this.id = show.id;
        this.start = show.start;
        if (show.end) {
            this.end = show.end;
        } else {this.end = new Date(show.start.getTime() + (show.movie.duration) * 60000)}
        
        this.movie = show.movie;
        this.room = show.room;
        if (show.availableSeats) {
            this.availableSeats = show.availableSeats;
        } else {this.availableSeats = show.room.capacity}
    
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getStart(): Date {
        return this.start;
    }

    public getEnd(): Date {
        return this.end;
    }

    public getMovie(): Movie {
        return this.movie;
    }

    public getRoom(): Room {
        return this.room;
    }

    public getAvailableSeats(): number {
        return this.availableSeats;
    }

    public reserveSeats(seats: number) {
        if (seats > this.availableSeats) {
            throw new Error('Not enough available seats');
        }

        this.availableSeats -= seats;
    }





    public validate(show: {start: Date, movie: Movie, room: Room}) {
        if (!show.start) {
            throw new Error('The show must have a start time');
        }


        if (!show.movie) {
            throw new Error('The show must have a movie');
        }

        if (!show.room) {
            throw new Error('The show must have a room');
        }

        if (show.start < new Date()) {
            throw new Error('The start must be in the future');
        }
    }

    static from({id, start, end, movie, room}: ShowPrisma & {movie: MoviePrisma; room: RoomPrisma}) {
        return new Show({id, start, end, movie: Movie.from(movie), room: Room.from(room)});
    }
    
}

export default Show;