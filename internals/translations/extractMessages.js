const getParams = (messages) => {
  const { MODULE, PAGE, ...rest } = messages;
  return {
    keys: Object.keys(rest),
    prefix: `${MODULE}.${PAGE}`,
    base: { MODULE, PAGE }
  };
};

const prepById = (messages, { keys, prefix, base }) => keys.reduce((collection, key) => {
  collection[key] = { id: `${prefix}.${key}` };  // eslint-disable-line no-param-reassign
  return collection;
}, base);
const prepByMessage = (messages, { keys, prefix }) => keys.reduce((collection, key) => {
  collection[`${prefix}.${key}`] = messages[key].defaultMessage;  // eslint-disable-line no-param-reassign
  return collection;
}, {});

const prepNoDescription = (messages, { keys, prefix, base }) => keys.reduce((collection, key) => {
  collection[key] = {  // eslint-disable-line no-param-reassign
    id: `${prefix}.${key}`,
    defaultMessage: messages[key].defaultMessage
  };
  return collection;
}, base);

const prepByFull = (messages, { keys, prefix }) => keys.reduce((collection, key) => {
  collection[key] = { id: `${prefix}.${key}`, ...messages[key] };  // eslint-disable-line no-param-reassign
  return collection;
}, {});

const prepFlat = (messages, { keys, prefix }) => keys.reduce((collection, key) => {
  collection.push({ id: `${prefix}.${key}`, ...messages[key] }); // eslint-disable-line no-param-reassign
  return collection;
}, []);

export default function extractMessages(messages, filter) {
  const { keys, prefix, base } = getParams(messages);
  if (filter === 'id') {
    return prepById(messages, { keys, prefix, base });
  } else if (filter === 'message') {
    return prepByMessage(messages, { keys, prefix });
  } else if (filter === 'flatten') {
    return prepFlat(messages, { keys, prefix });
  } else if (filter === 'noDescription') {
    return prepNoDescription(messages, { keys, prefix, base });
  }
  return prepByFull(messages, { keys, prefix });
}
