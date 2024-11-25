const express = require("express");
const app = express();
const booksRouter = require("./api/books");

// Middleware for parsing JSON
app.use(express.json());

// Books router
app.use("/books", booksRouter);

// 404 middleware
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
