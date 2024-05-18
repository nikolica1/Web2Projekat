import { useEffect, useState } from "react";
import styled from "styled-components";
import {  UserUpdate } from "../models/user";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import userService from "../services/userService";


const FormWrapper = styled.form`
  width: 350px; /* Promenjeno na 300px */
  margin: 50px auto 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #7dbbee;
  margin: -50px 0 0 50px; 
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
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const Profile = () => {
    const [user, setUser] = useState<UserUpdate | undefined>(undefined);
  const [updatedUser, setupdatedUser] = useState<UserUpdate>({
    id:user?.id!,
    username: user?.username!,
    email: user?.email!,
    newpassword: "",
    oldpassword: "",
    firstName: user?.firstName!,
    lastName: user?.lastName!,
    birthday: user?.birthday!,
    address: user?.address!,
    picture: user?.picture!,
    role: user?.role!,
    verification:"",
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
        const response = await userService.getUser(Number(userService.getUserId()));
  
        console.log("Registration successful:", response);
        setupdatedUser(response);
      } catch (error) {
        toast.error("Registration error");
        console.error("Registration error:", error);
      }

  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      setSelectedFileName(file.name);
      setupdatedUser((prevData) => ({ ...prevData, file }));
    }
  };
  const [errors, setErrors] = useState<Record<string, string>>({});
 

 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setupdatedUser((prevData) => ({ ...prevData, [name]: value }));
  };
 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: any = {};

    // Validacija za svako polje
    if (!updatedUser.username) {
      validationErrors.username = "Korisničko ime je obavezno.";
    }

    if (!updatedUser.email) {
      validationErrors.email = "Email adresa je obavezna.";
    }

 

    if (!updatedUser.firstName) {
      validationErrors.firstName = "Ime je obavezno.";
    }

    if (!updatedUser.lastName) {
      validationErrors.lastName = "Prezime je obavezno.";
    }

    if (!updatedUser.birthday) {
      validationErrors.birthday = "Datum rođenja je obavezan.";
    }

    if (!updatedUser.address) {
      validationErrors.address = "Adresa je obavezna.";
    }

    if (!updatedUser.picture) {
      validationErrors.picture = "Slika je obavezna.";
    }

    if (!updatedUser.role) {
      validationErrors.role = "Rola je obavezna.";
    }
  
    setErrors(validationErrors);

    try {
      const formData: FormData = new FormData();
      formData.append("id", updatedUser.id.toString());
      formData.append("address", updatedUser.address);
      formData.append("birthday", updatedUser.birthday.toString());
      formData.append("email", updatedUser.email);
      formData.append("firstName", updatedUser.firstName);
      formData.append("lastName", updatedUser.lastName);
      formData.append("oldpassword", updatedUser.oldpassword || '');
      formData.append("newpassword", updatedUser.newpassword || '');
      formData.append("file", selectedFile as File);
            formData.append("username", updatedUser.username);

      const response = await userService.update(formData);

      toast.success(" successful");
      console.log("Registration successful:", response);
      
    } catch (error) {
      toast.error(" error");
      console.error(" error:", error);
    }
  };
  
 
  return (
    <div>
           {updatedUser !== undefined ? (
      <FormWrapper onSubmit={handleSubmit}>
        <h3>Profile </h3>
     
        <h3>Status {updatedUser!.verification} </h3>
        <img
          src={updatedUser!.picture}
          alt="User"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <FormGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={updatedUser!.username}
            onChange={handleInputChange}
          />
          {errors.username && <ErrorMsg>{errors.username}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={updatedUser!.email}
            onChange={handleInputChange}
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Old Password:</Label>
          <Input
            type="password"
            name="oldpassword"
            value={updatedUser!.oldpassword}
            onChange={handleInputChange}
          />
          {errors.oldpassword && <ErrorMsg>{errors.oldpassword}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>new password:</Label>
          <Input
            type="password"
            name="newpassword"
            value={updatedUser!.newpassword}
            onChange={handleInputChange}
          />
          {errors.newpassword && <ErrorMsg>{errors.newpassword}</ErrorMsg>}
        </FormGroup>

        <FormGroup>
          <Label>First Name:</Label>
          <Input
            type="text"
            name="firstName"
            value={updatedUser!.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <ErrorMsg>{errors.firstName}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label> Last Name:</Label>
          <Input
            type="text"
            name="lastName"
            value={updatedUser!.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <ErrorMsg>{errors.lastName}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Birthday:</Label>
          <Input
            type="date"
            name="birthday"
            value={
                updatedUser.birthday
                  ? new Date(updatedUser.birthday).toISOString().split("T")[0]
                  : ""
              }
            onChange={handleInputChange}
          />
          {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>Address:</Label>
          <Input
            type="text"
            name="address"
            value={updatedUser!.address}
            onChange={handleInputChange}
          />
          {errors.address && <ErrorMsg>{errors.address}</ErrorMsg>}
        </FormGroup>
        

        <FormGroup>
          <Label>Picture:</Label>
          <Input type="file" name="file" onChange={handleFileChange} />
          {selectedFileName && <div>{selectedFileName}</div>}
          {errors.address && <ErrorMsg>{errors.address}</ErrorMsg>}
        </FormGroup>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button type="submit">Update</Button>
     
        </div>

       
      </FormWrapper> ) : null}
    </div>
  );
};

export default Profile;
