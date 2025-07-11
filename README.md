# 3D Shop with Authentication

A beautiful online shop with 3D product models and user authentication system.

## Features

- **3D Product Viewer**: Interactive 3D models for products
- **User Authentication**: Login and signup system
- **Shopping Cart**: Add items to cart (requires authentication)
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Beautiful gradient design with smooth animations

## Authentication System

The app includes a complete authentication system powered by Supabase that:

- **Requires login to add items to cart**: Users must be logged in to add products to their shopping cart
- **Persistent sessions**: User sessions are managed by Supabase Auth
- **Real database**: User data is stored in a Supabase PostgreSQL database
- **User profiles**: Display user username and profile picture in the header

### Setup Required

Before running the application, you need to:

1. **Create a Supabase project** at https://supabase.com
2. **Set up the database** with the required table structure (see SUPABASE_SETUP.md)
3. **Configure environment variables** with your Supabase credentials
4. **Enable authentication** in your Supabase project settings

### How to Use

1. **Browse Products**: View products and their 3D models
2. **Login Required**: When you try to add an item to cart, you'll be prompted to login
3. **Login/Signup**: Use the login button in the header or the modal that appears
4. **Add to Cart**: Once logged in, you can add items to your cart
5. **User Profile**: Click on your avatar in the header to access logout and settings

## Getting Started

1. **Set up Supabase** (see SUPABASE_SETUP.md for detailed instructions):
   - Create a Supabase project
   - Set up the users table
   - Get your project URL and anon key

2. **Configure environment variables**:
   Create a `.env` file in the project root:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to the local development URL

## Technology Stack

- **React 18** with TypeScript
- **Supabase** for authentication and database
- **Styled Components** for styling
- **Framer Motion** for animations
- **Three.js** with React Three Fiber for 3D graphics
- **Lucide React** for icons
- **Vite** for build tooling

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header with auth
│   ├── LoginModal.tsx  # Login/signup modal
│   ├── ProductCard.tsx # Product display card
│   ├── ProductGrid.tsx # Product grid layout
│   ├── Cart.tsx        # Shopping cart
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── types/              # TypeScript type definitions
└── data/               # Static data
```

## Authentication Flow

1. User clicks "Add to Cart" on a product
2. If not logged in, login modal appears
3. User can either login with existing account or create new account
4. After successful authentication, user can add items to cart
5. User session is managed by Supabase Auth and persists across browser sessions
6. User can logout via the profile dropdown in header
7. User data is stored in Supabase PostgreSQL database 