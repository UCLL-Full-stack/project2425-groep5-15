import {Show} from "../model/show";
import {Movie} from "../model/movie";
import {Room} from "../model/room";
import {User} from "../model/user";
import movieDB from "./movie.db";
import roomDB from "./room.db";
import database from "../util/database";




const getAllShows = async (): Promise<Show[]> => {
    const showPrisma = await database.show.findMany({
      include: {
        movie: true,
        room: true,
      },
    });
  
    return showPrisma.map((showPrisma) => Show.from(showPrisma));
  };
  


export default {
    getAllShows,
};