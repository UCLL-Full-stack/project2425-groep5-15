import e from 'express';
import {User} from '../model/user';
import database from '../util/database';
import showDb from './show.db';



const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany(
            
        );
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
            },
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
            },
            include: {
                tickets: { 
                    include: {
                        movie: true,
                        room: true
                    }
                }
            }
        });
        return userPrisma ? User.from(userPrisma) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserTicketsById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                id: id
            },
            include: {
                tickets: { 
                    include: {
                        movie: true,
                        room: true
                    }
                }
            }
        });
        return userPrisma ? User.from(userPrisma) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                id: id
            }
        });
        return userPrisma ? User.from(userPrisma) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const addTicketToUser = async (username: string, showId: number): Promise<User> => {
    try {
        const updatedUser = await database.user.update({
            where: { username: username },
            data: {
                tickets: {
                    connect: { id: showId }
                }
            },
            include: {
                tickets: {
                    include: {
                        movie: true,
                        room: true
                    }
                }
            }
        });
        return User.from(updatedUser);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllUsers,
    createUser,
    getUserByEmail,
    getUserByUsername,
    getUserTicketsById,
    addTicketToUser,
    getUserById,
}