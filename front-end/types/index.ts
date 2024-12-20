export type Movie = {
    id?: number;
    title: string;
    releaseDate: Date;
    duration: number;
    genres: string[];
  };
  
  export type Show = {
    id: number;
    start: string;
    end: string;
    movie: Movie;
    room: Room;
    availableSeats: number;
  };
  
  export type Room = {
    id?: number;
    capacity: number;
  };
  
  export type StatusMessage = {
    message: string;
    type: "error" | "success";
  };
  
  export type User = {
    token?: any;
    fullname?: string;
    username?: string;
    role?: string;
  };