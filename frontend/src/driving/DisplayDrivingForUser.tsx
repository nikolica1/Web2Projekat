import { useEffect, useState } from "react";
import styled from "styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import drivingService from "../services/drivingService";
import { Drivings } from "../models/driving";

// const TableContainer = styled.div`
//   width: 60%;
//   margin: 50px auto 0; /* Pomeranje gore za 50px */
//   background-color: white;
//   border-radius: 10px;
//   overflow: hidden;
//   margin-right: 100px; /* Pomjeranje u desno za 100px */
// `;
const TableContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px; /* Zaobljene ivice spoljnog kontejnera */
  overflow: hidden; /* Skrivanje sadržaja koji prelazi okvir kontejnera */
  margin: -950px 0 0 450px;
`;

const TableContainer2 = styled.div`
  width: 60%;
  margin: 100px auto 0 450px; /* Pomeranje gore za 400px i desno za 450px */
  background-color: white;
  border-radius: 10px; /* Zaobljene ivice spoljnog kontejnera */
  overflow: hidden; /* Skrivanje sadržaja koji prelazi okvir kontejnera */
`;

const TableContainer3 = styled.div`
  width: 60%;
  margin: 100px auto 0 450px; /* Pomeranje gore za 100px i desno za 450px */
  background-color: white;
  border-radius: 10px; /* Zaobljene ivice spoljnog kontejnera */
  overflow: hidden; /* Skrivanje sadržaja koji prelazi okvir kontejnera */
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
const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
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

const DisplayDrivingForUser = () => {
  const [drivings, setDrivings] = useState<Drivings[]>([]);
  const [rate, setRate] = useState<Number>(0);

  const navigation = useNavigate();

  useEffect(() => {
    getDrivings();
  }, []);

  const getDrivings = async () => {
    try {
      const response = await drivingService.getDrivingForUser(
        userService.getUserId()
      );
      setDrivings(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const Accept = async (id: number) => {
    try {
      const response = await drivingService.accept(id);
      if(response){
        toast.success(" successful");
      }
      else{
        toast.error(" error");
      }
      navigation("/dashboard");
    } catch (error) {
      toast.error("Error occurred");
      console.error("Error:", error);
    }
  };

  const RateIt = async (id: number) => {
    try {
      const response = await drivingService.rateIt(id,Number(rate));
      if(response){
        toast.success(" successful");
      }
      else{
        toast.error(" error");
      }
      navigation("/dashboard");
    } catch (error) {
      toast.error("Error occurred");
      console.error("Error:", error);
    }
  };

  const Chat = async (id: number) => {
    navigation(`/chat/${id}`);
  };

  const filteredDrivings = drivings.filter(
    (driving) =>
      new Date(driving.startTime) > new Date() && driving.driverId == -1
  );

  const filteredDrivings2 = drivings.filter(
    (driving) =>
      new Date(driving.endTime) > new Date() && driving.driverId !== -1
  );

  const filteredDrivings3 = drivings.filter(
    (driving) =>
      new Date(driving.endTime) < new Date() && driving.driverId !== -1
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRate(Number(value)); // Pretvorite vrednost u broj pre postavljanja u state
  };


  return (
    <div>
      
      <TableContainer>
        {filteredDrivings3 && filteredDrivings3.length > 0 ? (
          <>
            {/* Druga tabela */}
            HISTORY
            <StyledTable className="table">
              <thead>
                <tr>
                  <th>Start Address</th>
                  <th>End Address</th>
                  <th>Price</th>
                  {/* <th>Rate it</th> */}
                  <th> Rate It <Input
                        type="number"
                        name="rate"
                        value={rate.toString()} // Konvertujte broj u string pre postavljanja vrednosti
                        onChange={handleInputChange}
                      /></th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivings3.map((driving) => (
                  <tr key={driving.id}>
                    <td>{driving.startAddress}</td>
                    <td>{driving.endAddress}</td>
                    <td>{driving.price}</td>
{/* 
                    <td>
                      <Input
                        type="number"
                        name="rate"
                        value={rate.toString()} // Konvertujte broj u string pre postavljanja vrednosti
                        onChange={handleInputChange}
                      />
                    </td> */}
                    <td>
                      <ApproveButton
                        type="button"
                        onClick={() => RateIt(driving.id)}
                      >
                        RATE IT
                      </ApproveButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </>
        ) : null}

        {filteredDrivings && filteredDrivings.length > 0 ? (
          <>
            {/* Prva tabela */}
            PENDING
            <StyledTable className="table">
              <thead>
                <tr>
                  <th>Start Address</th>
                  <th>End Address</th>
                  <th>Price</th>
                  <th>Start Time</th>
                  <th>Accept</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivings.map((driving) => (
                  <tr key={driving.id}>
                    <td>{driving.startAddress}</td>
                    <td>{driving.endAddress}</td>
                    <td>{driving.price}</td>
                    <td>
                      {Math.round(
                        (new Date(driving.startTime).getTime() -
                          new Date().getTime()) /
                          (1000 * 60)
                      )}{" "}
                      minutes
                    </td>
                    <td>
                      {/* Uslovna renderizacija */}
                      {driving.accepted === false ? (
                        <ApproveButton
                          type="button"
                          onClick={() => Accept(driving.id)}
                        >
                          Accept
                        </ApproveButton>
                      ) : (
                        <td>Pending</td>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </>
        ) : null}
        {filteredDrivings2 && filteredDrivings2.length > 0 ? (
          <>
            {/* Druga tabela */}
            ACTIVE
            <StyledTable className="table">
              <thead>
                <tr>
                  <th>Start Address</th>
                  <th>End Address</th>
                  <th>Price</th>
                  <th>End Time</th>
                  <th>Chat</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivings2.map((driving) => (
                  <tr key={driving.id}>
                    <td>{driving.startAddress}</td>
                    <td>{driving.endAddress}</td>
                    <td>{driving.price}</td>
                 

                    <td>
                      {Math.round(
                        (new Date(driving.endTime).getTime() -
                          new Date().getTime()) /
                          (1000 * 60)
                      )}{" "}
                      minutes
                    </td>
                    <td>    <ApproveButton
                          type="button"
                          onClick={() => Chat(driving.id)}
                        >
                          Chat
                        </ApproveButton></td>
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

export default DisplayDrivingForUser;
