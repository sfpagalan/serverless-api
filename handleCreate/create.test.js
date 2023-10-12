const { handler } = require('./index');
const OnePieceCharacterModel = require('./model');

describe('Create Lambda Function', () => {
  it('should create a record and return it', async () => {
    const event = {
      body: JSON.stringify({
        name: 'Roronoa Zoro',
        age: 27,
        epithet: 'Pirate Hunter',
        bounty: 120000000,
        occupation: 'Swordsman',
        devilFruit: 'None',
        crew: 'Straw Hat Pirates',
        description: 'The swordsman of the Straw Hat Pirates',
      }),
    };

    // dynamoose.model() is called in the handler, so we need to mock it
    OnePieceCharacterModel.create = jest.fn().mockResolvedValue(event.body);

    const response = await handler(event, {});

    const responseBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);

    expect(responseBody).toEqual(expect.objectContaining({
      name: 'Roronoa Zoro',
      age: 27,
      epithet: 'Pirate Hunter',
      bounty: 120000000,
      occupation: 'Swordsman',
      devilFruit: 'None',
      crew: 'Straw Hat Pirates',
      description: 'The swordsman of the Straw Hat Pirates',
    }));
  }, 10000);

  it('should handle errors and return a 500 status code', async () => {
    const event = {
      body: 'invalid-json',
    };

    const response = await handler(event, {});

    expect(response.statusCode).toBe(500);

    const responseBody = JSON.parse(response.body);
    expect(responseBody).toEqual(expect.objectContaining({
      message: 'Error creating the record',
    }));
  });
});
