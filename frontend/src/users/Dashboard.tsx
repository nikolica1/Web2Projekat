import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import styled from "styled-components";
import userService from "../services/userService";

import DisplayDrivingForUser from "../driving/DisplayDrivingForUser";
import DisplayDrivingForDriver from "../driving/DisplayDrivingForDriver";
import DisplayDrivingForAdmin from "../driving/DisplayDrivingForAdmin";

const Dashboard = () => {
  const Button = styled.button`
    padding: 10px 20px;
    background-color: #7dbbee;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 50px 0 0 400px;
  `;
  const Button1 = styled.button`
    padding: 10px 20px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: -100px 0 0 -1000px;
  `;
  const isUser = userService.getUserRole() === "User";

  const navigation = useNavigate();
  const signout = async () => {
    localStorage.setItem("token", "");
    navigation("/login");
  };

  const addDriving = async () => {
    navigation("/addDriving");
  };

  return (
    <div>
      <Button type="button" onClick={() => signout()} className="accept-button">
        Sign out
      </Button>
      {userService.getUserRole() === "User" ? (
      <Button1
        type="button"
        onClick={() => addDriving()}
        className="accept-button"
        disabled={!isUser}
      >
        Create Driving
      </Button1>
      ) : null}

      <Profile></Profile>

      {userService.getUserRole() === "Driver" ? (
        <DisplayDrivingForDriver></DisplayDrivingForDriver>
      ) : null}

      {userService.getUserRole() === "User" ? (
        <DisplayDrivingForUser></DisplayDrivingForUser>
      ) : null}

      {userService.getUserRole() === "Administrator" ? (
     
        <DisplayDrivingForAdmin></DisplayDrivingForAdmin>
      ) : null}
    </div>
  );
};

export default Dashboard;
