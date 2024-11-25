const express = require("express");
const router = express.Router();
const prisma = require("../prisma"); // Ensure this points to your Prisma client

// GET all books
router.get("/", async (req, res, next) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (e) {
    next(e);
  }
});

// GET book by ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({ where: { id: +id } });
    if (book) {
      res.json(book);
    } else {
      next({ status: 404, message: `Book with id ${id} does not exist.` });
    }
  } catch (e) {
    next(e);
  }
});

// POST new book
router.post("/", async (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return next({ status: 400, message: "Title and author are required." });
  }
  try {
    const book = await prisma.book.create({ data: { title, author } });
    res.status(201).json(book);
  } catch (e) {
    next(e);
  }
});

// PUT update book
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, author } = req.body;
  if (!title || !author) {
    return next({ status: 400, message: "Title and author are required." });
  }
  try {
    const book = await prisma.book.findUnique({ where: { id: +id } });
    if (!book) {
      return next({ status: 404, message: `Book with id ${id} does not exist.` });
    }
    const updatedBook = await prisma.book.update({
      where: { id: +id },
      data: { title, author },
    });
    res.json(updatedBook);
  } catch (e) {
    next(e);
  }
});

// DELETE book by ID
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({ where: { id: +id } });
    if (!book) {
      return next({ status: 404, message: `Book with id ${id} does not exist.` });
    }
    await prisma.book.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;