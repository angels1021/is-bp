import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router/es';
import { logoutRequest } from 'api/login/actions';
import './style/style.scss';

class CR extends Component {

  constructor(props, context) {
    super(props, context);
    this._logout = this._logout.bind(this);
  }

  _logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div>
      Im CR!
        <nav>
          <Link to="/customers" >customers</Link>
        </nav>

        <button type="button" className="button alert" onClick={this._logout} >logout</button>

        <div className="cr-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

CR.propTypes = {
  children: PropTypes.node,
  logout: PropTypes.func.isRequired
};

CR.defaultProps = {
  children: PropTypes.node
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutRequest())
});

// const mapStateToProps = {};

export default connect(null, mapDispatchToProps)(CR);
