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
    firstName: 'myfirstname',
    lastName: 'mylastname',
    username: 'myusername',
    email: 'myemail@gmail.com',
    password: 'mypassword',
    role: 'client'
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
    expect(show.getEnd()).toEqual(new Date('2026-01-01T14:22:00'));
    expect(show.getMovie()).toEqual(movie);
    expect(show.getRoom()).toEqual(room);
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

