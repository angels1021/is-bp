export const loadModule = (cb) => (
  (module) => cb(null, module.default || module)
);

export const isReactComponent = (obj) => (
  Boolean(obj && obj.prototype && Boolean(obj.prototype.isReactComponent))
);


/**
 * figure out if the component is a lazy loaded module or a react component.
 * meant for use with bundle-loader but can any function
 * that takes module loader function and loads the component
 *
 * @example <lazy>
 * import LazyComponent from './path/to/LazyComponent';
 * component(moduleLoader, injectors){
 *  injectors.injectReducer()
 *  ...
 *
 *  LazyComponent(moduleLoader)
 * }
 *
 * @example <import>
 * component(moduleLoader, injectors){
 *  import('./path/to/Component')
 *    .then((module) => {
 *        injectors.injectReducer()
 *        ...
 *        moduleLoader(module)
 *    })
 * }
 *
 * @param component
 * @param injectors {Object} store injectors functions to be passed down
 * @return {Object} Object containing the react component constructor
 */
const getComponentByType = (component, injectors) => (
  isReactComponent(component)
  ? { component }
  : { getComponent: (loc, cb) => component(loadModule(cb), injectors) }
);

/**
 * construct the final router objects defined in 'buildRoute'
 *
 * @param childRoutes {Array} array of routes' 'buildRoute' returns
 * @param injectors {Object} store injectors functions to be passed down
 * to all routes.
 * @return Object containing the childRoutes Array of react router
 * definition objects as child routes
 */
const mapChildRoutes = (childRoutes, injectors) => (
  (!childRoutes)
    ? {} :
    { childRoutes: childRoutes.map((route) => route(injectors)) }
);

/**
 * maps react-router values
 *
 * @param path {String}
 * @param component {Function}
 * @param childRoutes {Array} array of child routes' 'buildRoute' returns
 * @param other {...} any other settings will be added
 * @return {Function} -> function that accepts a store injectors
 *          object to be passed down to any route that might need it.
 */
const buildRoute = ({ path, component, childRoutes, ...other }) => (injectors) => (
  {
    path,
    ...((component) ? getComponentByType(component, injectors) : {}),
    ...mapChildRoutes(childRoutes, injectors),
    ...other
  }
);

export default buildRoute;
