// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.show.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.room.deleteMany();
    await prisma.user.deleteMany();
    


    const inception= await prisma.movie.create({
        data: {
            title: "Inception",
            releaseDate: new Date("2010-07-16"),
            duration: 148,
            genres: ["Action", "Sci-Fi", "Thriller"]
        },
    });

    const matrix = await prisma.movie.create({
        data: {
            title: "The Matrix",
            releaseDate: new Date("1999-03-31"),
            duration: 136,
            genres: ["Action", "Sci-Fi"]
        }
    })

    const interstellar = await prisma.movie.create({
        data: {
            title: "Interstellar",
            releaseDate: new Date("2014-11-07"),
            duration: 169,
            genres: ["Adventure", "Drama", "Sci-Fi"]
        }
    })

    const room1 = await prisma.room.create({
        data: {
            id: 1,
            capacity: 100
        }
    })
    
    const room2 = await prisma.room.create({
        data: {
            id: 2,
            capacity: 120
        }
    })


    const show1 = await prisma.show.create({
        data: {
            start: new Date('2024-12-30T12:00:00'),
            end: new Date('2024-12-30T14:28:00'),
            movie: {
                connect: {id: inception.id}
            },
            room: {
                connect: {id: room1.id}
            }
        }
    })

    const show2 = await prisma.show.create({
        data: {
            start: new Date('2024-12-30T15:00:00'),
            end: new Date('2024-12-30T17:16:00'),
            movie: {
                connect: {id: matrix.id}
            },
            room: {
                connect: {id: room2.id}
            }
        }
    })

    const show3 = await prisma.show.create({
        data: {
            start: new Date('2024-12-31T18:00:00'),
            end: new Date('2024-12-31T20:49:00'),
            movie: {
                connect: {id: interstellar.id}
            },
            room: {
                connect: {id: room1.id}
            }
        }
    })

    const testUser = await prisma.user.create({
        data: {
            firstName: "Test",
            lastName: "User",
            username: "testuser",
            email: "test.user@gmail.com",
            password: await bcrypt.hash("testpassword", 12),
            role: "admin",
            tickets: {
                connect: [{id: show1.id}, {id: show1.id}, {id: show2.id}]
            }
        }
    })

    

    



    const clientUser = await prisma.user.create({
        data: {
            firstName: "Client",
            lastName: "User",
            username: "clientUser",
            email: "clientuser@gmail.com",
            password: await bcrypt.hash("clientPass", 12),
            role: "client"
        }
    })

    const plannerUser = await prisma.user.create({
        data: {
            firstName: "Planner",
            lastName: "User",
            username: "plannerUser",
            email: "planneruser@gmail.com",
            password: await bcrypt.hash("plannerPass", 12),
            role: "planner"
        }
    })

    const adminUser = await prisma.user.create({
        data: {
            firstName: "Admin",
            lastName: "User",
            username: "adminUser",
            email: "adminuser@gmail.com",
            password: await bcrypt.hash("adminPass", 12),
            role: "admin"
        }
    })

    



};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
