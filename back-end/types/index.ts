import { Show } from "../model/show";
import User from "../model/user";

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

type RoomInput = {
    id?: number;
    name: string;
    capacity: number;
}

type ShowInput = {
    id?: number;
    start: Date;
    end?: Date;
    movie: MovieInput;
    room: RoomInput;
    availableSeats?: number;
};

type UpdateShowInput = {
    id: number;
    start: Date;
    movieid: number;
    roomid: number;
}

type Genre= 'Action' | 'Adventure' | 'Animation' | 'Biography' | 'Comedy' | 'Crime' | 'Drama' | 'Family' | 'Fantasy' | 'History' | 'Horror' | 'Music' | 'Mystery' | 'Romance' | 'Sci-Fi' | 'Sport' | 'Thriller' | 'War' | 'Western';

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
}



type Role = 'admin' | 'client' | 'planner';

export {
    MovieInput,
    Genre,
    UserInput,
    AuthenticationResponse,
    Role,
    ShowInput,
    RoomInput,
    UpdateShowInput,
}