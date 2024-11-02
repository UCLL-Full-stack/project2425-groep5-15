import {User} from '../../model/user';



test('given valid values, when creating a user, then it creates a user with those values', () => {
    const user = new User({
        id: 1,
        name: 'myusername',
        email: 'myemail@gmail.com',
        password: 'mypassword'
    });

    expect(user.getId()).toEqual(1);
    expect(user.getname()).toEqual('myusername');
    expect(user.getEmail()).toEqual('myemail@gmail.com');
    expect(user.getpassword()).toEqual('mypassword');
});

test('given a user without an id, when getting the id, then it returns undefined', () => {
    const user = new User({
        name: 'myusername',
        email: 'myemail@gmail.com',
        password: 'mypassword'
    });

    expect(user.getId()).toBeUndefined();

});



test('given a user without a name, when creating a user, then it throws an error', () => {
    const user = () => new User({
        name: '',
        email: 'myemail@gmail.com',
        password: 'mypassword'
    });

    expect(user).toThrow("The user must have a name");

});

test('given a user without an email, when creating a user, then it throws an error', () => {
    const user = () => new User({
        name: 'myusername',
        email: '',
        password: 'mypassword'
    });

    expect(user).toThrow("The user must have an email");

});

test('given a user without a password, when creating a user, then it throws an error', () => {
    const user = () => new User({
        name: 'myusername',
        email: 'myemail@gmail.com',
        password: ''
    });

    expect(user).toThrow("The user must have a password");

});

test('given a user with a password shorter than 8 characters, when creating a user, then it throws an error', () => {
    const user = () => new User({
        name: 'myusername',
        email: 'myemail@gmail.com',
        password: 'short'
    });

    expect(user).toThrow("The password must have at least 8 characters");

});

test('given a user with an invalid email format, when creating a user, then it throws an error', () => {
    const user = () => new User({
        name: 'myusername',
        email: 'invalidemail',
        password: 'mypassword'
    });

    expect(user).toThrow("The email format is invalid");

});