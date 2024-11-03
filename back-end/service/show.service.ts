
import {Show} from "../model/show";
import showDB from "../repository/show.db";

const getAllShows = (): Show[] => showDB.getAllShows();

const getShowsByDate = (date: Date): Show[] => {
    const shows = showDB.getAllShows();
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