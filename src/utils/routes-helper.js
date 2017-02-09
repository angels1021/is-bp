export const loadModule = (cb) => (
  (module) => cb(null, module.default || module)
);

export const isReactComponent = (obj) => (
  Boolean(obj && obj.prototype && Boolean(obj.prototype.isReactComponent))
);


/**
 * @name getComponentByType
 * @description figure out if the component is a lazy loaded module or a react component.
 * meant for use with bundle-loader but can any function
 * that takes module loader function and loads the component
 *
 * example lazy:
 * import LazyComponent from './path/to/LazyComponent';
 * component(moduleLoader){
 *  addReduxActions()
 *  ...
 *
 *  LazyComponent(moduleLoader)
 * }
 *
 * example import:
 * component(moduleLoader){
 *  import('./path/to/Component')
 *    .then((module) => {
 *        addReduxActions()
 *        ...
 *        moduleLoader(module)
 *    })
 * }
 *
 * @param component
 * @return {Object}
 */
const getComponentByType = (component) => (
  isReactComponent(component)
    ? { component }
    : { getComponent: (loc, cb) => component(loadModule(cb)) }
);

/**
 * @name buildRoute
 * @description maps react-router values
 * @param path {String}
 * @param component {Function}
 * @param other {...} any other settings will be added
 * @return react-router simple-route definition object
 */
const buildRoute = ({ path, component, ...other }) => (
  {
    path,
    ...getComponentByType(component),
    ...other
  }
);

export default buildRoute;
