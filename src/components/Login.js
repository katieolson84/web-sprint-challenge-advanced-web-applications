import React, { useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .form-container{
    width: 50%;
    border: .2rem solid #ececec;
    align-self: center;
    border-radius: 5px;
    padding: 1rem;
    color: #212529;
  }

  button {
    width: 40%;
  }

  form label{
    padding: 0;
  }
`

const InitialFormValues = {
  username: '',
  password: '',
}

const Login = (props) => {
  const [formValues, setFormValues] = useState(InitialFormValues);

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
   
    axiosWithAuth()
      .post('/login', formValues)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubble-page');
      })
      .catch((err) => {
        console.log("err: ", err)
      });
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  return (
    <Container>
      <h1>Welcome to the Bubble App!</h1>
      <Form className="form-container" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Username" 
            value={formValues.username}
            onChange={handleChange}
            name="username"
            />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Password" 
          value={formValues.password}
          onChange={handleChange}
          name="password"   
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.