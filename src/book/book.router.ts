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
        return res.status(200).json(book);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// POST: create a new book
router.post("/", )


export default router;