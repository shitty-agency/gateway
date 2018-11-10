const {
  attribute,
  hashKey,
  table,
} = require('@aws/dynamodb-data-mapper-annotations');
@table('users')
class Users {
  @hashKey()
  id: string;

  @attribute()
  email: string;

  @attribute()
  password: string;

  @attribute({ memberType: { type: 'String' }, defaultProvider: () => [] })
  targetIDs: Array<string>;

  @attribute({ defaultProvider: () => 0 })
  available: number;
}

module.exports = Users;
