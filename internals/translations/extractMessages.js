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
    // only key{id}
    return prepById(messages, { keys, prefix, base });
  } else if (filter === 'message') {
    // only id{message}
    // doesn't include module and page
    return prepByMessage(messages, { keys, prefix });
  } else if (filter === 'flatten') {
    // array of full message object [{id, message, description}]
    // doesn't include module and page
    return prepFlat(messages, { keys, prefix });
  } else if (filter === 'noDescription') {
    // keep structure, add id, remove description
    // { [key]: { message, description } } => { [key]: { id, message } }
    return prepNoDescription(messages, { keys, prefix, base });
  }
  // complete message object { [key]: { id, message, description } }
  // doesn't include module and page
  return prepByFull(messages, { keys, prefix });
}
