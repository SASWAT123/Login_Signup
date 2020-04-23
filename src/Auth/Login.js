import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Main from "../Main";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    console.log("email: ", this.state.email);
    console.log("password: ", this.state.password);

    const user = {
      username: this.state.email,
      password: this.state.password,
    };

    axios.post(`http://localhost:8080/authenticate`, user).then((res) => {
      console.log(res);
    });
  };

  isFormValid = ({ email, password }) => email && password;

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="code branch" color="orange" />
            Login To Spring Security
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={
                  errors.some((error) =>
                    error.message.toLowerCase().includes("email")
                  )
                    ? "error"
                    : ""
                }
                type="text"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Don't have an account? <Link to="/register">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
