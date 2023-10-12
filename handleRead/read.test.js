const { handler } = require('./index');
const OnePieceCharacterModel = require('./model');

describe('Read Lambda Function', () => {
  it('should retrieve and return records with a 200 status code', async () => {
    const sampleRecords = [
      {
        id: '1',
        name: 'Monkey D. Luffy',
        epithet: 'Straw Hat Captain',
        bounty: 150000000,
        occupation: 'Pirate Captain',
        devilFruit: 'Gomu Gomu no Mi',
        crew: 'Straw Hat Pirates',
        description: 'The main protagonist of One Piece',
      },
      {
        id: '2',
        name: 'Roronoa Zoro',
        epithet: 'Pirate Hunter',
        bounty: 120000000,
        occupation: 'Swordsman',
        devilFruit: 'None',
        crew: 'Straw Hat Pirates',
        description: 'The swordsman of the Straw Hat Pirates',
      },
    ];

    OnePieceCharacterModel.scan = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(sampleRecords) });

    const response = await handler({}, {});

    expect(response.statusCode).toBe(200);

    const responseBody = JSON.parse(response.body);
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBe(2);

    // assert that the response body contains the records
    responseBody.forEach((record, index) => {
      expect(record).toEqual(expect.objectContaining(sampleRecords[index]));
    });
  });

  it('should handle errors and return a 500 status code', async () => {
    OnePieceCharacterModel.scan = jest.fn().mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('Simulated error')) });

    const response = await handler({}, {});

    expect(response.statusCode).toBe(500);
  });
});
