import { useEffect, useState } from "react";
import styled from "styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import userService from "../services/userService";

import { Drivings } from "../models/driving";
import drivnigService from "../services/drivingService";
import { useNavigate } from "react-router-dom";

const DisplayDrivingForDriver = () => {
  // const TableContainer = styled.div`
  //   width: 60%;
  //   margin: 0 auto;
  //   background-color: white;
  //   border-radius: 10px; /* Zaobljene ivice spoljnog kontejnera */
  //   overflow: hidden; /* Skrivanje sadržaja koji prelazi okvir kontejnera */
  //   margin: -950px 0 0 450px;
  // `;

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

  const [drivings, setDrivings] = useState<Drivings[]>();
  const navigation = useNavigate();
  useEffect(() => {
    getDrivings();
  }, []);

  const getDrivings = async () => {
    try {
      const response = await drivnigService.getDrivingForDrivers();
      setDrivings(response);
    } catch (error) {
      console.error(" error:", error);
    }
  };

  const Accept = async (id: number) => {
    try {
      const response = await drivnigService.driverAccept(
        id,
        userService.getUserId()
      );

      if (response) {
        toast.success("Successful");
      } else {
        toast.error(" Error");
      }
    } catch (error) {
      toast.error(" Error");
      console.error(" error:", error);
    }
  };
  // const filteredDrivings = drivings?.filter(
  //   (driving) => new Date(driving.startTime) > new Date()
  // );

  const filteredDrivings = drivings?.filter(
    (driving) =>
      new Date(driving.startTime) > new Date() && driving.driverId == -1
  );
  const filteredDrivings2 = drivings?.filter(
    (driving) =>
      new Date(driving.endTime) > new Date() &&
      driving.driverId == userService.getUserId()
  );
  const filteredDrivings3 = drivings?.filter(
    (driving) =>
      new Date(driving.endTime) < new Date() &&
      driving.driverId == userService.getUserId()
  );
  const Chat = async (id: number) => {
    navigation(`/chat/${id}`);
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
                  <th>Start time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivings3.map((driving) => (
                  <tr key={driving.id}>
                    <td>{driving.startAddress}</td>
                    <td>{driving.endAddress}</td>
                    <td>{driving.price}</td>
                    <td>{new Date(driving.startTime).toLocaleString()}</td>
                    <td>{new Date(driving.endTime).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </>
        ) : null}
        {filteredDrivings && filteredDrivings.length > 0 ? (
          <>
            PENDING
            <StyledTable className="table">
              <thead>
                <tr>
                  <th>StartAddress</th>
                  <th>EndAddress</th>
                  <th>Price</th>
                  <th>StartTime</th>
                  <th>Accept</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivings!.map((driving) => (
                  <tr>
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
                      <ApproveButton
                        type="button"
                        onClick={() => Accept(driving.id)}
                      >
                        Accept
                      </ApproveButton>
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

export default DisplayDrivingForDriver;
