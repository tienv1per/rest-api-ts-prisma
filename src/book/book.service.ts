import { db } from "../utils/db.server";
import type { Author } from "../author/author.service";

type BookRead = {
    id: number;
    title: string;
    datePublished: Date;
    isFiction: boolean;
    // authorId: number;
    author: Author; 
};

type BookWrite = {

};

export const listBooks = async(): Promise<BookRead[]> => {
    const bookList = await db.book.findMany({
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            },
            // authorId: true
        }
    });
    return bookList;
};

export const getBook = async(id: number): Promise<BookRead|null> => {
    const book = await db.book.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            },
        }
    });
    return book;
};