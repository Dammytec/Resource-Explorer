This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


Rick & Morty Resource Explorer
A single-page Next.js + TypeScript app for exploring Rick & Morty characters with search, filtering, pagination, and favorites.
Built to demonstrate performant UI, clean state management, and URL-driven navigation.

## Getting Started

First, run the development server:

# 1. Clone the repository
git clone <your-repo-url>
cd <resource-explorer>

# 2. Install dependencie
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
http://localhost:3000


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Next.js (App Router) — routing, server rendering, and file-based structure

TypeScript — type safety & maintainability

Tailwind CSS — utility-first styling

TanStack Query — caching, background refetch, and request cancellation

lodash.debounce — optimized search input handling     Key Features

List View (/characters) with:

Debounced search bound to URL (?q=rick)

Status filter (alive, dead, unknown)

Pagination controls

Detail View (/characters/:id) with:

Character info

Favorite toggle

Favorites: Stored in localStorage via useFavorites hook Accessible from both list & detail views

Error Handling: Retry button on network failure Loading skeletons/placeholder states

URL as Source of Truth: State restored on reload or direct link

Supports back/forward navigation without losing context



