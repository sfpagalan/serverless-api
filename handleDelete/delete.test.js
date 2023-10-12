const { handler } = require('./index');
const OnePieceCharacterModel = require('./model');

describe('Delete Lambda Function', () => {
  it('should delete a record and return a 204 status code', async () => {
    // mock an API Gateway event with a valid record ID to delete
    const recordId = 'record-id';
    const event = {
      pathParameters: {
        id: recordId,
      },
    };

    // dynamoose.model() is called in the handler, so we need to mock it
    OnePieceCharacterModel.delete = jest.fn().mockReturnValue({});

    const response = await handler(event, {});

    expect(response.statusCode).toBe(204);

    // dynamoose.model() is called in the handler, so we need to assert that it was called with the correct arguments
    expect(OnePieceCharacterModel.delete).toHaveBeenCalledWith(recordId);
  });

  it('should handle non-existent record and return a 404 status code', async () => {
    // record ID that doesn't exist
    const nonExistentRecordId = 'non-existent-record-id';
    const event = {
      pathParameters: {
        id: nonExistentRecordId,
      },
    };

    // dynamoose.model() is called in the handler, so we need to mock it
    OnePieceCharacterModel.get = jest.fn().mockReturnValue(null);

    const response = await handler(event, {});

    expect(response.statusCode).toBe(404);
  });

  it('should handle errors and return a 500 status code', async () => {
    // mock an API Gateway event with a valid record ID to delete
    const recordId = 'record-id';
    const event = {
      pathParameters: {
        id: recordId,
      },
    };

    // mock the DynamoDB delete operation to simulate an error using OnePieceCharacterModel
    OnePieceCharacterModel.delete = jest.fn().mockImplementation(() => {
      throw new Error('Simulated error');
    });

    const response = await handler(event, {});

    expect(response.statusCode).toBe(500);
  });
});
