"use client";
import UserContext from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const UserForm = ({ addNewData, setAddNewData }) => {
  const { formData, setFormData, formType, addUser, updateUser, updateUserId } =
    useContext(UserContext);

  function changeHandler(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  // onclickhandler
  async function onClickHandler(e) {
    e.preventDefault();
    if (formType == "addnew") {
      addUser();
    } else if (formType == "update") {
      updateUser(updateUserId);
    }
    setAddNewData(false);
  }
  return (
    addNewData && (
      <div className="w-full h-screen z-10 flex justify-center items-center">
        <div className="max-w-md w-full p-4 flex flex-col">
          <div className="text-white  w-full">
            <span className="float-left ">
              {formType == "addnew" ? "New Entry" : "Update Entry"}
            </span>
            <MdOutlineCancel
              size={30}
              className="float-right mb-2 cursor-pointer"
              onClick={() => setAddNewData(false)}
            />
          </div>
          <form className="flex flex-col gap-2 ">
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={formData.name}
              onChange={changeHandler}
              className="w-full dark:bg-gray-700 p-3 rounded-md outline-nonetext-white focus:outline-white text-white"
            />

            <input
              type="Number"
              placeholder="Phone Number"
              required
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={changeHandler}
              className="w-full dark:bg-gray-700 p-3 rounded-md outline-nonetext-white focus:outline-white text-white"
              max="10"
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="w-full dark:bg-gray-700 p-3 rounded-md outline-nonetext-white focus:outline-white text-white"
            />
            <input
              type="text"
              placeholder="Hobbies"
              required
              name="hobbies"
              value={formData.hobbies}
              onChange={changeHandler}
              className="w-full dark:bg-gray-700 p-3 rounded-md outline-nonetext-white focus:outline-white text-white"
            />

            <button
              className="bg-gradient-to-r from-gray-600 to-gray-700 w-fit px-10 py-4 mx-auto text-white rounded-sm"
              onClick={onClickHandler}
            >
              {formType == "addnew" ? "Save" : "Update"}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default UserForm;
