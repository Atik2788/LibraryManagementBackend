
import { Request, Response } from "express";
import Book from './../books/books.model';
import { Borrow } from "./borrow.model";


export const createBorrowBook = async (req: Request, res: Response) =>{
    try {
        const {book, quantity, dueDate} = req.body;

        // stock update in book model
        await Book.updateStockAfterBorrow(book, quantity)

        const data = await Borrow.create({book, quantity, dueDate})

        res.send({
        success: true,
        message: "Borrow updated successfully",
        data,
        });
        
    } catch (error:any) {
       res.status(400).json({
      success: false,
      message: error.message
    })}

}

export const getBorrwSummary = async(req: Request, res: Response)=>{
    try {
        const summary = await Borrow.aggregate([
            {
                $group:{
                    _id: "$book", // group with book id;
                    totalQuantity: {$sum: "$quantity"}
                }
            },
            {
                $lookup:{
                    from: "books", // get details from books collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project:{
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    }
                }
            }
        ])


        res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary
        });

    } catch (error: any) {
        res.status(500).json({
        success: false,
        message: error.message || "Failed to retrieve summary"
        });
    }
}





export const borrowController = {createBorrowBook, getBorrwSummary}