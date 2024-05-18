import {  useState } from "react";
import styled from "styled-components";
import { LoginModel } from "../models/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";


const FormWrapper = styled.form`
  width: 350px; /* Promenjeno na 300px */
  margin: 50px auto 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #7dbbee;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMsg = styled.span`
  color: #ff0000;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Login = () => {

 
 const [loginData, setLoginData] = useState<LoginModel>({
    email: "a@a",
    password: "11111111",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigation = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: any = {};

    if (!loginData.email) {
      validationErrors.email = "Email adresa je obavezna.";
    }

    if (!loginData.password) {
      validationErrors.password = "Lozinka je obavezna.";
    } else if (loginData.password.length < 8) {
      validationErrors.password = "Lozinka mora sadržati najmanje 8 karaktera.";
    }

    setErrors(validationErrors);

    try {
      const response = await userService.login(loginData);

      toast.success(" successful");
      localStorage.setItem("token", response);
      console.log(localStorage.getItem("token"));
      navigation("/dashboard");
    } catch (error) {
      toast.error(" error");
      console.error(" error:", error);
    }
  };
  const register = async () => {
    navigation("/registration");
  };
  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <h3>LOGIN FORM</h3>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
          {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
        </FormGroup>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button type="submit">Login</Button>
          <Button
            type="button"
            onClick={() => register()}
            className="accept-button"
          >
            Register
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default Login;
