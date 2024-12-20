import {User} from '../../model/user';



test('given valid values, when creating a user, then it creates a user with those values', () => {
    const user = new User({
        id: 1,
        firstName: 'myFirstname',
        lastName: 'mylastname',
        username: 'myusername',
        email: 'myemail@gmail.com',
        password: 'mypassword',
        role: 'client'
    });

    expect(user.getId()).toEqual(1);
    expect(user.getFirstName()).toEqual('myFirstname');
    expect(user.getLastName()).toEqual('mylastname');
    expect(user.getUsername()).toEqual('myusername');
    expect(user.getEmail()).toEqual('myemail@gmail.com');
    expect(user.getPassword()).toEqual('mypassword');
    expect(user.getRole()).toEqual('client');
});

test('given a user without an id, when getting the id, then it returns undefined', () => {
    const user = new User({
        firstName: 'myFirstname',
        lastName: 'mylastname',
        username: 'myusername',
        email: 'myemail@gmail.com',
        password: 'mypassword',
        role: 'client'
    });

    expect(user.getId()).toBeUndefined();

});

test('given a user without a first name, when creating a user, then it throws an error', () => {
    const user = () => new User({
        firstName: '',
        lastName: 'mylastname',
        username: 'myusername',
        email: 'myemail@gmail.com',
        password: 'mypassword',
        role: 'client'
    });

    expect(user).toThrow("The user must have a first name");
})

test('given a user without a last name, when creating a user, then it throws an error', () => {
    const user = () => new User({
        firstName: 'myFirstname',
        lastName: '',
        username: 'myusername',
        email: 'myemail@gmail.com',
        password: 'mypassword',
        role: 'client'
    });

    expect(user).toThrow("The user must have a last name");
})




test('given a user without a username, when creating a user, then it throws an error', () => {
    const user = () => new User({
        firstName: 'myFirstname',
        lastName: 'mylastname',
        username: '',
        email: 'myemail@gmail.com',
        password: 'mypassword',
        role: 'client'

    });

    expect(user).toThrow("The user must have a name");

});

test('given a user without an email, when creating a user, then it throws an error', () => {
    const user = () => new User({
        firstName: 'myFirstname',
        lastName: 'mylastname',
        username: 'myusername',
        email: '',
        password: 'mypassword',
        role: 'client'
    });

    expect(user).toThrow("The user must have an email");

});

test('given a user without a password, when creating a user, then it throws an error', () => {
    const user = () => new User({
        firstName: 'myFirstname',
        lastName: 'mylastname',
        username: 'myusername',
        email: 'myemail@gmail.com',
        password: '',
        role: 'client'
    });

    expect(user).toThrow("The user must have a password");

});

test('given a user without a role, when creating a user, then it throws an error', () => {
    const user = () => new User({
        firstName: 'myFirstname',
        lastName: 'mylastname',
        username: 'myusername',
        email: 'myemail@gmail.com',
        password: "mypassword",
        role: null
    });

    expect(user).toThrow("The user must have a role");
})

test('given a user with a password shorter than 8 characters, when creating a user, then it throws an error', () => {
    const user = () => new User({
        firstName: 'myFirstname',
        lastName: 'mylastname',
        username: 'myusername',
        email: 'myemail@gmail.com',
        password: 'short',
        role: 'client'
    });

    expect(user).toThrow("The password must have at least 8 characters");

});

test('given a user with an invalid email format, when creating a user, then it throws an error', () => {
    const user = () => new User({
        firstName: 'myFirstname',
        lastName: 'mylastname',
        username: 'myusername',
        email: 'invalidemail',
        password: 'mypassword',
        role: 'client'
    });

    expect(user).toThrow("The email format is invalid");

});