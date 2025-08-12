# Rick & Morty Resource Explorer

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A single-page Next.js + TypeScript app for exploring Rick & Morty characters with search, filtering, pagination, and favorites.  
Built to demonstrate performant UI, clean state management, and URL-driven navigation.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Dammytec/Resource-Explorer.git
cd resource-explorer

2. Install dependencies
npm install

3. Run development server
npm run dev

Or you can use one of these:
yarn dev
pnpm dev
bun dev

4. Open in browser
Open http://localhost:3000 with your browser to see the result.

Technologies Used
Next.js (App Router) — routing, server rendering, and file-based structure

TypeScript — type safety & maintainability

Tailwind CSS — utility-first styling

TanStack Query — caching, background refetch, and request cancellation

lodash.debounce — optimized search input handling

Key Features
List View (/characters)
Debounced search bound to URL (?q=rick)

Status filter (alive, dead, unknown)

Pagination controls

Detail View (/characters/:id)
Character info

Favorite toggle

Favorites
Stored in localStorage via useFavorites hook

Accessible from both list & detail views

Error Handling
Retry button on network failure

Loading skeletons / placeholder states


