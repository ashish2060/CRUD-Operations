"use client";
import UserData from "@/components/UserData";
import UserForm from "@/components/UserForm";
import UserContext, { UserContextProvider } from "@/context/UserContext";
import { useContext, useState } from "react";

export default function Home() {
  const [addNewData, setAddNewData] = useState(false);
  const { setFormType, setFormData } = useContext(UserContext);
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black h-screen w-full">
      <UserForm addNewData={addNewData} setAddNewData={setAddNewData} />
      <UserData addNewData={addNewData} setAddNewData={setAddNewData} />
      <div className="text-center">
        <button
          className="px-8 py-4 bg-mygreen rounded-sm m-4 text-white"
          onClick={() => (
            setAddNewData(true),
            setFormType("addnew"),
            setFormData({
              name: "",
              phoneNumber: "",
              email: "",
              hobbies: "",
            })
          )}
        >
          Add New Data
        </button>
      </div>
    </div>
  );
}
