This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Lab 2 - ASP.NET Core Web API & Axios

## 1. Overview

Lab 2 extends the OpenShelf Digital Library
application by integrating an ASP.NET Core backend
with a Microsoft SQL Server database.

The application supports CRUD operations for books
using Axios and RESTful API endpoints.

## 2. Technologies

- Frontend: Next.js 16, React, TypeScript
- HTTP Client: Axios
- Backend: ASP.NET Core Web API (.NET 10)
- ORM: Entity Framework Core 10
- Database: Microsoft SQL Server 2019
- Database Management: SSMS

## 3. Project Structure

- `app/` - Next.js pages
- `app/lab2/` - Book management interface
- `components/` - Reusable React components
- `backend/Controllers/` - ASP.NET Core controllers
- `backend/Models/` - Entity models
- `backend/Data/` - EF Core DbContext
- `backend/Migrations/` - EF Core migrations

## 4. API Endpoints

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | /api/books      | Get all books    |
| GET    | /api/books/{id} | Get a book by ID |
| POST   | /api/books      | Create a book    |
| PUT    | /api/books/{id} | Update a book    |
| DELETE | /api/books/{id} | Delete a book    |
| GET    | /api/health     | Check API status |

## 5. Database Configuration

Requirements:

- .NET SDK 10
- SQL Server 2019 or compatible
- EF Core CLI

The backend uses Windows Authentication for
local SQL Server development.

From the `backend` directory, configure the
connection string using .NET User Secrets:

```powershell
dotnet user-secrets init

dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Database=OpenShelfLab2;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;"
```

Adjust the connection string for your environment.

## 6. Entity Framework Core Migration

From the `backend` directory:

```powershell
dotnet restore
dotnet ef database update
```

Install the `dotnet-ef` tool if it is not available.
Use a version compatible with EF Core 10.

The existing migration creates the database
structure, including:

- Books
- \_\_EFMigrationsHistory

## 7. Run Backend

```powershell
cd backend
dotnet run --urls "http://localhost:5080"
```

API URL:

http://localhost:5080/api/books

## 8. Run Frontend

Open a separate terminal at the repository root.

```powershell
npm ci
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5080
```

Start Next.js:

```powershell
npm run dev
```

Lab 2 interface:

http://localhost:3000/lab2

## 9. CRUD Features

- GET: Display books from SQL Server.
- POST: Add new books.
- PUT: Update book information.
- DELETE: Remove existing books.

The frontend sends requests through Axios.
ASP.NET Core controllers process the requests,
and EF Core performs database operations.

## 10. Testing

All CRUD operations were tested locally.

Testing methods:

- PowerShell HTTP requests
- Next.js frontend with Axios
- ASP.NET Core API
- SQL Server Management Studio

Changes were verified directly in the SQL Server
Books table.

## 11. Notes

Lab 2 runs in a local development environment.

The hosted Next.js frontend cannot directly
access SQL Server running on localhost.

```

```
