import {Show} from '../../model/show';
import {Movie} from '../../model/movie';
import {Room} from '../../model/room';
import {User} from '../../model/user';
import exp from 'constants';


const movie = new Movie({
    id: 1,
    title: 'The Shawshank Redemption',
    releaseDate: new Date('1994-10-14'),
    duration: 142,
    genres: ['Drama']
});

const room = new Room({
    id: 1,
    capacity: 100
});

const user = new User({
    id: 1,
    name: 'myusername',
    email: 'myemail@gmail.com',
    password: 'mypassword'
});

test('given valid values, when creating a show, then it creates a show with those values', () => {
    const show = new Show({
        id: 1,
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: room
    });

    expect(show.getId()).toEqual(1);
    expect(show.getStart()).toEqual(new Date('2026-01-01T12:00:00'));
    expect(show.getEnd()).toEqual(new Date('2026-01-01T15:22:00'));
    expect(show.getMovie()).toEqual(movie);
    expect(show.getRoom()).toEqual(room);
    expect(show.getVisitors()).toEqual(new Map<User, number>());
});


test('given a show without an id, when getting the id, then it returns undefined', () => {
    const show = new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: room
    });

    expect(show.getId()).toBeUndefined();
});

test('given a show without a start, when creating a show, then it throws an error', () => {
    const show = () => new Show({
        start: undefined as unknown as Date,
        movie: movie,
        room: room
    });
    expect(show).toThrow("The show must have a start time");
    
});



test('given a show without a movie, when creating a show, then it throws an error', () => {
    const show = () => new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: undefined as unknown as Movie,
        room: room
    });
    expect(show).toThrow("The show must have a movie");
    
});

test('given a show without a room, when creating a show, then it throws an error', () => {
    const show = () => new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: undefined as unknown as Room
    });
    expect(show).toThrow("The show must have a room");
    
});

test('given a show without visitors, when getting the visitors, then it returns an empty map', () => {
    const show = new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: room
    });

    expect(show.getVisitors()).toEqual(new Map<User, number>());
});

test('given a show without visitors, when getting the total number of visitors, then it returns 0', () => {
    const show = new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: room
    });

    expect(show.getVisitorsTotal()).toEqual(0);
});

test('given a show with visitors, when getting the visitors, then it returns the visitors', () => {
    const show = new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: room
    });

    show.addVisitor(user, 2);

    expect(show.getVisitors()).toEqual(new Map([[user, 2]]));
});

test('given a show with visitors, when getting the total number of visitors, then it returns the total number of visitors', () => {
    const show = new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: room
    });

    show.addVisitor(user, 2);

    expect(show.getVisitorsTotal()).toEqual(2);
});

test('given a show with visitors, when getting the remaining seats, then it returns the remaining seats', () => {
    const show = new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: room
    });

    show.addVisitor(user, 2);

    expect(show.getRemainingSeats()).toEqual(98);
});

test('given a show with visitors, when adding a visitor with a negative number of seats, then it throws an error', () => {
    const show = new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: room
    });

    const addvis = () => show.addVisitor(user, -1);

    expect(addvis).toThrow("The number of seats must be greater than 0");
});

test('given a show with a user adding visitors twice, when getting the visitors, then it returns the map with the user key and the value as the sum of both added seats', () => {
    const show = new Show({
        start: new Date('2026-01-01T12:00:00'),
        movie: movie,
        room: room
    });

    show.addVisitor(user, 2);
    show.addVisitor(user, 3);

    expect(show.getVisitors()).toEqual(new Map([[user, 5]]));
    expect(show.getVisitorsTotal()).toEqual(5);
});

