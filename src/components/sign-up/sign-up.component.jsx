import React from "react";

import { connect } from "react-redux";

import FormInput from "../form-imput/form-import.component";

import CustomButton from "../custom-button/custom-button.component";

import { signUpStart } from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      comfirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { signUpStart } = this.props;
    const { displayName, email, password, comfirmPassword } = this.state;

    if (password !== comfirmPassword) {
      alert("passwords don't match");
      return;
    }
    signUpStart({ displayName, email, password });
    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );

    //   await createUserProfileDocument(user, { displayName });

    //   this.setState({
    //     displayName: "",
    //     email: "",
    //     comfirmPassword: "",
    //     password: "",
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, comfirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an acconut</h2>
        <span>Signup with your email and password</span>
        <form className="sign-up-from" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            value={displayName}
            name="displayName"
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="comfirmPassword"
            value={comfirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  signUpStart: (signUpUser) => dispatch(signUpStart(signUpUser)),
});

export default connect(null, mapDispatchToProps)(SignUp);
