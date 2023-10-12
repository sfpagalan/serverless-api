const dynamoose = require('dynamoose');
const OnePieceCharacterModel = require('./model');

exports.handler = async (event, context) => {
  try {
    const recordId = event.pathParameters.id;

    // dynamoose will throw an error if the record doesn't exist
    const existingRecord = await OnePieceCharacterModel.get(recordId);
    if (!existingRecord) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Record not found' }),
      };
    }

    // delete the record from DynamoDB
    await OnePieceCharacterModel.delete(recordId);

    return {
      statusCode: 204,
      body: '',
    };
  } catch (error) {
    console.error('Error deleting the record:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error deleting the record' }),
    };
  }
};
