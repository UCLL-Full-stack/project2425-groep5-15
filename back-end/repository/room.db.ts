import { Room } from '../model/room';

const rooms: Room[] = [
    new Room({id: 1, capacity: 100}),
    new Room({id: 2, capacity: 120}),
    new Room({id: 3, capacity: 90}),
    new Room({id: 4, capacity: 100}),
    new Room({id: 5, capacity: 100}),
];

const getAllRooms = (): Room[] => rooms;



export default {
    getAllRooms,
};