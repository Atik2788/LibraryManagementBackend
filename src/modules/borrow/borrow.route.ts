import { Router } from "express";
import { borrowController } from "./borrow.coltroller";

const borrowRoute  = Router()

borrowRoute.post('/', borrowController.createBorrowBook)
borrowRoute.get('/', borrowController.getBorrwSummary)


export default borrowRoute;