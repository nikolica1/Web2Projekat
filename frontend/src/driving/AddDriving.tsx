import { useState } from "react";
import styled from "styled-components";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import drivingService from "../services/drivingService";
import { CreateDriving } from "../models/driving";

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

const AddDriving = () => {
  const [addDriving, setAddDriving] = useState<CreateDriving>({
    startAddress: "Bulevar Oslobodjenja 1",
    endAddress: "Bulevar Oslobodjenja 100",
    userId: 0,
  });


  const [errors, setErrors] = useState<Record<string, string>>({});




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddDriving((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigation = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: any = {};

    // Validacija za svako polje
    if (!addDriving.startAddress) {
      validationErrors.startAddress = "startAddress je obavezno.";
    }

    if (!addDriving.endAddress) {
      validationErrors.endAddress = "endAddress je obavezna.";
    }

 

    setErrors(validationErrors);

    try {
      console.log(localStorage.getItem("token"));

      addDriving.userId = userService.getUserId();

      const formData: FormData = new FormData();

      formData.append("startAddress", addDriving.startAddress);
      formData.append("endAddress", addDriving.endAddress);
      formData.append("userId", addDriving.userId.toString());
   

      const response = await drivingService.createDriving(formData);

      if(response){
        toast.success(" successful");
      }
      else{
        toast.error(" error");
      }

     
     
      navigation("/dashboard");
    } catch (error) {
      toast.error(" error");
      console.error(" error:", error);
    }
  };

  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <h3>ADD DRIVING </h3>
        <FormGroup>
          <Label>Start Address:</Label>
          <Input
            type="text"
            name="startAddress"
            value={addDriving.startAddress}
            onChange={handleInputChange}
          />
          {errors.strataddress && <ErrorMsg>{errors.startAddress}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>End Address:</Label>
          <Input
            type="text"
            name="endAddress"
            value={addDriving.endAddress}
            onChange={handleInputChange}
          />
          {errors.endAddress && <ErrorMsg>{errors.endAddress}</ErrorMsg>}
        </FormGroup>
       
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button type="submit">ORDER </Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default AddDriving;
