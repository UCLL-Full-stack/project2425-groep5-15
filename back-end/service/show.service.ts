
import {Show} from "../model/show";
import showDB from "../repository/show.db";

const getAllShows = (): Show[] => showDB.getAllShows();


export default {
    getAllShows,
};