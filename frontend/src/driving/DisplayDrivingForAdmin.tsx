import { useEffect, useState } from "react";
import styled from "styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import drivingService from "../services/drivingService";
import { Drivings } from "../models/driving";
import { Driver } from "../models/user";

const TableContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px; /* Zaobljene ivice spoljnog kontejnera */
  overflow: hidden; /* Skrivanje sadržaja koji prelazi okvir kontejnera */
  margin: -950px 0 0 450px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: blue;
  th,
  td {
    border: 1px solid white;
    padding: 8px;
    text-align: center;
  }
`;

const ApproveButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 5px;
`;


const DisapproveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const DisplayDrivingForAdmin = () => {
  const [drivings, setDrivings] = useState<Drivings[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const navigation = useNavigate();

  useEffect(() => {
    getDrivings();
    getDrivers();
  }, []);

  const getDrivings = async () => {
    try {
      const response = await drivingService.getDrivingForAdmin();
      setDrivings(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDrivers = async () => {
    try {
      const response = await userService.getDrivers();
      setDrivers(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const Block = async (driverId: string) => {
    try {
     
        const response = await userService.block(driverId);
        console.log(response);

      
   
    
      toast.success("Successful");
      
    } catch (error) {
      toast.error("Error occurred");
      console.error("Error:", error);
    }
  };
  const LookRating = async (driverId: string) => {
    try {
      const response = await userService.getRating(driverId);
      
      toast.success("Rating is:"+response);
     
    } catch (error) {
      toast.error("Error ");
      console.error("Error:", error);
    }
  };
  const Verify = async (id: string, status: string) => {
    try {
          const response = await userService.verify(id,status);

      toast.success(" successful");
      console.log(" successful:", response);
      
    } catch (error) {
      toast.error(" error");
      console.error(" error:", error);
    }
  };

  return (
    <div>
       <TableContainer>
       {drivers && drivers.length > 0 ? (
        <>
        DRIVERS
        <StyledTable className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>User Name</th>
              <th>Approve</th>
              <th>Rating</th>
              {/* <th>Block</th> */}
              <th>Block</th>
              
              
         
            </tr>
          </thead>
          <tbody>
            {drivers!.map((driver) => (
              <tr>
                 <td>{driver.email}</td>
                <td>{driver.username}</td>
                <td>
                    {driver.verification === "Pending" ? (
                      <>
                        <ApproveButton type="button" onClick={() => Verify(driver.id,"Verified")}>
                          Approve
                        </ApproveButton>
                        <DisapproveButton type="button" onClick={() => Verify(driver.id,"Denied")}>
                          Disapprove
                        </DisapproveButton>
                      </>
                    ) : null}
                  </td>
                <td>
                  <ApproveButton
                    type="button"
                    onClick={() => LookRating(driver.id)}
                  >
                    Look at the rating
                  </ApproveButton>
                </td>

                {/* <td>{driver.block.toString()}</td> */}



              
             
               
                
                

                <td>
                  <ApproveButton
                    type="button"
                    onClick={() => Block(driver.id)}
                  >
                    Block/Unblock
                  </ApproveButton>
                </td>

              
              </tr>
            ))}
          </tbody>
        </StyledTable>
        </>
     
     
    ) : null}



      {drivings && drivings.length > 0 ? (
        <>
         
         
            <StyledTable className="table">
              <thead>
                <tr>
                  <th>Start Address</th>
                  <th>End Address</th>
                  <th>Price</th>
                  <th>Driver id</th>
                  <th>User id</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {drivings.map((driving) => (
                  <tr key={driving.id}>
                    <td>{driving.startAddress}</td>
                    <td>{driving.endAddress}</td>
                    <td>{driving.price}</td>
                    {driving.driverId !== -1  ? (
                        <td>{driving.driverId}</td>)
                       : (
                        <td>-</td>
                      )}
                    
                    <td>{driving.userId}</td>
                  
                      {/* Uslovna renderizacija */}
                      {driving.accepted === false && new Date(driving.startTime) > new Date()  &&  driving.driverId == -1 ? (
                        <td>waiting for the user to accept</td>)
                       : (
                       null
                      )}
                    
                  
                      {/* Uslovna renderizacija */}
                      {driving.accepted === false && new Date(driving.startTime) < new Date()  &&  driving.driverId == -1 ? (
                        <td>the user did not accept</td>)
                       : (
                       null
                      )}
                        {/* Uslovna renderizacija */}
                        {driving.accepted === true && new Date(driving.startTime) > new Date()  &&  driving.driverId == -1 ? (
                        <td>waiting for the driver to accept</td>)
                       : (
                       null
                      )}

                         {/* Uslovna renderizacija */}
                         {driving.accepted === true && new Date(driving.startTime) < new Date()  &&  driving.driverId == -1 ? (
                        <td>the driver did not accept</td>)
                       : (
                       null
                      )}

                             {/* Uslovna renderizacija */}
                             {driving.accepted === true && new Date(driving.endTime) > new Date()  &&  driving.driverId !== -1 ? (
                        <td>driving right now</td>)
                       : (
                       null
                      )}

                         {/* Uslovna renderizacija */}
                         {driving.accepted === true && new Date(driving.endTime) < new Date()  &&  driving.driverId !== -1 ? (
                        <td>drive completed</td>)
                       : (
                       null
                      )}
                      
                    
                    
                  </tr>
                ))}
              </tbody>
            </StyledTable>
         
        </>
      ) : null}
       </TableContainer>
    </div>
  );
};

export default DisplayDrivingForAdmin;
