export class Room {
    private id?: number;
    private capacity: number;

    constructor(room: {id?: number, capacity: number}) {
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

    private validate(room: {capacity: number}) {

        if (!room.capacity) {
            throw new Error('The room must have a capacity');
        }


    }


}

export default Room;