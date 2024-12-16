import {Show} from "../model/show";
import {Movie} from "../model/movie";
import {Room} from "../model/room";
import {User} from "../model/user";
import movieDB from "./movie.db";
import roomDB from "./room.db";
import database from "../util/database";




const getAllShows = async (): Promise<Show[]> => {
  try {
    const showPrisma = await database.show.findMany({
      include: {
        movie: true,
        room: true,
      },
    });
    return showPrisma.map((showPrisma) => Show.from(showPrisma));
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getShowById = async (id: number): Promise<Show | null> => {
  try {
    const showPrisma = await database.show.findUnique({
      where: {
        id: id,
      },
      include: {
        movie: true,
        room: true,
      },
    });
    return showPrisma ? Show.from(showPrisma) : null;
  }
  catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }

};

  


export default {
    getAllShows,
    getShowById,
};