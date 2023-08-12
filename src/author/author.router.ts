import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";
import { listAuthor, getAuthor, createAuthor } from "./author.service";

const router = express.Router();

// GET list of all authors
router.get("/", async(req: Request, res: Response) => {
    try {
        const authors = await listAuthor();
        return res.status(200).json(authors);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET 1 unique author
router.get("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const author = await getAuthor(id);
        if(author){
            return res.status(200).json(author);
        }
        return res.status(404).json("Author not found");
        
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// CREATE 1 author
// params: 1st name, last name
router.post("/", 
    body("firstName").isString(),
    body("lastName").isString(),
    async(req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({
                errors: errors.array(),
            });
        }
        try {
            const author = req.body;
            const newAuthor = await createAuthor(author);
            return res.status(201).json(newAuthor);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
});

export default router;