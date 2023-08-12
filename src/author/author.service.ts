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
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true,
        }
    });
    return author;
};

// sử dụng Omit để loại bỏ thuộc tính "id" từ kiểu Author. Tức là tham số author được truyền vào hàm không nên có thuộc tính "id".
export const createAuthor = async(author: Omit<Author, "id">): Promise<Author> => {
    const {firstName, lastName} = author;
    const createdAuthor = await db.author.create({
        data: {
            firstName: firstName,
            lastName: lastName,
        },
        select: {
            id: true,
            firstName: true, 
            lastName: true,
            createdAt: true
        }
    });
    return createdAuthor;
};

export const updateAuthor = async(author: Omit<Author, "id">, id: number): Promise<Author> => {
    const {firstName, lastName} = author;
    return db.author.update({
        where: {
            id: id,
        },
        data: {
            firstName: firstName,
            lastName: lastName,
        },
        select: {
            id: true,
            firstName: true, 
            lastName: true,
            createdAt: true
        }
    });
};

export const deleteAuthor = async(id: number) => {
    await db.author.delete({
        where: {
            id: id,
        }
    });
};