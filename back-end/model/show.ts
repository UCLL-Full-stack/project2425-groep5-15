import {Movie} from './movie';
import {Room} from './room';
import {User} from './user';


export class Show {
    readonly id?: number;
    readonly start: Date;
    readonly end: Date;
    readonly movie: Movie;
    readonly room: Room;
    readonly visitors: Map<User, number>

    constructor(show: {id?: number, start: Date, movie: Movie, room: Room}) {
        this.validate(show);

        this.id = show.id;
        this.start = show.start;
        this.end = new Date(show.start.getTime() + (show.movie.duration + 60) * 60000);
        this.movie = show.movie;
        this.room = show.room;
        this.visitors = new Map<User, number>();
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

    public getVisitors(): Map<User, number> {
        return this.visitors;
    }

    public getVisitorsTotal(): number {
        let total = 0;
        this.visitors.forEach((value) => {
            total += value;
        });
        return total;
    }

    public getRemainingSeats(): number {
        return this.room.getcapacity() - this.getVisitorsTotal();
    };


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

    public addVisitor(user: User, seats: number) {
        if (seats <= 0) {
            throw new Error('The number of seats must be greater than 0');
        }

        if (this.visitors.has(user)) {
            const currentValue = this.visitors.get(user) || 0;
            this.visitors.set(user, currentValue + seats);
        } else { this.visitors.set(user, seats)}
    }

    
}

export default Show;