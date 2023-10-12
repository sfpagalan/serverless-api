const { handler } = require('./index');
const OnePieceCharacterModel = require('./model');

describe('Update Lambda Function', () => {
  it('should update a record and return it with a 200 status code', async () => {
    const recordId = 'record-id';
    const requestBody = {
      name: 'Updated Name',
      epithet: 'New Epithet',
      bounty: 1000000000,
      occupation: 'Pirate Captain',
      devilFruit: 'Gomu Gomu no Mi',
      crew: 'Straw Hat Pirates',
      description: 'The captain of the Straw Hat Pirates',
    };

    const event = {
      pathParameters: {
        id: recordId,
      },
      body: JSON.stringify(requestBody),
    };

    OnePieceCharacterModel.get = jest.fn().mockResolvedValue({
      id: recordId,
      name: 'Old Name',
      epithet: 'Old Epithet',
      bounty: 500000000,
      occupation: 'Pirate',
      devilFruit: 'Unknown',
      crew: 'Unknown Crew',
      description: 'A mysterious character',
    });

    OnePieceCharacterModel.update = jest.fn().mockResolvedValue({ id: recordId, ...requestBody });

    const response = await handler(event, {});

    expect(response.statusCode).toBe(200);

    // expect the response body to contain the updated record
    const responseBody = JSON.parse(response.body);
    expect(responseBody).toEqual(expect.objectContaining(requestBody));
  });

  it('should handle non-existent record and return a 404 status code', async () => {
    const nonExistentRecordId = 'non-existent-record-id';
    const requestBody = {
      name: 'Updated Name',
      epithet: 'New Epithet',
      bounty: 1000000000,
      occupation: 'Pirate Captain',
      devilFruit: 'Gomu Gomu no Mi',
      crew: 'Straw Hat Pirates',
      description: 'The captain of the Straw Hat Pirates',
    };

    const event = {
      pathParameters: {
        id: nonExistentRecordId,
      },
      body: JSON.stringify(requestBody),
    };

    OnePieceCharacterModel.get = jest.fn().mockResolvedValue(null);

    const response = await handler(event, {});

    expect(response.statusCode).toBe(404);
  });

  it('should handle errors and return a 500 status code', async () => {
    const recordId = 'record-id';
    const requestBody = {
      name: 'Updated Name',
      epithet: 'New Epithet',
      bounty: 1000000000,
      occupation: 'Pirate Captain',
      devilFruit: 'Gomu Gomu no Mi',
      crew: 'Straw Hat Pirates',
      description: 'The captain of the Straw Hat Pirates',
    };

    const event = {
      pathParameters: {
        id: recordId,
      },
      body: JSON.stringify(requestBody),
    };

    OnePieceCharacterModel.get = jest.fn().mockRejectedValue(new Error('Simulated error'));

    const response = await handler(event, {});

    expect(response.statusCode).toBe(500);
  });
});
