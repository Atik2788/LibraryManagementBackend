import { Router } from "express";
import { bookController } from "./books.controller";

const bookRoute = Router()

bookRoute.post('/', bookController.createBook)
bookRoute.get('/:bookId', bookController.getBookById)
bookRoute.put('/:bookId', bookController.updateBookById)
bookRoute.delete('/:bookId', bookController.deleteBookById)
bookRoute.get('/', bookController.getBook)

export default bookRoute;

