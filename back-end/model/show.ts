import {Movie} from './movie';
import {Room} from './room';
import {User} from './user';

export class Show {
    private id: number;
    private startTime: string;
    private endTime: string;
    private date: Date;
    private movie: Movie;
    private room: Room;
    private visitors: User[]

    constructor(show: {id: number, startTime: string, endTime: string, date: Date, movie: Movie, room: Room}) {
        this.id = show.id;
        this.startTime = show.startTime;
        this.endTime = show.endTime;
        this.date = show.date;
        this.movie = show.movie;
        this.room = show.room;
        this.visitors = [];
    }

    public getId(): number {
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

    public getVisitors(): User[] {
        return this.visitors;
    }

    public addVisitor(user: User): void {
        this.visitors.push(user);
    }
}

export default Show;