# Todo List Application

A full-stack todo list application built with React (frontend) and Node.js/Express (backend) using Drizzle ORM and Neon PostgreSQL database.

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router DOM
- Axios for API calls
- Lucide React for icons
- Sonner for toast notifications

### Backend

- Node.js
- Express.js
- TypeScript
- Drizzle ORM
- Neon PostgreSQL DB
- CORS

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn
- A Neon PostgreSQL database account (free tier available at [neon.tech](https://neon.tech))

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd todo-list-wafer-assignment
   ```

2. Install dependencies for both client and server:

   **Client:**

   ```bash
   cd client
   npm install
   ```

   **Server:**

   ```bash
   cd ../server
   npm install
   ```

## Environment Setup

### Database Setup

1. Create a new project at [neon.tech](https://neon.tech)
2. Get your database connection string from the Neon dashboard
3. Create a `.env` file in the `server` directory:
   ```
   DATABASE_URL=your_neon_connection_string_here
   PORT=5000
   ```

### Frontend Environment

Create a `.env` file in the `client` directory:

```
VITE_API_URL=http://localhost:5000
```

## Database Migration

After setting up the database connection, run the migrations to create the tables:

```bash
cd server
npx drizzle-kit generate
npx drizzle-kit migrate
```

This will create the `todos` table in your Neon database.

## Running the Application

### Development Mode

1. **Start the backend server:**

   ```bash
   cd server
   npm run dev
   ```

   The server will run on `http://localhost:5000`

2. **Start the frontend client:**

   ```bash
   cd client
   npm run dev
   ```

   The client will run on `http://localhost:5173`

3. Open your browser and navigate to `http://localhost:5173` to use the application.

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Project Structure

```
todo-list-wafer-assignment/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions and API client
│   │   └── styles/         # Global styles
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── db/             # Database schema
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Main server file
│   ├── migrations/         # Database migrations
│   └── package.json
└── README.md
```

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as completed/incomplete
- ✅ Responsive design
- ✅ Real-time updates
- ✅ TypeScript for type safety
- ✅ Modern React with hooks
