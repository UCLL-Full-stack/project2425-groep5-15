export type Movie = {
    id?: number;
    title: string;
    releaseDate: Date;
    duration: number;
    genres: string[];
};

export type Show= {
    id?: number;
    start: Date;
    movie: Movie;
    room: Room;
}

export type Room = {
    id?: number;
    name: string;
    seats: number;
}   


export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

export type User = {
    token?: any;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
};