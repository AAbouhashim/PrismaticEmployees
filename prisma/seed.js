const prisma = require("../prisma");


const seed = async () => {
  const books = [
      { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { title: '1984', author: 'George Orwell' },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      { title: 'Pride and Prejudice', author: 'Jane Austen' },
      { title: 'Moby Dick', author: 'Herman Melville' },
      { title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
      { title: 'The Alchemist', author: 'Paulo Coelho' },
      { title: 'The Kite Runner', author: 'Khaled Hosseini' },
      { title: 'Jane Eyre', author: 'Charlotte Brontë' },
      { title: 'The Hobbit', author: 'J.R.R. Tolkien' }
    ];

    await prisma.book.createMany({data: books});
  };


seed()
  .then(async () => {
    console.log("Seeding Complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });