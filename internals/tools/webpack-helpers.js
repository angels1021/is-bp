// check if module should be included in the vendor.js file
export function isVendor(module) {
  const context = module.context;

  // You can perform other similar checks here too.
  // Now we check just node_modules.
  return context && context.indexOf('node_modules') >= 0;
}
