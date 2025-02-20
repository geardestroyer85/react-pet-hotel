import React from "react";
import PetList from "../components/PetList";
import { useAppContext } from "../context/useAppContext";
import { useLocation } from "wouter";

function HomePage() {

  const [, setLocation] = useLocation();
  const {userData, setUserData} = useAppContext();

  if (!userData) {
    setLocation("/login")
    return null;
  }

  const handleLogout = () => {
    setUserData(null);
  }

  return (
    <div>
      <div>Hello {userData.username}</div>
      <button onClick = {handleLogout}>
        Logout
      </button>
      <PetList />
    </div>
  );
}

export default HomePage;
