# `getConversations` Controller Documentation

## Description:
The `getConversations` function is an asynchronous Express controller used to fetch a list of conversations associated with a specific user, identified by their email address. It retrieves the conversations from the database using Prisma and includes any related messages, ordered by the creation date in descending order.

## Endpoint:
- **HTTP Method**: `GET`
- **Route**: `/conversations/:userId`
  - **Path Parameter**:
    - `email` (string): The email of the user whose conversations need to be fetched.

## Functionality:
1. **Input**: Accepts the `email` parameter from the request URL.
2. **Database Query**: 
   - Uses Prisma's `findMany` method on the `conversation` model to fetch all conversations associated with the provided email.
   - Each conversation includes an array of `messages` associated with it.
   - The conversations are ordered by the `createdAt` field in descending order.
3. **Error Handling**:
   - Catches any error that occurs during the database query.
   - Responds with a 500 status code and an error message if an exception is thrown.
   - If the error is an instance of `Error`, it returns the error message, otherwise it returns a generic error message.

## Success Response:
- **Status Code**: `200 OK`
- **Body**:
  - Returns a JSON object containing an array of conversation objects, each including an array of messages. The structure is as follows:
    ```json
    [
      {
        "id": "string",
        "userEmail": "string",
        "messages": [
          {
            "id": "string",
            "content": "string",
            "senderEmail": "string",
            "createdAt": "timestamp"
          }
        ],
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ]
    ```

## Error Response:
- **Status Code**: `500 Internal Server Error`
- **Body**: Returns an error message in JSON format.
  ```json
  {
    "error": "An error message"
  }


# `createConversation` Controller Documentation

## Description:
The `createConversation` function is an asynchronous Express controller that creates a new conversation for a user. After creating the conversation, it automatically generates a bot message ("How may I help you?") in response. The function then fetches the conversation details along with the associated messages and returns the complete conversation data.

## Endpoint:
- **HTTP Method**: `POST`
- **Route**: `/conversations`
  - **Body**:
    - `userEmail` (string): The email of the user for whom the conversation is being created.

## Functionality:
1. **Input**: 
   - Accepts the `userEmail` parameter from the request body, which specifies the user for whom the new conversation will be created.
   
2. **Create Conversation**:
   - Uses Prisma to create a new `conversation` record in the database with the provided `userEmail`.

3. **Create Bot Message**:
   - After the conversation is created, a default bot message is created with the text "How may I help you?" and linked to the newly created conversation.

4. **Fetch Updated Conversation**:
   - After the conversation and the bot message are created, it retrieves the updated conversation along with its associated messages.

5. **Error Handling**:
   - If an error occurs during the process, it is caught and an appropriate response is sent with a `500` status code. 
   - If the error is an instance of `Error`, the error message is returned; otherwise, a generic error message is sent.

## Success Response:
- **Status Code**: `201 Created`
- **Body**: Returns a JSON object with the newly created conversation, including the bot's message. The structure is as follows:
    ```json
    {
      "id": "string",
      "userEmail": "string",
      "messages": [
        {
          "id": "string",
          "conversationId": "string",
          "isUser": false,
          "text": "How may I help you?",
          "createdAt": "timestamp",
          "updatedAt": "timestamp"
        }
      ],
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```

## Error Response:
- **Status Code**: `500 Internal Server Error`
- **Body**: Returns an error message in JSON format.
    ```json
    {
      "error": "An error message"
    }
    ```



# `deleteConversation` Controller Documentation

## Description:
The `deleteConversation` function is an asynchronous Express controller designed to delete a conversation and all associated messages from the database. Upon successful deletion, it responds with a `204 No Content` status, indicating that the deletion was successful, but there is no content to return.

## Endpoint:
- **HTTP Method**: `DELETE`
- **Route**: `/conversations/:conversationId`
  - **URL Parameter**:
    - `conversationId` (string): The ID of the conversation to be deleted.

## Functionality:
1. **Input**: 
   - Accepts the `conversationId` from the URL parameter to identify which conversation to delete.

2. **Delete Messages**:
   - First, the function deletes all messages associated with the conversation by querying the `message` model in the database where the `conversationId` matches the provided `conversationId`.

3. **Delete Conversation**:
   - After deleting the messages, the function deletes the conversation record itself from the `conversation` model using Prisma.

4. **Error Handling**:
   - If an error occurs during the deletion process, it is caught, and an appropriate error response with a `500` status code is returned.
   - If the error is an instance of `Error`, the error message is returned; otherwise, a generic error message is sent.

## Success Response:
- **Status Code**: `204 No Content`
- **Body**: No content returned.

## Error Response:
- **Status Code**: `500 Internal Server Error`
- **Body**: Returns an error message in JSON format.
    ```json
    {
      "error": "An error message"
    }
    ```


# `switchConversation` Controller Documentation

## Description:
The `switchConversation` function is an asynchronous Express controller that allows updating the `createdAt` timestamp of an existing conversation in the database. This effectively "switches" or refreshes the conversation's creation time, which might be useful in scenarios such as making a conversation "active" again or logging a new interaction.

## Endpoint:
- **HTTP Method**: `PATCH`
- **Route**: `/conversations/:conversationId`
  - **URL Parameter**:
    - `conversationId` (string): The ID of the conversation to be updated.

## Functionality:
1. **Input**:
   - Accepts the `conversationId` from the URL parameter to identify the conversation to update.

2. **Update the `createdAt` Field**:
   - The function updates the `createdAt` timestamp of the conversation to the current date and time using the Prisma ORM's `update` method.

3. **Error Handling**:
   - If an error occurs during the update process, it is caught, and an appropriate error response with a `500` status code is returned.
   - If the error is an instance of `Error`, the error message is returned; otherwise, a generic error message is sent.

## Success Response:
- **Status Code**: `200 OK`
- **Body**: The updated conversation object is returned in JSON format, including the new `createdAt` timestamp.
    ```json
    {
      "id": "conversation-id",
      "userEmail": "user@example.com",
      "createdAt": "2025-01-30T10:00:00Z",
      "updatedAt": "2025-01-30T10:00:00Z",
      "messages": [...]
    }
    ```

## Error Response:
- **Status Code**: `500 Internal Server Error`
- **Body**: Returns an error message in JSON format.
    ```json
    {
      "error": "An error message"
    }
    ```




