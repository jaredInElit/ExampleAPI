class BookLibrary{
    constructor(){
        this.books = [];
    }
    addBook(title, author, year) {
        const newBook = {title, author, year};
        this.books.push(newBook);
        return newBook;
    }

    getAllBooks(){
        return this.books;
    }

    findBookByTitle(title){
        return this.books.find(book => book.title === title);
    }

    deleteBookByTitle(title){
        this.books.splice(this.books.indexOf(book => book.title === title), 1);
    }
}
module.exports = BookLibrary;