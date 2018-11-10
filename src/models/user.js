import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

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

export default Users;
