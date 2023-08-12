import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";
import * as AuthService from "./author.service";

const router = express.Router();

// GET list of all authors
router.get("/", async(req: Request, res: Response) => {
    try {
        const authors = await AuthService.listAuthor();
        return res.status(200).json(authors);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET 1 unique author
router.get("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const author = await AuthService.getAuthor(id);
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
            const newAuthor = await AuthService.createAuthor(author);
            return res.status(201).json(newAuthor);
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
});

// UPDATE author
router.put("/:id", 
    body("firstName").isString(),
    body("lastName").isString(),
    async(req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({
                errors: errors.array(),
            });
        }

        const id: number = parseInt(req.params.id, 10);

        try {
            const author = req.body;
            const updatedAuthor = await AuthService.updateAuthor(author, id);
            return res.status(200).json(updatedAuthor);
        } catch (error: any) {
            return res.status(500).json(error.message);            
        }        
    }    
);

// DELETE author 
router.delete("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        await AuthService.deleteAuthor(id);
        return res.status(200).json("Deleted author successfully");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

export default router;