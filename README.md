# serverless-api

Create a single resource REST API using a domain model of your choosing, constructed using AWS Cloud Services.

## Routing: API Gateway

- This project utilizes AWS API Gateway for routing incoming HTTP requests to Lambda functions.
- It defines the following routes for the API:

  1. **Create One Piece Character:** (`POST /characters`) - Create a new One Piece character.
  2. **Update One Piece Character:** (`PUT /characters/{id}`) - Update an existing One Piece character by ID.
  3. **Get One Piece Characters:** (`GET /characters`) - Retrieve a list of all One Piece characters.
  4. **Delete One Piece Character:** (`DELETE /characters/{id}`) - Delete a One Piece character by ID.

## About the Server

- This serverless API project is designed to manage data related to One Piece characters.
- It is built using AWS Lambda functions, AWS DynamoDB for data storage, and AWS API Gateway to handle incoming HTTP requests.

### Server Code

- The server code is organized into several AWS Lambda functions, each responsible for specific CRUD operations on One Piece characters.
- The functions are written in Node.js and use the Dynamoose library for interacting with DynamoDB.

## Installation

- Clone the repository:

   ```bash
   git clone https://github.com/yourusername/serverless-api.git
   cd serverless-api
   `npm install`

## Usage

<!-- insert info if needed -->

## Deployed Links

<!-- insert info if needed -->

## Root URL

- https://api-url-placeholder.com

### API HTTP Path

- POST: https://api-url-placeholder.com/onepiece-characters
- PUT: https://api-url-placeholder.com/onepiece-characters/{id}
- GET: https://api-url-placeholder.com/onepiece-characters
- DELETE: https://api-url-placeholder.com/onepiece-characters/{id}

## Author

Sydney Mae Pagalan

## License

This project is licensed under the [License Name] License - see the [LICENSE.md](LICENSE.md) file for details.
