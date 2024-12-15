import e from 'express';
import {User} from '../model/user';
import database from '../util/database';


const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createUser = async ({firstName, lastName, username, email, password, role }: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                firstName,
                lastName,
                username,
                email,
                password,
                role
            }
        });
        return User.from(userPrisma);
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                email: email
            }
        });
        return userPrisma ? User.from(userPrisma) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                username: username
            }
        });
        return userPrisma ? User.from(userPrisma) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllUsers,
    createUser,
    getUserByEmail,
    getUserByUsername,
}