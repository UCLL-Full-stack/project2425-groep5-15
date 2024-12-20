
import { get } from "http";
import {Show} from "../model/show";
import showDB from "../repository/show.db";
import {ShowInput, UpdateShowInput} from "../types";
import { Movie } from "../model/movie";
import {Room} from "../model/room";
import movieDB from "../repository/movie.db";
import roomDB from "../repository/room.db";


const getAllShows = async (): Promise<Show[]> => await showDB.getAllShows();

const getShowsByDate = async (date: Date): Promise<Show[]> => {
    const shows = await showDB.getAllShows();
    const showsOnDate = shows.filter(show => show.getStart().getDate() === date.getDate());
    if (showsOnDate.length === 0) {
        throw new Error('No shows on this date');
    }
    return showsOnDate;
};

const getShowById = async (id: number): Promise<Show> => {
    const show = await showDB.getShowById(id);
    if (!show) {
        throw new Error('Show with this id does not exist');
    }
    return show;
}


const deleteShow = async (id: number): Promise<string> => {
    const show = await showDB.deleteShow(id);
    if (!show) {
        throw new Error('Show with this id does not exist');
    }
    return "Show deleted successfully";
}

const updateShow = async ({id, start, movieid, roomid, }: UpdateShowInput): Promise<Show> => {
    if (!id) {
        throw new Error('Id cannot be empty');
    }
    const show = await showDB.getShowById(id);
    if (!show) {
        throw new Error('Show with this id does not exist');
    }

    if (!start) {
        throw new Error('Start time cannot be empty');
    }
    if (!movieid) {
        throw new Error('Movie id cannot be empty');
    }
    const room = await roomDB.getRoomById(roomid);
    if (!room) {
        throw new Error('Room with this id does not exist');
    }
    if (!movieid) {
        throw new Error('Movie id cannot be empty');
    }
    const movie = await movieDB.getMovieById(movieid);
    if (!movie) {
        throw new Error('Movie with this id does not exist');
    }
    const updatedShow = new Show({id, start: new Date(start), movie, room});
    return showDB.updateShow(updatedShow);
}





export default {
    getAllShows,
    getShowsByDate,
    getShowById,
    deleteShow,
    updateShow,
};