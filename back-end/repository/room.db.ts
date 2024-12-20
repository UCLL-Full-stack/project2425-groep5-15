import { Room } from '../model/room';
import database from '../util/database';


const getAllRooms = async (): Promise<Room[]> => {
    try {
        const roomPrisma = await database.room.findMany();
        return roomPrisma.map((roomPrisma) => Room.from(roomPrisma));
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getRoomById = async (id: number): Promise<Room | null> => {
    try {
        const roomPrisma = await database.room.findUnique({
            where: {
                id: id,
            },
        });
        return roomPrisma ? Room.from(roomPrisma) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


export default {
    getAllRooms,
    getRoomById,
};