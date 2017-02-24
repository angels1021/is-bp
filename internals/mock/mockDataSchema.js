/* eslint-disable quote-props */
export const schema = {
  'type': 'object',
  'properties': {
    'user': {
      'type': 'object',
      'properties': {
        'id': {
          'type': 'number',
          'unique': true,
          'minimum': 1
        },
        'username': {
          'type': 'string',
          'faker': 'internet.userName'
        },
        'products': {
          'type': 'array',
          'minItems': 1,
          'maxItems': 10,
          'items': {
            'type': 'string',
            'faker': 'commerce.product'
          }
        }
      },
      required: ['id', 'username', 'products']
    }
  },
  required: ['user']
};
