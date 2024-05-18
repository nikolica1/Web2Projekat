import { useState } from "react";
import styled from "styled-components";
import { Register } from "../models/user";


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

const Registration = () => {
  const [registrationData, setRegistrationData] = useState<Register>({
    username: "Administrator",
    email: "a@a",
    password: "11111111",
    firstName: "A",
    lastName: "A",
    birthday: "",
    address: "Bulevar Oslobodjenja",
    picture: "",
    role: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      setSelectedFileName(file.name);
      setRegistrationData((prevData) => ({ ...prevData, file }));
    }
  };
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState("User");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigation = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: any = {};

    // Validacija za svako polje
    if (!registrationData.username) {
      validationErrors.username = "Korisničko ime je obavezno.";
    }

    if (!registrationData.email) {
      validationErrors.email = "Email adresa je obavezna.";
    }

    if (!registrationData.password) {
      validationErrors.password = "Lozinka je obavezna.";
    } else if (registrationData.password.length < 6) {
      validationErrors.password = "Lozinka mora sadržati najmanje 6 karaktera.";
    }

    if (!registrationData.firstName) {
      validationErrors.firstName = "Ime je obavezno.";
    }

    if (!registrationData.lastName) {
      validationErrors.lastName = "Prezime je obavezno.";
    }

    if (!registrationData.birthday) {
      validationErrors.birthday = "Datum rođenja je obavezan.";
    }

    if (!registrationData.address) {
      validationErrors.address = "Adresa je obavezna.";
    }

    if (!registrationData.picture) {
      validationErrors.picture = "Slika je obavezna.";
    }

    if (!registrationData.role) {
      validationErrors.role = "Rola je obavezna.";
    }
  
    setErrors(validationErrors);

    try {
      const formData: FormData = new FormData();

      formData.append("address", registrationData.address);
      formData.append("birthday", registrationData.birthday.toString());
      formData.append("email", registrationData.email);
      formData.append("firstName", registrationData.firstName);
      formData.append("lastName", registrationData.lastName);
      formData.append("password", registrationData.password);
      formData.append("file", selectedFile as File);
      formData.append("role", selectedOption);
      formData.append("username", registrationData.username);

      const response = await userService.register(formData);

      toast.success("Registration successful");
      console.log("Registration successful:", response.data);
      navigation("/login");
    } catch (error) {
      toast.error("Registration error");
      console.error("Registration error:", error);
    }
  };
  const login = async () => {
    navigation("/login");
  };
  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <h3>REGISTRATION FORM </h3>
        <FormGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={registrationData.username}
            onChange={handleInputChange}
          />
          {errors.username && <ErrorMsg>{errors.username}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={registrationData.email}
            onChange={handleInputChange}
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={registrationData.password}
            onChange={handleInputChange}
          />
          {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
        </FormGroup>

        <FormGroup>
          <Label>First Name:</Label>
          <Input
            type="text"
            name="firstName"
            value={registrationData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <ErrorMsg>{errors.firstName}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label> Last Name:</Label>
          <Input
            type="text"
            name="lastName"
            value={registrationData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <ErrorMsg>{errors.lastName}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Birthday:</Label>
          <Input
            type="date"
            name="birthday"
            value={registrationData.birthday}
            onChange={handleInputChange}
          />
          {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Address:</Label>
          <Input
            type="text"
            name="address"
            value={registrationData.address}
            onChange={handleInputChange}
          />
          {errors.address && <ErrorMsg>{errors.address}</ErrorMsg>}
        </FormGroup>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <label>
            <input
              type="radio"
              value="User"
              checked={selectedOption === "User"}
              onChange={handleOptionChange}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="Driver"
              checked={selectedOption === "Driver"}
              onChange={handleOptionChange}
            />
            Driver
          </label>
        </div>

        <FormGroup>
          <Label>Picture:</Label>
          <Input type="file" name="file" onChange={handleFileChange} />
          {selectedFileName && <div>{selectedFileName}</div>}
          {errors.address && <ErrorMsg>{errors.address}</ErrorMsg>}
        </FormGroup>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button type="submit">Register</Button>
          <Button
            type="button"
            onClick={() => login()}
            className="accept-button"
          >
            Login
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default Registration;
