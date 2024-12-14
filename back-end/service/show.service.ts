
import {Show} from "../model/show";
import showDB from "../repository/show.db";

const getAllShows = async (): Promise<Show[]> => await showDB.getAllShows();

const getShowsByDate = async (date: Date): Promise<Show[]> => {
    const shows = await showDB.getAllShows();
    const showsOnDate = shows.filter(show => show.getStart().getDate() === date.getDate());
    if (showsOnDate.length === 0) {
        throw new Error('No shows on this date');
    }
    return showsOnDate;
};


export default {
    getAllShows,
    getShowsByDate
};