export class User {
    private id: number;
    private name: string;
    private email: string;
    private password: string;

    constructor(user: {id : number, name: string, email: string, password: string}) {
        this.id  = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }

    public getId(): number {
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
}

export default User;