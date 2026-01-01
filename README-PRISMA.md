# Prisma Database Setup

This project uses Prisma ORM to connect to a MySQL database.

## Environment Variables

Create a `.env.local` file in the root directory with your database connection URL:

```env
DATABASE_URL="mysql://username:password@host:port/database_name"
```

### Example for Remote Database:
```env
DATABASE_URL="mysql://user:password@db.example.com:3306/laith_salmi"
```

### Example for Local Database:
```env
DATABASE_URL="mysql://root:password@localhost:3306/laith_salmi"
```

## Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```
   (This runs automatically on `npm install` via postinstall script)

3. **Push schema to database (creates tables):**
   ```bash
   npm run db:push
   ```

4. **Run migration script (optional - to seed default services):**
   ```bash
   npm run migrate
   ```

## Database Schema

The Prisma schema defines two models:

- **Blog**: Blog posts with title, content, author, date, category, and image
- **Service**: Services with title, description, value proposition, and display settings

## Useful Commands

- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run migrate` - Run migration script to seed default data

## Vercel Deployment

1. Add `DATABASE_URL` to your Vercel environment variables
2. The build process will automatically run `prisma generate` during build
3. Run `npm run db:push` manually after first deployment to create tables

