# API README

This README provides instructions for setting up, running, and using the Supabase database, which is built using Node.js and Express.js. The API allows you to perform basic CRUD (Create, Read, Update, Delete) operations on a "users" table in a Supabase database.

## Prerequisites

Before you can run the Supabase API, make sure you have the following prerequisites installed on your system:

- Node.js: You can download it from [nodejs.org](https://nodejs.org/).

## Getting Started

Follow these steps to set up and run the Supabase API:

1. Clone the repository:

   git clone https://github.com/your-username/your-repo.git

2. Navigate to the project directory:

   cd your-repo

3. Install the project dependencies:

   npm install

4. Create a `.env` file in the root directory of the project and add your Supabase URL and API Key as follows:

   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-api-key
   PORT=3000 # Optional: Customize the port if needed

   Replace `your-supabase-url` and `your-supabase-api-key` with your actual Supabase credentials.

5. Start the server:

   npm start

   The API will run on the specified port (default: 3000).

## Using the API

The Supabase API supports the following endpoints:

### 1. Fetch All Users (READ)

- **Endpoint:** `/api`
- **Method:** GET
- **Response:** Returns a JSON array of all users in the "users" table.

### 2. Fetch a User by ID or Name

- **Endpoint:** `/api/:params`
- **Method:** GET
- **Parameters:** `params` can be either a user's ID (integer) or name (string).
- **Response:** Returns a JSON object representing the user. Returns a 404 error if the user is not found.

### 3. Add a User

- **Endpoint:** `/api`
- **Method:** POST
- **Request Body:** Should contain a JSON object with a "name" field.
- **Response:** Returns the newly created user as a JSON object.

### 4. Add a User by Name

- **Endpoint:** `/api/:params`
- **Method:** POST
- **Parameters:** `params` should be a user's name (string).
- **Response:** Returns the newly created user as a JSON object.

### 5. Update a User

- **Endpoint:** `/api/:identifier`
- **Method:** PUT
- **Parameters:** `identifier` can be either a user's ID (integer) or name (string).
- **Request Body:** Should contain a JSON object with a "name" field.
- **Response:** Returns the updated user as a JSON object.

### 6. Delete a User

- **Endpoint:** `/api/:identifier`
- **Method:** DELETE
- **Parameters:** `identifier` can be either a user's ID (integer) or name (string).
- **Response:** Returns a 204 No Content status code upon successful deletion.

## Example API Requests

Here are some example API requests using [curl](https://curl.se/) for testing purposes:

### Fetch All Users

curl http://localhost:3000/api

### Fetch a User by ID

curl http://localhost:3000/api/1

### Fetch a User by Name

curl http://localhost:3000/api/johndoe

### Add a User


curl -X POST -H "Content-Type: application/json" -d '{"name": "newuser"}' http://localhost:3000/api


### Update a User by ID


curl -X PUT -H "Content-Type: application/json" -d '{"name": "updatedname"}' http://localhost:3000/api/1


### Delete a User by Name


curl -X DELETE http://localhost:3000/api/johndoe


## Error Handling

The API returns appropriate error responses with status codes and error messages for invalid requests or server errors.
## Conclusion

You have successfully set up and configured the API. You can now make HTTP requests to the provided endpoints to interact with user data in the Supabase database.
