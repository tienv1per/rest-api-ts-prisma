import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as BookService from "../book/book.service";

const router = express.Router();

// GET: list all the books
router.get("/", async(req: Request, res: Response) => {
    try {
        const books = await BookService.listBooks();
        return res.status(200).json(books);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET: get 1 unique book
router.get("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const book = await BookService.getBook(id);
        if(book) {
            return res.status(200).json(book);
        }
        return res.status(404).json("Book not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// POST: create a new book
router.post("/", 
    body("title").isString(),
    body("authorId").isInt(),
    body("datePublished").isDate(),
    body("isFiction").isBoolean(),
    async(req: Request, res: Response) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(404).json({
                errors: errors.array(),
            });
        }

        try {
            const book = req.body;
            const newBook = await BookService.createBook(book);
            return res.status(201).json(newBook); 
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
);

// UPDATE: update book
router.put("/:id",
    body("title").isString(),
    body("authorId").isInt(),
    body("datePublished").isDate().toDate(),
    body("isFiction").isBoolean(),
    async(req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({
                errors: errors.array(),
            });
        }

        const id: number = parseInt(req.params.id, 10);

        try {
            const book = req.body;
            const newBook = await BookService.updateBook(book, id);
            return res.status(201).json(newBook); 
        } catch (error: any) {
            return res.status(500).json(error.message);
        } 
    }
);

// DELETE: delete a book
router.delete("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    
    try {
        await BookService.deleteBook(id);
        return res.status(200).json("Deleted book successfully");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

export default router;