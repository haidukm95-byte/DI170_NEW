/* 
Daily Challenge: Building a Library System with TypeScript Classes and Interfaces

Instructions

Create a simple library system with TypeScript:

    Interface Book: Define an interface Book with the following properties:
        title (string)
        author (string)
        isbn (string)
        publishedYear (number)
        An optional genre property (string)

    Class Library: Create a class Library with:
        A private property books (array of Book).
        A public method addBook to add a new book to the library.
        A public method getBookDetails that returns details of a book based on the isbn.

    Class DigitalLibrary: Create a class DigitalLibrary that extends Library and adds:
        A readonly property website (string) for the library’s website.
        A public method listBooks that returns a list of all book titles in the library.

Create an instance of DigitalLibrary, add some books to it, and then print out the details of the books and the 
list of all book titles.
*/

interface Book{
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre?: string;
}

class Library{
    private books: Book[]=[];
    
    addBook(title: string, author: string, isbn: string, publishedYear: number, genre: string=''){
        this.books.push({title, author, isbn, publishedYear, genre}) 
    }

    getBookDetails(isbn: string): Book | undefined{
        return this.books.find(b=>b.isbn===isbn);
    }

    protected getBooks(): Book[] {
        return this.books;
    }
}

class DigitalLibrary extends Library{
    readonly website: string;

    constructor(website: string){
        super();
        this.website=website
    }

    listBooks(): string[] {
        return this.getBooks().map(b=>b.title);
    }
}

const book1: Book = { title: "1984", author: "George Orwell", isbn: "001", publishedYear: 1949, genre: "Dystopian" };
const book2: Book = { title: "Dune", author: "Frank Herbert", isbn: "002", publishedYear: 1965 }; // genre is optional
const book3: Book = { title: "Neuromancer", author: "William Gibson", isbn: "003", publishedYear: 1984, genre: "Cyberpunk" };

const myLibrary = new DigitalLibrary("https://mylibrary.com");

myLibrary.addBook(book1.title, book1.author, book1.isbn, book1.publishedYear, book1.genre);
myLibrary.addBook(book2.title, book2.author, book2.isbn, book2.publishedYear);
myLibrary.addBook(book3.title, book3.author, book3.isbn, book3.publishedYear, book3.genre);

console.log(myLibrary.getBookDetails("001"));
console.log(myLibrary.getBookDetails("002"));
console.log(myLibrary.getBookDetails("003"));

console.log(myLibrary.listBooks());

