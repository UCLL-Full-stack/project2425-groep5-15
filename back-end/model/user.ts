import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';
import Show from './show';


export class User {
    readonly id?: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role
    readonly tickets: Map<Show, number>

    constructor(user: {id? : number, firstName: string, lastName: string, username: string, email: string, password: string, role: Role, tickets?: Map<Show, number>}) {
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
            this.tickets = new Map<Show, number>();
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

    public getTickets(): Map<Show, number> {
        return this.tickets;
    }

    public addTickets(show: Show, seats: number) {
        if (seats <= 0) {
            throw new Error('The number of seats must be greater than 0');
        }

        if (this.tickets.has(show)) {
            const currentValue = this.tickets.get(show) || 0;
            this.tickets.set(show, currentValue + seats);
        } else {
            this.tickets.set(show, seats);
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

    static from({id, firstName, lastName, username, email, password, role}: UserPrisma) {
        return new User({id, firstName, lastName, username, email, password, role: role as Role});
    }
}

export default User;