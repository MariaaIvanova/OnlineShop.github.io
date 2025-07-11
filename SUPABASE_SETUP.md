# Supabase Setup Guide

## Prerequisites
1. Create a Supabase project at https://supabase.com
2. Set up your database with the following table structure

## Database Setup

Create a `users` table in your Supabase database with the following structure:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  profilePic TEXT
);
```

## Environment Variables

Create a `.env` file in your project root with the following variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project dashboard under Settings > API.

## Authentication Flow

The application now uses Supabase for authentication:

1. **Signup**: Creates a user in both Supabase Auth and your custom users table
2. **Login**: Authenticates against your users table and Supabase Auth
3. **Session Management**: Automatically handles user sessions and persistence

## Security Notes

- In production, passwords should be hashed before storing in the database
- Consider using Supabase's built-in auth features for better security
- The current implementation stores passwords in plain text for simplicity 