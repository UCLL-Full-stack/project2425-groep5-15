import { User as UserPrisma } from '@prisma/client';


export class User {
    readonly id?: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;

    constructor(user: {id? : number, firstName: string, lastName: string, username: string, email: string, password: string}) {
        this.validate(user);

        this.id  = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
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

    public validate(user: { firstName: string, lastName: string, username: string, email: string, password: string}) {

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


    }

    static from({id, firstName, lastName, username, email, password}: UserPrisma) {
        return new User({id, firstName, lastName, username, email, password});
    }
}

export default User;