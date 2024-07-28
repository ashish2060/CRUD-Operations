"use client";
const { createContext, useState } = require("react");

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [updateUserId, setUpdateUserId] = useState();
  const [allUser, setAllUser] = useState();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });

  const [formType, setFormType] = useState("addnew");

  //   addUser
  async function addUser(e) {
    const response = await fetch(`/api/adduser`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    fetchAllUser();
  }

  //   update user
  async function updateUser(userId) {
    const response = await fetch(`/api/updateuser/${userId}`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    fetchAllUser();
  }

  //   fetchAllUser
  async function fetchAllUser() {
    const response = await fetch(`/api/fetchalluser`);
    const data = await response.json();
    setAllUser(data.allUser);
  }

  //   deleteUser
  async function deleteUser(userId) {
    const response = await fetch(`/api/deleteuser/${userId}`, {
      method: "DELETE",
      "Content-Type": "application/json",
    });
    const data = await response.json();

    fetchAllUser();
  }
  return (
    <UserContext.Provider
      value={{
        formData,
        setFormData,
        formType,
        setFormType,
        addUser,
        updateUser,
        updateUserId,
        setUpdateUserId,
        fetchAllUser,
        allUser,
        setAllUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
