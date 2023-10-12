const dynamoose = require('dynamoose');

const OnePieceCharacterSchema = new dynamoose.Schema({
  id: String, // character's ID
  name: String, // character's name
  epithet: String, // character's title
  bounty: Number, // character's bounty
  occupation: String, // character's occupation
  devilFruit: String, // character's Devil Fruit power
  crew: String, // character's pirate crew
  description: String, // short description of the character if needed
});

const OnePieceCharacterModel = dynamoose.model('OnePieceCharacter', OnePieceCharacterSchema);

module.exports = OnePieceCharacterModel;
