import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator";
import { listAuthor } from "./author.service";

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

export default router;