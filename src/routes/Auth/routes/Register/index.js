import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Register extends Component {

  constructor(props, context) {
    super(props, context);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(form, formProps) {
    const { valid, touched } = formProps;
    if (touched && valid) {
      const name = form.get('username');
      console.log('form submit', name);
    }
  }

  render() {
    return (
      <div>
        {'I\'m register'}
      </div>
    );
  }
}

// Register.propTypes = {
//   // prop: PropTypes.string.isRequired
// };

// const mapStateToProps = (state, ownProps) => ({});
//
// const mapDispatchToProps = (dispatch) => ({
//   // actions: bindActionCreators(???, dispatch)
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Register);

export default Register;
