# `createUser` Controller Documentation

## Description:
The `createUser` function is an asynchronous Express controller that creates a new user in the database if one does not already exist with the provided email. If a user with the same email already exists, it returns the existing user data.

## Endpoint:
- **HTTP Method**: `POST`
- **Route**: `/users`
  - **Request Body**:
    ```json
    {
      "email": "user@example.com"
    }
    ```
    - `email` (string): The email address of the user to be created or checked.

## Functionality:
1. **Input**:
   - Accepts the `email` from the request body.

2. **User Creation**:
   - The function first checks if an email is provided. If not, it returns a `400` status with an error message.
   - It then checks if a user already exists with the provided email using Prisma ORM's `findUnique` method.
   - If the user already exists, it returns the existing user with a `201` status.
   - If the user doesn't exist, it creates a new user in the `user` table using Prisma ORM's `create` method.

3. **Error Handling**:
   - If no email is provided, the controller responds with a `400` status and an error message: "Email is required".
   - If an internal error occurs during user creation or checking, a `500` status code with a generic error message is returned.

## Success Response:
- **Status Code**: `201 Created`
- **Body**: Returns the created or existing user in JSON format.
    ```json
    {
      "id": "user-id-1",
      "email": "user@example.com",
      "createdAt": "2025-01-30T10:10:00Z",
      "updatedAt": "2025-01-30T10:10:00Z"
    }
    ```

## Error Response:
- **Status Code**: `400 Bad Request`
- **Body**: Returns an error message when the email is not provided.
    ```json
    {
      "error": "Email is required"
    }
    ```

- **Status Code**: `500 Internal Server Error`
- **Body**: Returns a generic error message when an internal error occurs.
    ```json
    {
      "error": "Internal server error"
    }
    ```


