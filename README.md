# Node.js Express Starter Project

This is a starter project for building RESTful APIs with Node.js and Express.js. It includes basic CRUD operations for a user resource.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

3. The server will start on `http://localhost:3000`

## API Endpoints

- GET `/`: Welcome message
- GET `/api/users`: Get all users
- GET `/api/users/:id`: Get a single user
- POST `/api/users`: Create a new user
- PUT `/api/users/:id`: Update a user
- DELETE `/api/users/:id`: Delete a user

## Testing the API

You can use tools like cURL, Postman, or any HTTP client to test the API endpoints.

Example cURL commands:

1. Get all users:
   ```
   curl http://localhost:3000/api/users
   ```

2. Create a new user:
   ```
   curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice Johnson","email":"alice@example.com"}' http://localhost:3000/api/users
   ```

3. Update a user:
   ```
   curl -X PUT -H "Content-Type: application/json" -d '{"name":"Alice Smith"}' http://localhost:3000/api/users/3
   ```

4. Delete a user:
   ```
   curl -X DELETE http://localhost:3000/api/users/3
   ```

## Next Steps

- Add input validation
- Implement authentication and authorization
- Connect to a database (e.g., MongoDB, PostgreSQL)
- Write unit and integration tests
- Set up environment variables for configuration