# Kyokara Shopping

Kyokara Shopping is an basic e-commerce web app for browsing products, creating an account, and managing a wishlist.

## Features

- Browse featured and paginated products, search the catalog, and view product details.
- Register and sign in to manage a personal wishlist.
- JSON API routes for products, users, and wishlists.

## Tech stack

- Next.js 16 (App Router) and React 19
- TypeScript and Tailwind CSS
- MongoDB
- JWT-based authentication

The package is currently version `0.1.0` and requires Node.js `26.x`.

## Getting started

1. Install Node.js 26 and make sure MongoDB is available.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:

   ```dotenv
   MONGODB_URI=mongodb://127.0.0.1:27017
   JWT_SECRET=replace-with-a-long-random-secret
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   `MONGODB_URI` should point to your MongoDB deployment; the app uses the `kyokara_shop` database. Set `NEXT_PUBLIC_BASE_URL` to the app's public base URL when running outside local development.

4. Ensure the database contains product data, then start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## API overview

| Route | Purpose |
| --- | --- |
| `/api/products` | List products with pagination |
| `/api/products/featured` | Get featured products |
| `/api/products/search?keyword=...` | Search products |
| `/api/products/[slug]` | Get a product by slug |
| `/api/users/register` | Register an account |
| `/api/users/login` | Sign in |
| `/api/wishlist` | Read, add, or remove wishlist entries |

Wishlist operations use the current user's ID in the `x-user-id` request header.
