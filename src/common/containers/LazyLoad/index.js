import React from 'react';
import importAsync from '../../../utils/importAsync';

class LazilyLoad extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.load();
  }

  componentDidUpdate(previous) { // eslint-disable-line consistent-return
    if (this.props.modules === previous.modules) return null;
    this.load();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  load() {
    this.setState({
      isLoaded: false
    });

    const { modules } = this.props;
    const keys = Object.keys(modules);

    Promise.all(keys.map((key) => modules[key]()))
      .then((values) => (keys.reduce((agg, key, index) => {
        agg[key] = values[index]; // eslint-disable-line no-param-reassign
        return agg;
      }, {})))
      .then((result) => { // eslint-disable-line consistent-return
        if (!this._isMounted) return null;
        this.setState({ modules: result, isLoaded: true });
      });
  }

  render() {
    if (!this.state.isLoaded) return null;
    return React.Children.only(this.props.children(this.state.modules));
  }
}

// noinspection JSUnusedGlobalSymbols
export const LazilyLoadFactory = (Component, modules) => (
  (props) => (
    <LazilyLoad modules={modules}>
      {(mods) => <Component {...mods} {...props} />}
    </LazilyLoad>
  )
);

// noinspection JSUnusedGlobalSymbols
export const importLazy = (promise) => (
  promise.then((result) => result.default)
);

// noinspection JSUnusedGlobalSymbols
export const importLazyNamed = (path, name) => {
  importAsync(`bundle-loader?lazy&name=${name}!${path}`)
    .then((result) => result.default);
};

LazilyLoad.propTypes = {
  children: React.PropTypes.func.isRequired,
  modules: React.PropTypes.Object.isRequired
};

export default LazilyLoad;
