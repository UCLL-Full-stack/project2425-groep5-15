import {User} from '../model/user';
import userDB from '../repository/user.db';
import {AuthenticationResponse, UserInput} from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import { get } from 'node:http';
import showDB from '../repository/show.db';


const getAllUsers = async (): Promise<User[]> => await userDB.getAllUsers();

const getUserByUsername = async (username: string): Promise<User> => {

    if (!username) {
        throw new Error('Username cannot be empty');
    }
    const response = await userDB.getUserByUsername(username);
    if (!response) {
        throw new Error('User with this username does not exist');
    }
    return response;
};


const createUser = async ({firstName, lastName, username, email, password, role }: UserInput): Promise<User> => {
    
    if (await userDB.getUserByEmail(email)) {
        throw new Error('This email is already in use');
    }

    if (await userDB.getUserByUsername(username)) {
        throw new Error('This username is already taken');
    }

    const hashedpassword = await bcrypt.hash(password, 12);
    const user = new User({firstName, lastName, username, email, password: hashedpassword, role});
    return userDB.createUser(user);
};

const authenticate = async ({username, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername(username);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    return {
        token: generateJwtToken({username, role: user.role}),
        username: user.username,
        fullname: `${user.firstName} ${user.lastName}`,
        role: user.role,
    };

}

const getUserTicketsById = async (id: number): Promise<User> => {
    if (!id) {
        throw new Error('Id cannot be empty');
    }
    const response = await userDB.getUserTicketsById(id);
    if (!response) {
        throw new Error('User with this id does not exist');
    }
    return response;

}

const addTicketToUser = async (username: string | undefined, showId: number): Promise<User> => {
    if (!username) {
        throw new Error('usename cannot be empty');
    }
    if (!showId) {
        throw new Error('Show id cannot be empty');
    }
    if (!await userDB.getUserByUsername(username)) {
        throw new Error('User with this id does not exist');
    }
    if (!await showDB.getShowById(showId)) {
        throw new Error('Show with this id does not exist');
    }
    const response = await userDB.addTicketToUser(username, showId );
    return response;
}




export default {
    getAllUsers,
    createUser,
    authenticate,
    getUserTicketsById,
    getUserByUsername,
    addTicketToUser,

}

