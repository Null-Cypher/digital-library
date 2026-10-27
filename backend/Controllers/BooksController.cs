using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenShelf.Api.Data;
using OpenShelf.Api.Models;

namespace OpenShelf.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/books
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
        var books = await _context.Books
            .AsNoTracking()
            .OrderBy(b => b.Id)
            .ToListAsync();

        return Ok(books);
    }

    // GET: api/books/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        var book = await _context.Books
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.Id == id);

        if (book == null)
        {
            return NotFound();
        }

        return Ok(book);
    }

    // POST: api/books
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook(
        [FromBody] Book book)
    {
        book.Id = 0;

        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetBook),
            new { id = book.Id },
            book
        );
    }

    // PUT: api/books/1
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateBook(
        int id, [FromBody] Book input)
    {
        if (id != input.Id)
        {
            return BadRequest("Book ID does not match.");
        }

        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        book.Title = input.Title;
        book.Author = input.Author;
        book.PublishYear = input.PublishYear;
        book.Topic = input.Topic;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/books/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
