import { Room } from '../model/room';
import database from '../util/database';


const getAllRooms = async (): Promise<Room[]> => {
    const roomPrisma = await database.room.findMany();
    return roomPrisma.map((roomPrisma) => Room.from(roomPrisma));
}

export default {
    getAllRooms,
};