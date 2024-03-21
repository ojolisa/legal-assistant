import React, { useContext, useState } from "react";
import styled from "styled-components";
import authcontext from "../context/authorization/Authcontext";

const Signup = () => {
  const context = useContext(authcontext);
  const { signup } = context;

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    signup(
      credentials.name,
      credentials.email,
      credentials.password,
      credentials.number
    );
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Logo src="/images/logo.jpg" alt="logo" />
      <LoginBox>
        <h2>Signup</h2>
        <Form onSubmit={handlesubmit}>
          <FormGroup>
            <InputLabel>Name:</InputLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              onChange={onChange}
              required
              name="name"
              minLength={3}
              value={credentials.name}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel>Email:</InputLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={onChange}
              required
              name="email"
              value={credentials.email}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel>Password:</InputLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              required
              onChange={onChange}
              name="password"
              minLength={5}
              value={credentials.password}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel>Mobile Number:</InputLabel>
            <Input
              type="number"
              placeholder="Enter your contact"
              required
              onChange={onChange}
              name="number"
              minLength={10}
              value={credentials.number}
            />
          </FormGroup>
          <SubmitButton type="submit">Signup</SubmitButton>
        </Form>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  background-color: #110f38;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  height: 4rem;
  width: 5rem;
  border-radius: 50%;
  margin-top: 30px;
`;

const LoginBox = styled.section`
  background-color: white;
  margin-top: 30px;
  height: auto;
  width: 25%;
  max-width: 400px;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #9523ac;
    position: relative;
    top: 10px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: #ff9900;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff6600;
  }
`;

export default Signup;
