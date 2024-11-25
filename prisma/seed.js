const prisma = require("../prisma");

const seed = async () => {
  const employees = [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Smith" },
    { firstName: "Alice", lastName: "Johnson" },
    { firstName: "Bob", lastName: "Brown" },
    { firstName: "Charlie", lastName: "Davis" },
    { firstName: "Diana", lastName: "Clark" },
    { firstName: "Eve", lastName: "Adams" },
    { firstName: "Frank", lastName: "Miller" },
    { firstName: "Grace", lastName: "Lee" },
    { firstName: "Hank", lastName: "White" },
  ];

  try {
    await prisma.employee.createMany({ data: employees });
    console.log("Seed data inserted successfully.");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

seed();