const dynamoose = require('dynamoose');
const OnePieceCharacterModel = require('./model');

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);

    // create a new item using the OnePieceCharacterModel
    const newItem = new OnePieceCharacterModel(requestBody);

    // save the new item to DynamoDB
    await newItem.save();

    return {
      statusCode: 201,
      body: JSON.stringify(newItem),
    };
  } catch (error) {
    console.error('Error creating the record:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating the record' }),
    };
  }
};
