import { 
    User as UserPrisma,
    Show as ShowPrisma,
    Movie as MoviePrisma,
    Room as RoomPrisma
} from '@prisma/client';
import { Role } from '../types';
import Show from './show';


export class User {
    readonly id?: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    readonly tickets: Show[];

    constructor(user: {id? : number, firstName: string, lastName: string, username: string, email: string, password: string, role: Role, tickets?: Show[]}) {
        this.validate(user);

        this.id  = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        if (user.tickets) {
            this.tickets = user.tickets;
        } else {
            this.tickets = [];
        }
    }


    public getId(): number | undefined {
        return this.id;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): Role {
        return this.role;
    }

    public getTickets(): Show[] {
        return this.tickets;
    }

    public addTickets(ticket: Show, quantity: number) {
        for (let i = 0; i < quantity; i++) {
            this.tickets.push(ticket);
        }
    }



    public validate(user: { firstName: string, lastName: string, username: string, email: string, password: string, role: Role}) {

        if (!user.firstName) {
            throw new Error('The user must have a first name');
        }

        if (!user.lastName) {
            throw new Error('The user must have a last name');
        }

        if (!user.username) {
            throw new Error('The user must have a name');
        }

        if (!user.email) {
            throw new Error('The user must have an email');
        }

        if (!user.password) {
            throw new Error('The user must have a password');
        }

        if (user.password.length < 8) {
            throw new Error('The password must have at least 8 characters');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            throw new Error('The email format is invalid');
        }

        if (!user.role) {
            throw new Error('The user must have a role');
        }



    }
    static from({id, firstName, lastName, username, email, password, role, tickets}: UserPrisma & {tickets?: ({id: number; start: Date; end: Date; movieId: number; roomId: number; movie: MoviePrisma; room: RoomPrisma}[])}) {
        return new User({id, firstName, lastName, username, email, password, role: role as Role, tickets: tickets ? tickets.map(ticket => Show.from(ticket)) : []});

    }

}

export default User;