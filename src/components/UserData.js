"use client";
import UserContext from "@/context/UserContext";
import React, { useContext, useEffect, useState } from "react";

const UserData = ({ addNewData, setAddNewData }) => {
  const [isSelected, setIsSelected] = useState(false);
  const {
    setFormData,
    setFormType,
    setUpdateUserId,
    fetchAllUser,
    allUser,
    deleteUser,
  } = useContext(UserContext);

  function changeHandler(e, userId) {
    if (e.target.checked) {
      setIsSelected(userId);
    } else {
      setIsSelected(false);
    }
  }

  // updateHandler
  async function updateHandler(user) {
    if (isSelected == user._id) {
      setAddNewData(true);
      setFormData({
        name: user.Name,
        phoneNumber: user.phoneNumber,
        email: user.Email,
        hobbies: user.Hobbies,
      });
      setFormType("update");
      setUpdateUserId(user._id);
    } else {
      alert("Please select the respective field");
    }
  }

  // deleteHandler
  async function deleteHandler(user) {
    if (isSelected == user._id) {
      deleteUser(user._id);
    } else {
      alert("Please select the field");
    }
  }

  // mailHandler
  async function mailHandler(user) {
    const response = await fetch(`/api/sendmail`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(user),
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      alert("mail send successfull");
    }
  }
  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="py-5 overflow-x-auto">
        {allUser?.length ? (
          <table className="styled-table">
            <thead className="bg-mygreen text-white">
              <tr>
                <th>Checkbox</th>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Hobbies</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            <tbody className="border text-black bg-white">
              {allUser?.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>
                      <input
                        type="checkbox"
                        name="checkbox"
                        checked={isSelected == user._id}
                        onChange={(e) => changeHandler(e, user._id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td>{user._id}</td>
                    <td>{user.Name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.Email}</td>
                    <td>{user.Hobbies}</td>
                    <td>
                      <button
                        className="bg-yellow-300 px-3 py-1 rounded-sm ml-1 "
                        onClick={() => updateHandler(user)}
                      >
                        update
                      </button>
                      <button
                        className="bg-red-400 px-3 py-1 rounded-sm ml-1"
                        onClick={() => deleteHandler(user)}
                      >
                        delete
                      </button>

                      {isSelected == user._id && (
                        <button
                          className="bg-green-400 px-3 py-1 rounded-md ml-1"
                          onClick={() => mailHandler(user)}
                        >
                          Send
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-white text-2xl text-center">No Record Found</div>
        )}
      </div>
    </div>
  );
};

export default UserData;
