const createBook = async (book) => {
    book.id = crypto.randomUUID();
  
    const kv = await Deno.openKv();
    await kv.set(["books", book.id], book);
  };
  
  const listBooks = async () => {
    const kv = await Deno.openKv();
    const bookEntries = await kv.list({ prefix: ["books"] });
  
    const books = [];
    for await (const entry of bookEntries) {
      books.push(entry.value);
    }
  
    return books;
  };
  
  const getBook = async (id) => {
    const kv = await Deno.openKv();
    const book = await kv.get(["books", id]);
    return book?.value ?? {};
  };
  
  const updateBook = async (id, book) => {
    book.id = id;
    const kv = await Deno.openKv();
    await kv.set(["books", id], book);
  };
  
  const deleteBook = async (id) => {
    const kv = await Deno.openKv();
    await kv.delete(["books", id]);
  };
  
  export { createBook, deleteBook, getBook, listBooks, updateBook };  