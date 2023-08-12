import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./author/author.router";
import bookRouter from "./book/book.router";

dotenv.config();
const app = express();

const PORT: number = parseInt(process.env.PORT as string, 10);

app.use(cors());
app.use(express.json());
app.use("/api/authors", authRouter);
app.use("/api/books", bookRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});