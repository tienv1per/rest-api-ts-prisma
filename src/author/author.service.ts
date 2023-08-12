import { db } from "../utils/db.server";

type Author = {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: Date;
};

export const listAuthor = async(): Promise<Author[]> => {
    const authors = await db.author.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true,
        }
    });
    return authors;
};

export const getAuthor = async(id: number): Promise<Author|null> => {
    const author = await db.author.findUnique({
        where: {
            id: id,
        }
    });
    return author;
};