const { DynamoDbSchema, DynamoDbTable } = require('@aws/dynamodb-data-mapper');
const { v4 } = require('uuid');

class User {}

Object.defineProperties(User.prototype, {
  [DynamoDbTable]: {
    value: 'users',
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: 'String',
        keyType: 'HASH',
        defaultProvider: v4,
      },
      email: { type: 'String', keyType: 'HASH' },
      password: { type: 'String' },
      targetIDs: {
        type: 'Set',
        memberType: 'String',
        defaultProvider: () => [],
      },
      available: { type: 'Number', defaultProvider: () => 0 },
    },
  },
});

module.exports = User;
