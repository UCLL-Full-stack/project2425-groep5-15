import {Show} from "../model/show";
import {Movie} from "../model/movie";
import {Room} from "../model/room";
import {User} from "../model/user";
import movieDB from "./movie.db";
import roomDB from "./room.db";


const shows: Show[] = [
    new Show({
        id: 1,
        startTime: '12:00',
        endTime: '14:00',
        date: new Date('2026-01-01'),
        movie: movieDB.getAllMovies()[0],
        room: roomDB.getAllRooms()[0]
    }),
    new Show({
        id: 2,
        startTime: '15:00',
        endTime: '17:00',
        date: new Date('2026-01-01'),
        movie: movieDB.getAllMovies()[1],
        room: roomDB.getAllRooms()[1]
    }),
    new Show({
        id: 3,
        startTime: '18:00',
        endTime: '20:00',
        date: new Date('2026-01-01'),
        movie: movieDB.getAllMovies()[2],
        room: roomDB.getAllRooms()[2]
    }),


];