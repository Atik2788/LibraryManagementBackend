import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema({
        book: {type: Schema.Types.ObjectId, ref: "Book", required: true},
        quantity: {type: Number, required: true},
        dueDate: {type: Date, required: true }
},
{
    timestamps: true
}
)

export const Borrow = model<IBorrow>("Borrow", borrowSchema);