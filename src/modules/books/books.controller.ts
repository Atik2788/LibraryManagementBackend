import { Request, Response } from "express";
import Book from "./books.model";
import { SortOrder } from "mongoose";

const createBook = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);

    res.send({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    // Handle Mongoose Validation Error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);

      return res.status(404).send({
        success: false,
        message: "Validation Error from create book",
        errors,
      });
    }

    // Handle other errors
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};


const getBook = async(req: Request, res: Response)=>{

    try {
        // console.log(req.query.filter);

        // for filter> start **********
        // for filter> start **********
        const filterString = req.query.filter as string;
        let filters:any = {};
        if(filterString){
           try {
             filters.genre = filterString
           } catch (error) {
            return res.status(400).json({
            success: false,
            message: "Invalid filter format. It should be JSON.",
            });
           }
        }
        // for filter> end **********
        // for filter> end **********


        // for sort> start **********
        // for sort> start **********
            const sortBy = (req.query.sortBy as string) || "createdAt"
            const sortDerection: SortOrder = (req.query.sort as string)?.toLowerCase() === 'asc' ? 1 : -1;
            const sortOption = {[sortBy]: sortDerection}
        // for sort> end **********
        // for sort> end **********


        // for limit> start **********
        // for limit> start **********
            const limit = req.query.limit ? parseInt(req.query.limit as string): 0;
        // for limit> end **********
        // for limit> end **********


        const data = await Book.find(filters).sort(sortOption).limit(limit);

        if(data.length === 0){

            res.send({
            success: true,
            message: "Filters value dont match any information...",
            data
                });

        }else{
            res.send({
            success: true,
            message: "Books retrieved successfully",
            data
                });
        }
        
    } catch (error) {
       res.send({
      success: false,
      message: "Something went wrong in get book data",
      error,
    })

}
}


const getBookById = async(req: Request, res: Response)=>{

    try {
        const data = await Book.findById(req.params.bookId)
        
        
    if(data === null){

            res.send({
            success: true,
            message: "This Id's book may be not in storage",
            data
                });

        }else{
            res.send({
            success: true,
            message: "Books got successfully",
            data,
            })       
        }    
      
    } catch (error) {
       res.send({
      success: false,
      message: "Something went wrong in get book data by id",
      error,
    })

}
}

const updateBookById = async(req: Request, res: Response)=>{
    try {

        const updateBookId = req.params.bookId;

        if(req.body.copies !== undefined){
          const copies = Number(req.body.copies);
          req.body.available = copies > 0 ? true : false
        }

        const data = await Book.findOneAndUpdate({_id: updateBookId}, req.body, {new: true})

        res.send({
        success: true,
        message: "Books updated successfully",
        data,
        });
        
    } catch (error) {
       res.send({
      success: false,
      message: "Something went wrong in updating book data",
      error,
    })}
}

const deleteBookById = async(req: Request, res: Response)=>{
    try {
        const deletedId = req.params.bookId;
        const data = await Book.deleteOne({_id: deletedId})

        res.send({
        success: true,
        message: "Books deleted successfully",
        data,
        });
        
    } catch (error) {
       res.send({
      success: false,
      message: "Something went wrong in deleting book data",
      error,
    })}
    
}

export const bookController = { createBook, getBook, getBookById, updateBookById, deleteBookById};
