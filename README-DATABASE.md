# Database Setup Guide

This project uses **PostgreSQL** with **Prisma** on **Vercel**.

## Prerequisites

- PostgreSQL database (local or hosted on Vercel/other provider)
- `DATABASE_URL` environment variable configured

## Local Development Setup

1. **Set up your `.env.local` file:**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
   ```

2. **Generate Prisma Client:**
   ```bash
   npm run postinstall
   # or
   npx prisma generate
   ```

3. **Create and apply migrations:**
   ```bash
   npm run db:migrate
   ```
   This will create a new migration and apply it to your database.

4. **Seed initial data (optional):**
   ```bash
   npm run db:seed
   ```
   This will populate your database with default services and migrate any blogs from `data/blogs.json`.

## Vercel Deployment Setup

1. **Create initial migration (first time only):**
   ```bash
   npm run db:migrate
   ```
   This creates a migration file in `prisma/migrations/`. Commit this to your repository.

2. **Add environment variable in Vercel:**
   - Go to your project settings → Environment Variables
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Make sure it's available for Production, Preview, and Development environments

3. **Migrations run automatically:**
   - The build script includes `prisma migrate deploy` which will automatically apply pending migrations during deployment
   - After the first migration is committed, subsequent deployments will apply new migrations automatically

4. **After first deployment, seed data (if needed):**
   ```bash
   # Via Vercel CLI (if installed)
   vercel env pull .env.local
   npm run db:seed
   ```
   Or use Vercel's dashboard to run commands in your project's shell.

## Available Commands

- `npm run db:migrate` - Create and apply a new migration (development)
- `npm run db:migrate:deploy` - Apply pending migrations (production)
- `npm run db:push` - Push schema changes without creating migration (quick dev)
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Seed database with initial data

## Database Schema

The database includes two main models:

- **Blog** - Blog posts with Arabic content
- **Service** - Services offered by the business

See `prisma/schema.prisma` for the complete schema definition.

## Troubleshooting

### Connection Issues

- Verify `DATABASE_URL` is correctly set in `.env.local` (local) or Vercel environment variables (production)
- Check that your PostgreSQL database is accessible from your network/Vercel
- Ensure SSL is enabled if required (add `?sslmode=require` to connection string)

### Migration Issues

- If migrations fail, check that your database user has proper permissions
- Use `prisma migrate reset` (careful: deletes all data) to start fresh
- Check migration files in `prisma/migrations/` for errors

### Prisma Client Issues

- Run `npx prisma generate` to regenerate the client after schema changes
- Clear `.next` cache: `rm -rf .next` and rebuild
