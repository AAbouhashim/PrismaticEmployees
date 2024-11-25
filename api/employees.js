const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

// Get all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (e) {
    next(e);
  }
});

// Get employee by ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (!employee) {
      return next({ status: 404, message: `Employee with ID ${id} not found.` });
    }
    res.json(employee);
  } catch (e) {
    next(e);
  }
});

// Add a new employee
router.post("/", async (req, res, next) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return next({
      status: 400,
      message: "Both firstName and lastName must be provided.",
    });
  }
  try {
    const employee = await prisma.employee.create({ data: { firstName, lastName } });
    res.status(201).json(employee);
  } catch (e) {
    next(e);
  }
});

// Update employee
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return next({
      status: 400,
      message: "Both firstName and lastName must be provided.",
    });
  }

  try {
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (!employee) {
      return next({ status: 404, message: `Employee with ID ${id} not found.` });
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id: +id },
      data: { firstName, lastName },
    });
    res.json(updatedEmployee);
  } catch (e) {
    next(e);
  }
});

// Delete employee
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({ where: { id: +id } });
    if (!employee) {
      return next({ status: 404, message: `Employee with ID ${id} not found.` });
    }

    await prisma.employee.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;