// load default data into DB
// sử dụng Prisma để tạo dữ liệu mẫu cho cơ sở dữ liệu
// tạo và điền dữ liệu vào các bảng author và book trong cơ sở dữ liệu, với một số dữ liệu mẫu đã được định nghĩa trước
import { db } from "../src/utils/db.server";

// 3 other columns are added by DB by default nen ko can define here
type Author = {
    firstName: string;
    lastName: string;
};

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date; 
};

const seed = async() => {
    const authors = getAuthors();
    const books = getBooks();
    await Promise.all(
        authors.map((author) => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName
                }
            });
        })
    );
    const author = await db.author.findFirst({
        where: {
            firstName: "Britney",
        },
    });

    if(author){
        await Promise.all(
            books.map((book) => {
                const { title, isFiction, datePublished } = book;
                return db.book.create({
                    data: {
                        title,
                        isFiction,
                        datePublished,
                        authorId: author.id,
                    }
                });
            })
        );
    }
    else {
        console.log("Author not found");
    }


};

const getAuthors = (): Array<Author> => {
    return [
        {
            firstName: "John",
            lastName: "Cena"
        }, 
        {
            firstName: "Mike",
            lastName: "Tyson"
        }, 
        {
            firstName: "Britney",
            lastName: "Spears"
        }
    ];
}

const getBooks = (): Array<Book> => {
    return [
        {
            title: "Harry Potter",
            isFiction: true,
            datePublished: new Date(),
        }, 
        {
            title: "Twilight",
            isFiction: true,
            datePublished: new Date(),
        }, 
        {
            title: "Sans Famille",
            isFiction: false,
            datePublished: new Date(),
        }
    ];
}

seed();