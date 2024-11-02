export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;

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

    private validate(user: {name: string, email: string, password: string}) {
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
}

export default User;