import {Show} from "../model/show";
import {Movie} from "../model/movie";
import {Room} from "../model/room";
import {User} from "../model/user";
import movieDB from "./movie.db";
import roomDB from "./room.db";



const shows: Show[] = [
    new Show({
        id: 1,
        start: new Date('2024-12-30T12:00:00'),
        movie: movieDB.getAllMovies()[0],
        room: roomDB.getAllRooms()[0]
    }),
    new Show({
        id: 2,
        start: new Date('2024-12-30T15:00:00'),
        movie: movieDB.getAllMovies()[1],
        room: roomDB.getAllRooms()[1]
    }),
    new Show({
        id: 3,
        start: new Date('2024-12-30T18:00:00'),
        movie: movieDB.getAllMovies()[2],
        room: roomDB.getAllRooms()[2]
    })];


const getAllShows = (): Show[] => {
    return shows;
};


export default {
    getAllShows,
};