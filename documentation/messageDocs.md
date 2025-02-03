# `getMessages` Controller Documentation

## Description:
The `getMessages` function is an asynchronous Express controller that retrieves all messages related to a specific conversation. The messages are ordered by the `createdAt` field in ascending order (oldest first).

## Endpoint:
- **HTTP Method**: `GET`
- **Route**: `/messages/:conversationId`
  - **URL Parameter**:
    - `conversationId` (string): The ID of the conversation whose messages are to be fetched.

## Functionality:
1. **Input**:
   - Accepts the `conversationId` from the URL parameter to identify which conversation's messages need to be retrieved.

2. **Fetching Messages**:
   - Uses the Prisma ORM's `findMany` method to retrieve all messages for the given `conversationId`.
   - The messages are ordered by the `createdAt` timestamp in ascending order (from the oldest message to the newest).

3. **Error Handling**:
   - If an error occurs during the process of fetching messages, it is caught, and an appropriate error response with a `500` status code is returned.
   - If the error is an instance of `Error`, the error message is returned; otherwise, a generic error message is sent.

## Success Response:
- **Status Code**: `200 OK`
- **Body**: Returns a list of messages in JSON format, ordered by creation time (oldest first).
    ```json
    [
      {
        "id": "message-id-1",
        "conversationId": "conversation-id",
        "isUser": true,
        "text": "Hello, how are you?",
        "createdAt": "2025-01-30T10:00:00Z",
        "updatedAt": "2025-01-30T10:00:00Z"
      },
      {
        "id": "message-id-2",
        "conversationId": "conversation-id",
        "isUser": false,
        "text": "I'm good, how can I assist you?",
        "createdAt": "2025-01-30T10:05:00Z",
        "updatedAt": "2025-01-30T10:05:00Z"
      }
    ]
    ```

## Error Response:
- **Status Code**: `500 Internal Server Error`
- **Body**: Returns an error message in JSON format.
    ```json
    {
      "error": "An unknown error occurred"
    }
    ```



# `createMessage` Controller Documentation

## Description:
The `createMessage` function is an asynchronous Express controller that creates a new message in a specific conversation. The message is saved to the database with the provided text and the sender's role (user or bot).

## Endpoint:
- **HTTP Method**: `POST`
- **Route**: `/messages/:conversationId`
  - **URL Parameter**:
    - `conversationId` (string): The ID of the conversation to which the message belongs.

  - **Request Body**:
    ```json
    {
      "text": "Hello, how are you?",
      "isUser": true
    }
    ```
    - `text` (string): The content of the message.
    - `isUser` (boolean): A flag indicating whether the message is sent by the user (`true`) or the bot (`false`).

## Functionality:
1. **Input**:
   - Accepts the `conversationId` from the URL parameter.
   - Accepts `text` and `isUser` from the request body. The `text` field contains the message content, and `isUser` indicates whether the message is from the user or the bot.

2. **Create Message**:
   - The Prisma ORM's `create` method is used to create a new message in the `message` table, linking it to the provided `conversationId`, and saving the message text and sender's role.

3. **Error Handling**:
   - If an error occurs during the process of creating the message, it is caught, and an appropriate error response with a `500` status code is returned.
   - If the error is an instance of `Error`, the error message is returned; otherwise, a generic error message is sent.

## Success Response:
- **Status Code**: `201 Created`
- **Body**: Returns the newly created message in JSON format.
    ```json
    {
      "id": "message-id-1",
      "conversationId": "conversation-id",
      "text": "Hello, how are you?",
      "isUser": true,
      "createdAt": "2025-01-30T10:10:00Z",
      "updatedAt": "2025-01-30T10:10:00Z"
    }
    ```

## Error Response:
- **Status Code**: `500 Internal Server Error`
- **Body**: Returns an error message in JSON format.
    ```json
    {
      "error": "An unknown error occurred"
    }
    ```

### Example:

#### Request:

