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


const deleteShow = async (id: number): Promise<Show | null> => {
  try {
    const showPrisma = await database.show.delete({
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
}

const getShowsByMovieId = async (movieId: number): Promise<Show[]> => {
  try {
    const showPrisma = await database.show.findMany({
      where: {
        movieId: movieId,
      },
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
}

const deleteShowsByMovieId = async (movieId: number): Promise<void> => {
  try {
    await database.show.deleteMany({
      where: {
        movieId: movieId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
}

const updateShow = async ({id, start, end, movie, room, availableSeats}: Show): Promise<Show> => {
  try {
    const showPrisma = await database.show.update({
      where: {
        id: id,
      },
      data: {
        start: start,
        end: end,
        movie: {
          connect: { id: movie.id },
        },
        room: {
          connect: { id: room.id },
        },
      
      },
      include: {
        movie: true,
        room: true,
      },
    });
    return Show.from(showPrisma);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
}

  


export default {
    getAllShows,
    getShowById,
    deleteShow,
    getShowsByMovieId,
    deleteShowsByMovieId,
    updateShow,

};