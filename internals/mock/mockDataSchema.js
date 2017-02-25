/* eslint-disable quote-props */
export const schema = {
  'type': 'object',
  'properties': {
    'users': {
      type: 'array',
      'minItems': 3,
      'maxItems': 10,
      'items': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'number',
            'unique': true,
            'minimum': 1
          },
          'uuid': {
            'type': 'string',
            'faker': 'random.uuid',
            'unique': true
          },
          'first_name': {
            'type': 'string',
            'faker': 'ps.firstName'
          },
          'last_name': {
            'type': 'string',
            'faker': 'ps.lastName'
          },
          'username': {
            'type': 'string',
            'faker': 'ps.userName',
            'unique': true
          },
          'password': {
            'type': 'string',
            'faker': 'ps.password'
          },
          'role': {
            'type': 'string',
            'faker': 'ps.role'
          }
        },
        required: ['id', 'uuid', 'first_name', 'last_name', 'username', 'password', 'role']
      }
    }
  },
  required: ['users']
};
