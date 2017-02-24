// since intelliJ isn't updated with the new js 'import'
// it required disabling syntax errors on files that use it.
// use this in other files to avoid needing to turn it off

const importAsync = (url) => import(`${url}`);

export default importAsync;
