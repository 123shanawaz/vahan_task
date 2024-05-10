import React, { useState } from "react";
import Table from "../components/Table";
import AddUser from "../components/AddUser";
import UpdatedUser from "../components/UpdatedUser";
import DeletUser from "../components/DeletUser";
import axios from "axios";
import toast from "react-hot-toast";
const UserTable = () => {
  const [userId, setUserId] = useState();
  const [updatedUserId, setUpdatedUserId] = useState();
  console.log(updatedUserId);
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    DOb: "",
  });
  const deletuser = (userid) => {
    setUserId(userid);
  };
  const handleUserDelet = async () => {
    try {
      const DeletUser = await axios.delete(
        `http://localhost:8000/api/delete/${userId}`
      );
      const response = DeletUser.data;
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlechange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const UpadteUserData = (Updatedid) => {
    setUpdatedUserId(Updatedid);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const UpdatedUser = await axios.put(
        `http://localhost:8000/api/update/${updatedUserId}`,
        value
      );
      const response = UpdatedUser.data;

      if (response.success) {
        toast.success(response.message);
      }
      // console.log(response)
    } catch (error) {
      console.log(error);
    }
    // console.log(value)
  };
  return (
    <div>
      <Table Deletuser={deletuser} UpdatedUser={UpadteUserData}></Table>
      <AddUser></AddUser>
      <UpdatedUser
        handleOnSubmit={handleOnSubmit}
        value={value}
        handlechange={handlechange}
      ></UpdatedUser>
      <DeletUser handleUserDelet={handleUserDelet}></DeletUser>
    </div>
  );
};

export default UserTable;
