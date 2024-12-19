import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as bookService from "./bookService.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showForm = async (c) => {
  return c.html(
    eta.render("books.eta", { books: await bookService.listBooks() })
  );
};

const createBook = async (c) => {
  const body = await c.req.parseBody();

  const errors = {};

  if (typeof body.name !== 'string' || body.name.length < 3) {
    errors.name = ["The book name should be a string of at least 3 characters."];
  }

  if (isNaN(body.pages) || body.pages < 1 || body.pages > 1000) {
    errors.pages = ["The number of pages should be a number between 1 and 1000."];
  }

  if (typeof body.isbn !== 'string' || body.isbn.length !== 13) {
    errors.isbn = ["The ISBN should be a string of 13 characters."];
  }

  if (Object.keys(errors).length > 0) {
    return c.html(
      eta.render("books.eta", { 
        books: await bookService.listBooks(),
        errors,
        ...body 
      })
    );
  }

  await bookService.createBook(body);
  return c.redirect("/books");
};

const showBook = async (c) => {
  const id = c.req.param("id");
  return c.html(
    eta.render("book.eta", { book: await bookService.getBook(id) })
  );
};

const updateBook = async (c) => {
  const id = c.req.param("id");
  const body = await c.req.parseBody();
  await bookService.updateBook(id, body);
  return c.redirect(`/books/${id}`);
};

const deleteBook = async (c) => {
  const id = c.req.param("id");
  await bookService.deleteBook(id);
  return c.redirect("/books");
};

export { createBook, deleteBook, showForm, showBook, updateBook };