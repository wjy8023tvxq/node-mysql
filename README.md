
# Node-MySQL CRUD API

A simple Node.js API to perform CRUD (Create, Read, Update, Delete) operations on a MySQL database, built with Express and MySQL2. The API uses query parameters (e.g., `?id=1`) to perform actions on specific users.

## Features

- **Get all users**: Retrieve a list of all users from the database.
- **Get a user by ID**: Retrieve a specific user using a query parameter (`?id=1`).
- **Add a new user**: Insert a new user into the database.
- **Update user details**: Update the details of a user specified by a query parameter (`?id=1`).
- **Delete a user**: Remove a user from the database using a query parameter (`?id=1`).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JiayiWu-MobilePractice/node-mysql.git
   cd node-mysql
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a MySQL database and run the provided SQL script to set up the tables:
   ```bash
   mysql -u your-username -p your-database < db_setup.sql
   ```

4. Create a `.env` file to store your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your-password
   DB_NAME=your-database
   ```

5. Start the server:
   ```bash
   node app.js
   ```

6. The API will be available at `http://localhost:4000`.

## Dependencies

The following dependencies are required for the project:
- **express**: `^4.19.2` (Web framework for Node.js)
- **mysql2**: `^3.11.0` (MySQL client for Node.js)
- **cors**: `^2.8.5` (Cross-origin resource sharing middleware)
- **dotenv**: `^16.4.5` (Loads environment variables from a `.env` file)

## API Endpoints

- **GET** `/users`: 
  - Retrieve all users from the database.
  - Retrieve a specific user by query parameter: `GET /users?id=1`.

- **POST** `/users`: 
  - Add a new user to the database. Requires `LastName`, `FirstName`, and optionally `Age` in the request body.

- **PUT** `/users?id=1`: 
  - Update user details. Provide `LastName`, `FirstName`, and/or `Age` in the request body. The `id` query parameter is required.

- **DELETE** `/users?id=1`: 
  - Delete a specific user from the database using the `id` query parameter.

## Query Parameters

- **id**: Used to specify a user for `GET`, `PUT`, and `DELETE` methods.
  Example: `GET /users?id=1`

## Environment Variables

- `DB_HOST`: MySQL host (default is `localhost`)
- `DB_USER`: MySQL user (default is `root`)
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: MySQL database name

## License

This project is licensed under the ISC License.
