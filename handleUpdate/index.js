const dynamoose = require('dynamoose');
const OnePieceCharacterModel = require('./model');

exports.handler = async (event, context) => {
  try {
    // get the ID of the record to be updated
    const recordId = event.pathParameters.id;

    // get the new data for the record from the request body
    const requestBody = JSON.parse(event.body);

    // check if the record exists in DynamoDB
    const existingRecord = await OnePieceCharacterModel.get(recordId);
    if (!existingRecord) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Record not found' }),
      };
    }

    // update the record in DynamoDB
    const updatedRecord = await OnePieceCharacterModel.update({ id: recordId }, requestBody); 

    // return the updated record
    return {
      statusCode: 200,
      body: JSON.stringify(updatedRecord),
    };
  } catch (error) {
    // handle any errors that occur during the operation
    console.error('Error updating the record:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating the record' }),
    };
  }
};
