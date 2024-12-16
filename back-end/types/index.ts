type MovieInput = {
    id?: number;
    title: string;
    releaseDate: Date;
    duration: number;
    genres: string[];
};

type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: Role;
}

type Genre= 'Action' | 'Adventure' | 'Animation' | 'Biography' | 'Comedy' | 'Crime' | 'Drama' | 'Family' | 'Fantasy' | 'History' | 'Horror' | 'Music' | 'Mystery' | 'Romance' | 'Sci-Fi' | 'Sport' | 'Thriller' | 'War' | 'Western';

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
}

type Role = 'admin' | 'user' | 'worker';

export {
    MovieInput,
    Genre,
    UserInput,
    AuthenticationResponse,
    Role,
}