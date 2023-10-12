const dynamoose = require('dynamoose');
const OnePieceCharacterModel = require('./model');

exports.handler = async (event, context) => {
  try {
    // query the database to get all records
    const records = await OnePieceCharacterModel.scan().exec();

    // return a successful response with all the records
    return {
      statusCode: 200,
      body: JSON.stringify(records),
    };
  } catch (error) {
    // handle any errors that occur during the operation
    console.error('Error reading records:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error reading records' }),
    };
  }
};
