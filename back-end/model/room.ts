import { Room as RoomPrisma } from '@prisma/client';

export class Room {
    readonly id: number;
    readonly capacity: number;

    constructor(room: {id: number, capacity: number}) {
        this.validate(room);

        this.id = room.id;
        this.capacity = room.capacity;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getcapacity(): number {
        return this.capacity;
    }

    public validate(room: {capacity: number}) {

        if (!room.capacity) {
            throw new Error('The room must have a capacity');
        }


    }

    static from({id, capacity}: RoomPrisma) {
        return new Room({id, capacity});
    }


}

export default Room;