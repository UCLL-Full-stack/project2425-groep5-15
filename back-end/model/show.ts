import { th } from 'date-fns/locale';
import {Movie} from './movie';
import {Room} from './room';
import {User} from './user';

export class Show {
    private id?: number;
    private startTime: string;
    private endTime: string;
    private date: Date;
    private movie: Movie;
    private room: Room;
    private visitors: Map<User, number>

    constructor(show: {id?: number, startTime: string, endTime: string, date: Date, movie: Movie, room: Room}) {
        this.validate(show);

        this.id = show.id;
        this.startTime = show.startTime;
        this.endTime = show.endTime;
        this.date = show.date;
        this.movie = show.movie;
        this.room = show.room;
        this.visitors = new Map<User, number>();
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getStartTime(): string {
        return this.startTime;
    }

    public getEndTime(): string {
        return this.endTime;
    }

    public getDate(): Date {
        return this.date;
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


    private validate(show: {startTime: string, endTime: string, date: Date, movie: Movie, room: Room}) {
        if (!show.startTime) {
            throw new Error('The show must have a start time');
        }

        if (!show.endTime) {
            throw new Error('The show must have an end time');
        }

        if (!show.date) {
            throw new Error('The show must have a date');
        }

        if (!show.movie) {
            throw new Error('The show must have a movie');
        }

        if (!show.room) {
            throw new Error('The show must have a room');
        }

        if (show.startTime >= show.endTime) {
            throw new Error('The start time must be before the end time');
        }

        if (show.date < new Date()) {
            throw new Error('The date must be in the future');
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