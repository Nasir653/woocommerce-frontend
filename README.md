# Woo Frontend

This is the frontend for the Woo project, built with React and Vite. It provides a user interface for authentication and product management, styled with Tailwind CSS.

## Features
- User registration and login
- Product listing, creation, and editing
- Protected routes for authenticated users
- Responsive UI with reusable components
- API integration with backend

## Project Structure
```
frontend/
  src/
    api/                # API utility
    components/         # UI components (atoms, molecules, organisms)
    middleware/         # Route protection
    pages/              # App pages (Login, Register, Products, ProductForm)
    utils/              # Utility functions (cookies)
    main.jsx            # App entry point
  App.jsx
  index.html
  package.json
  tailwind.config.js
  vite.config.js
  README.md
```

## Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License
MIT
