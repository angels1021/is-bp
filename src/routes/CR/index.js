import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router/es';
import { logout } from 'api/auth/actions';
import { selectUserId } from 'api/auth/selectors';
import './style/style.scss';

class CR extends Component {

  constructor(props, context) {
    super(props, context);
    this._logout = this._logout.bind(this);
  }

  _logout(e) {
    e.preventDefault();
    this.props.logout(this.props.userId);
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
  logout: PropTypes.func.isRequired,
  userId: PropTypes.number
};

CR.defaultProps = {
  children: PropTypes.node,
  userId: null
};

const mapDispatchToProps = (dispatch) => ({
  logout: (userId) => dispatch(logout(userId))
});

const mapStateToProps = (state) => ({
  userId: selectUserId(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CR);
