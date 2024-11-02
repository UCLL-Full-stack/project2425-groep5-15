import {Room} from '../..//model/room';

test('given valid values, when creating a room, then it creates a room with those values', () => {
    const room = new Room({
        id: 1,
        capacity: 100
    });

    expect(room.getId()).toEqual(1);
    expect(room.getcapacity()).toEqual(100);
});

test('given a room without an id, when getting the id, then it returns undefined', () => {
    const room = new Room({
        capacity: 100
    });

    expect(room.getId()).toBeUndefined();
});

test('given a room without a capacity, when creating a room, then it throws an error', () => {
    const room = () => new Room({
        capacity: 0
    });
    expect(room).toThrow("The room must have a capacity");
    
});