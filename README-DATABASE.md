# Database Setup Guide

This project uses MySQL for storing blog posts and admin data.

## Prerequisites

- MySQL server installed and running
- Node.js and npm installed

## Installation

1. Install dependencies:
```bash
npm install
```

## Database Configuration

Create a `.env.local` file in the root directory with your database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=laith_salmi

# Admin Panel Password
ADMIN_PASSWORD=your_secure_password_here
```

## Database Setup

Run the database setup script to create the database and tables:

```bash
npm run setup-db
```

This will:
- Create the database `laith_salmi` if it doesn't exist
- Create the `blogs` table with proper schema
- Set up indexes for better performance

## Manual Setup (Alternative)

If you prefer to set up manually, you can run the SQL file directly:

```bash
mysql -u root -p < lib/db-setup.sql
```

Or copy the contents of `lib/db-setup.sql` and run it in your MySQL client.

## Database Schema

### blogs table
- `id` (VARCHAR) - Primary key
- `slug` (VARCHAR) - Unique URL slug
- `title` (VARCHAR) - Blog post title
- `excerpt` (TEXT) - Short description
- `content` (LONGTEXT) - Full blog content
- `author` (VARCHAR) - Author name
- `date` (DATE) - Publication date
- `category` (VARCHAR) - Blog category
- `image` (VARCHAR) - Image path
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

## Troubleshooting

### Connection Issues
- Make sure MySQL server is running
- Verify database credentials in `.env.local`
- Check if the database exists

### Migration from JSON

If you have existing blogs in `data/blogs.json`, you can migrate them automatically:

```bash
npm run migrate
```

This script will:
- Read all blogs from `data/blogs.json`
- Insert them into the MySQL database
- Skip duplicates (based on ID or slug)
- Show progress and summary

**Note:** Make sure to run `npm run setup-db` first to create the database tables.

