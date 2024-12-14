import { User as UserPrisma } from '@prisma/client';


export class User {
    readonly id?: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;

    constructor(user: {id? : number, name: string, email: string, password: string}) {
        this.validate(user);

        this.id  = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getname(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getpassword(): string {
        return this.password;
    }

    public validate(user: {name: string, email: string, password: string}) {
        if (!user.name) {
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

    static from({id, name, email, password}: UserPrisma) {
        return new User({id, name, email, password});
    }
}

export default User;