-- Create database if not exists
CREATE DATABASE IF NOT EXISTS laith_salmi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE laith_salmi;

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id VARCHAR(255) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  author VARCHAR(255) NOT NULL DEFAULT 'ليث السالمي',
  date DATE NOT NULL,
  category VARCHAR(255) NOT NULL DEFAULT 'تحليل فني',
  image VARCHAR(500) DEFAULT '/placeholder-blog.jpg',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_date (date),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

