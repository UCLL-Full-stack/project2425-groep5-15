export class Room {
    private id: number;
    private capacity: number;

    constructor(room: {id: number, capacity: number}) {
        this.id = room.id;
        this.capacity = room.capacity;
    }

    public getId(): number {
        return this.id;
    }

    public getcapacity(): number {
        return this.capacity;
    }


}

export default Room;