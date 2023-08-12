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
    title: string;
    datePublished: Date;
    authorId: number;
    isFiction: boolean;
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

export const createBook = async(book: BookWrite): Promise<BookRead> => {
    const {title, authorId, datePublished, isFiction} = book;
    const parseDate: Date = new Date(datePublished);
    const createdBook = await db.book.create({
        data: {
            title: title,
            authorId: authorId,
            isFiction: isFiction,
            datePublished: parseDate,
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
    return createdBook;
};

export const updateBook = async(book: BookWrite, id: number): Promise<BookRead> => {
    const {title, authorId, datePublished, isFiction} = book;
    return db.book.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            isFiction: isFiction,
            datePublished: datePublished,
            authorId: authorId
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
};

export const deleteBook = async(id: number): Promise<void> => {
    await db.book.delete({
        where: {
            id: id,
        }
    });
};