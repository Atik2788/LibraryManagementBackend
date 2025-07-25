import mongoose, { model, Schema } from "mongoose";
import { BookModel, IBook } from "./books.interface";

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: { type: String, required: [true, "Title missing"], trim: true },
    author: { type: String, required: [true, "Author missing"], trim: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Give an uniq isbn number"],
    },
    description: { type: String, trim: true },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// ✅ Static Method
bookSchema.statics.updateStockAfterBorrow = async function ( bookId: string, quantity: number) {

      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        throw new Error("Invalid book ID");
        }

  const book = await this.findById(bookId);
  if (!book) throw new Error("Book not found");
  if (book.copies < quantity) throw new Error("Not enough copies available");

  book.copies -= quantity;

//   if (book.copies === 0) {
//     book.available = false;
//   }

  await book.save();
};


bookSchema.pre('save', function(next){
    if(this.copies === 0){
        this.available = false;
    }
    next();
})



const Book = model<IBook, BookModel>("Book", bookSchema);
export default Book;
