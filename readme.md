
# 📚 Book Borrowing System

A simple Node.js and MongoDB-based book borrowing system built with TypeScript and Express.js. This system allows users to borrow books, updates stock, and provides a summary of borrowed books using aggregation.

---

## 🚀 Features

- 📖 Borrow books by providing book ID, quantity, and due date.
- 🧮 Automatically decreases available book copies after each borrow.
- ❌ Marks book as unavailable if all copies are borrowed.
- 📊 Aggregation endpoint to get summary of borrowed books.
- 🔁 Handles errors for invalid book IDs or unavailable stock.
- 🧪 Built using Express, MongoDB, Mongoose, and TypeScript.

---

## 📂 Project Structure

## 📁 Project Structure

## 📁 Project Structure

```bash
src/
├── server.ts
├── config/
│   └── index.ts
├── modules/
│   ├── books/
│   │   ├── books.controller.ts
│   │   ├── books.interface.ts
│   │   ├── books.model.ts
│   │   └── books.route.ts
│   ├── borrow/
│   │   ├── borrow.controller.ts
│   │   ├── borrow.interface.ts
│   │   ├── borrow.model.ts
│   │   └── borrow.route.ts
├── └── routes/
│       └── index.ts
```


## 🛠️ Getting Started

### ✅ Prerequisites

- Node.js v18+
- npm
- MongoDB installed locally or a cloud URI

---

### 🚀 Installation Steps

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-borrow-system.git
cd book-borrow-system
```


2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
Create a .env file in the root directory:
PORT=5000
DATABASE_URL=mongodb://localhost:5000/book-borrow
```
```bash
4. Compile TypeScript
npx tsc
```

5. Start the server
```bash
npm run dev
```

🧪 API Endpoints <br>
🔹 POST /api/borrow <br>
Purpose: Borrow a book
```bash
Request Body:
{
  "book": "BOOK_ID",
  "quantity": 2,
  "dueDate": "2025-07-30"
}
```
```bash
Response (Success):
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "borrowId",
    "book": "BOOK_ID",
    "quantity": 2,
    "dueDate": "2025-07-30T00:00:00.000Z"
  }
  ```



🔹 GET /api/borrow <br>
Purpose: Get borrowed books summary 
```bash
Response:
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

🧑‍💻 Technologies Used
```bash
Node.js
TypeScript
Express.js
MongoDB
Mongoose
```
🧑‍💻Links:
```bash
books:
create books, get data: api/books
get books by filter: api/books?filter=FANTASY&sortBy=updatedAt&sort=desc&limit=2
get books by id: api/books/688111e3f92e34c07882e917
update books by id: api/books/688111e3f92e34c07882e917
delete books by id: api/books/688111e3f92e34c07882e917

borrow:
create books, get data: api/borrow
```


✍️ Author <br>
Md. Atikur Rahman Shanta<br>
GitHub: @Atik2788<br>